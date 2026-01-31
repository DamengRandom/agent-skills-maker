import fs from 'node:fs/promises'
import path from 'node:path'
import { defineEventHandler, readBody, createError } from 'h3'

interface SaveBody {
  content: string
  filename: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SaveBody>(event)

  if (!body || !body.content || !body.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid content or filename',
    })
  }

  const { content, filename } = body

  // Save to the root of the project
  const rootDir = process.cwd()
  const filePath = path.join(rootDir, filename)

  await fs.writeFile(filePath, content, 'utf-8')

  return {
    success: true,
    path: filename
  }
})
