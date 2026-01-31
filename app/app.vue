<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  teamName: '',
  techStack: '',
  focusAreas: '',
})

const isGenerating = ref(false)
const generatedMarkdown = ref('')
const statusMessage = ref('')
const copySuccess = ref(false)

async function generateSkills() {
  if (!formData.value.teamName) return
  
  isGenerating.value = true
  statusMessage.value = 'Initializing Groq Stream...'
  generatedMarkdown.value = ''
  
  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      body: JSON.stringify(formData.value),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.body) throw new Error('No body in response')
    
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    statusMessage.value = 'Generating standards in real-time...'

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      const chunk = decoder.decode(value, { stream: true })
      generatedMarkdown.value += chunk
    }
    
    statusMessage.value = 'Skills generated successfully!'
  } catch (error) {
    console.error(error)
    statusMessage.value = 'Generation failed. Check server logs.'
  } finally {
    isGenerating.value = false
  }
}

async function saveToFile() {
  if (!generatedMarkdown.value) return
  
  statusMessage.value = 'Saving to root directory...'
  try {
    const res = await $fetch<any>('/api/save-skills', {
      method: 'POST',
      body: { 
        content: generatedMarkdown.value,
        filename: `${formData.value.teamName.replace(/\s+/g, '-').toLowerCase()}-agent-skills.md`
      }
    })
    statusMessage.value = `Saved as ${res.path}!`
  } catch (error) {
    statusMessage.value = 'Save failed.'
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(generatedMarkdown.value)
  copySuccess.value = true
  setTimeout(() => copySuccess.value = false, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 md:p-8 lg:p-12 selection:bg-indigo-500/30">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      
      <!-- Left Sidebar: Configuration -->
      <div class="lg:col-span-4 space-y-8">
        <header class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Powered by Groq & TanStack AI
          </div>
          <div class="flex items-center gap-4">
            <img src="/logo.svg" alt="Agent Skills Maker Logo" class="w-16 h-16 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
            <h1 class="text-5xl font-black tracking-tight text-white leading-tight">
              Agent <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Skills</span> Maker
            </h1>
          </div>
          <p class="text-slate-400 leading-relaxed">
            Architect professional code standards and agent behaviors for your production teams in seconds.
          </p>
        </header>

        <div class="p-1 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
          <div class="bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2.25rem] space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Team Identity</label>
              <input v-model="formData.teamName" placeholder="e.g. Platform Engineering" 
                class="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-white" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Infrastructure & Tech</label>
              <textarea v-model="formData.techStack" placeholder="e.g. TypeScript, Nuxt, K8s, Terraform" rows="3"
                class="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-white resize-none" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Core Objectives</label>
              <textarea v-model="formData.focusAreas" placeholder="e.g. Zero-trust security, 100% Type safety" rows="2"
                class="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-white resize-none" />
            </div>

            <button @click="generateSkills" :disabled="isGenerating || !formData.teamName"
              class="w-full group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 transition-all duration-300 group-hover:scale-105"></div>
              <div class="relative flex items-center justify-center gap-3 text-white font-bold tracking-wide">
                <template v-if="!isGenerating">
                  Generate Documentation
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </template>
                <template v-else>
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing stream...
                </template>
              </div>
            </button>
            
            <p v-if="statusMessage" class="text-center text-[10px] font-mono text-indigo-400/80 uppercase tracking-[0.2em] animate-pulse">
              {{ statusMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right Content: Output Preview -->
      <div class="lg:col-span-8 flex flex-col min-h-[600px]">
        <div class="flex items-center justify-between mb-4 px-2">
            <div class="flex items-center gap-4">
              <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Output Preview</h2>
              <div v-if="isGenerating" class="flex gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style="animation-delay: 0s"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style="animation-delay: 0.2s"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style="animation-delay: 0.4s"></span>
              </div>
            </div>
            <div class="flex items-center gap-2">
                <button v-if="generatedMarkdown" @click="copyToClipboard" 
                  class="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-95 group relative">
                  <svg v-if="!copySuccess" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">Copy Text</span>
                </button>
                <button v-if="generatedMarkdown" @click="saveToFile" 
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all active:scale-95 text-xs font-bold uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save as MD
                </button>
            </div>
        </div>
        
        <div class="flex-grow group relative h-full">
          <!-- Glassmorphism Container -->
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-[2rem] border border-slate-800 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-slate-950/40"></div>
            
            <div v-if="!generatedMarkdown && !isGenerating" class="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div class="w-20 h-20 mb-8 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-400 mb-2">Awaiting Intelligence</h3>
              <p class="text-slate-600 max-w-xs mx-auto">Fill in the details to generate your tailored engineering standards.</p>
            </div>

            <div v-else class="h-full relative overflow-hidden">
               <pre class="p-8 md:p-12 text-sm md:text-base text-slate-300 font-mono overflow-auto h-full scrollbar-premium whitespace-pre-wrap leading-relaxed">
{{ generatedMarkdown }}<span v-if="isGenerating" class="inline-block w-2.5 h-5 bg-indigo-500 ml-1 animate-pulse align-middle"></span>
               </pre>
               <!-- Bottom Fade -->
               <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Outfit', sans-serif;
  background-color: #020617;
  color: #f1f5f9;
  margin: 0;
}

/* Custom Scrollbar */
.scrollbar-premium::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-premium::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-premium::-webkit-scrollbar-thumb {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.scrollbar-premium::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.3);
  background-clip: content-box;
}
</style>
