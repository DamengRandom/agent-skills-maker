# 🤖 Agent Skills Maker

Architect professional code standards and AI agent behaviors for your production teams in seconds. Powered by **Nuxt 4**, **TanStack AI**, and **Groq**.

![Agent Skills Maker UI](https://raw.githubusercontent.com/lucide-dev/lucide/main/icons/bot.svg)

## ✨ Features

- **🚀 Real-time AI Streaming**: Watch your engineering standards generate live via Groq's high-speed Llama 3 models.
- **🎨 Premium Aesthetics**: Sleek dark-mode interface with glassmorphism and smooth micro-animations.
- **🛠 Framework Agnostic**: Generates standards for any tech stack (TypeScript, Nuxt, K8s, Terraform, etc.).
- **💾 Root Persistence**: Save your generated skills directly to your project root as `.md` files.

---

## Quick demo

- Please check the demo image for details ![demo.png](/public/demo.png) 
- Also, please check [rontend-engineering-agent-skills.md](/frontend-engineering-agent-skills.md) file for an example check

## 🚀 Quick Start

### 1. Zero-Config Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root directory and add your **Groq API Key**:

```env
GROK_API_KEY=your_gsk_key_here
```

> [!TIP]
> Get your free API key at [GroqCloud Console](https://console.groq.com/keys).

### 3. Local Development

Spin up the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start building.

---

## 🛠 Tech Stack

- **Meta-Framework**: [Nuxt 4](https://nuxt.com/) (Future-ready)
- **AI Orchestration**: [TanStack AI](https://tanstack.com/ai)
- **Model Provider**: [Groq](https://groq.com/) (LPU™ Inference Engine)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Vue 3 with Hybrid Composition API

---

## 📖 How it Works

1. **Team Identity**: Define who you are (e.g., "Platform Engineering").
2. **Infrastructure**: List your stack (e.g., "TypeScript, Nuxt, Docker").
3. **Core Objectives**: Set your quality bars (e.g., "Zero-trust security").
4. **Generate**: The AI generates a structured `Agent Skills` document including Philosophy, Architecture Patterns, and PR Checklists.

---

## 🏗 Project Structure

```text
├── app/
│   └── app.vue            # Premium Frontend UI
├── server/
│   └── api/
│       ├── agent.post.ts  # TanStack AI Streaming Handler
│       └── save-skills.ts # File System Persistence
├── nuxt.config.ts         # Nuxt 4 & Module Config
└── .env                   # API Keys (Protected)
```

---

## 📄 License

MIT. Go build something fast.

## TODOS

- This is the version `0.0.1`, and this is just a begining of the project, will keep updating based on mood 🧶 ~
- Next step, will do code refactor step by step (Thanks AI tool 💙) ~
- Thinking ..