# ReflectAI 🧠  
An AI-powered mental health journaling assistant for reflection, pattern tracking, and self-awareness.

Stackblitz Link: https://stackblitz.com/edit/github-i6zhsw91?file=README.md

## ✨ Overview
ReflectAI is a personal journaling tool enhanced by an AI agent that responds to your thoughts with empathy, insights, and prompts. Inspired by Lore.co, this project combines AI agents and "vibe coding" to help users process emotions, discover patterns, and reflect more intentionally over time.

---

## 💡 Key Features
- **Freeform Journaling** – Log your daily reflections in natural language.
- **AI-Powered Reflections** – Get personalized, gentle responses from the AI based on your entries.
- **Mood & Theme Tracking** – Automatically detect topics and emotional tone over time.
- **Conversational Insights** – Ask the agent things like:
  - "What was my overall mood last week?"
  - "Have I been writing more about work or family?"
- **Custom Prompts** – Let the agent suggest thoughtful prompts tailored to your journaling history.

---

## 🛠 Tech Stack

| Layer        | Tools                          |
|--------------|--------------------------------|
| Frontend     | React, Tailwind (or Next.js)   |
| Backend/API  | Node.js + Express (or Django)  |
| AI/NLP       | OpenAI GPT-4 (via API)         |
| Data Storage | SQLite or Firebase             |
| Visualization| Recharts or D3.js              |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/reflectai.git
cd reflectai

# Install dependencies
npm install

# Set up environment variables (OpenAI key, DB config, etc.)
cp .env.example .env

# Run locally
npm run dev
