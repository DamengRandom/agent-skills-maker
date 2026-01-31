import { chat } from '@tanstack/ai'
import { createOpenaiChat } from '@tanstack/ai-openai'
import { defineEventHandler, readBody, createError, setHeaders } from 'h3'

interface AgentBody {
  teamName: string
  techStack: string
  focusAreas: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<AgentBody>(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing request body',
    })
  }

  if (!config.groqApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GROQ_API_KEY is not configured in .env',
    })
  }

  // Use createOpenaiChat with Groq's model name as requested.
  // We cast the model and apiKey to satisfy the OpenAI adapter types.
  const adapter = createOpenaiChat('llama-3.3-70b-versatile' as any, config.groqApiKey as string, {
    baseURL: config.public.groqApiBaseUrl as string,
  })

  // In TanStack AI v0.3.x, chat() returns an AsyncIterable directly.
  const stream = chat({
    adapter,
    messages: [
      {
        role: 'user',
        content: `
          # SYSTEM INSTRUCTIONS
          You are an expert Senior Staff Engineer specialized in writing 'Agent Skills' and 'Code Review Standards'.
          Create a comprehensive, high-quality markdown file for a team named ${body.teamName}.
          
          The team uses: ${body.techStack}
          Focus areas: ${body.focusAreas}
          
          Structure the markdown with:
          1. # Agent Skills: [Team Name]
          2. ## Philosophy
          3. ## Code Standards (Language specific)
          4. ## Architecture Patterns
          5. ## Review Checklist
          
          Use professional, clear, and actionable language. Return ONLY the markdown content.
          
          # TASK
          Generate the skills markdown for ${body.teamName}.
        `
      }
    ],
    temperature: 1,
    topP: 1,
    maxTokens: 8192,
  })

  // Set headers for streaming
  setHeaders(event, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  // Transform AsyncIterable<StreamChunk> into a ReadableStream of raw text deltas
  // for compatibility with the client's simple decoder/append logic.
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === 'content') {
            controller.enqueue(new TextEncoder().encode(chunk.delta))
          }
        }
      } catch (error) {
        console.error('Streaming error:', error)
      } finally {
        controller.close()
      }
    }
  })
})
