import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      title: 'Agent Skills Maker',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    groqApiKey: process.env.GROK_API_KEY,
    public: {
      groqApiBaseUrl: 'https://api.groq.com/openai/v1'
    }
  }
})
