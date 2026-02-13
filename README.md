# 🎮 Soc Ops

**Break the ice and build connections.** Soc Ops is a modern social bingo game designed for in-person mixers, networking events, and team gatherings. Get to know people faster with fun prompts, find matches, and race to get 5 in a row!

## Why Soc Ops?

- **🚀 Instant Setup** — Deploy in minutes with a modern React + TypeScript stack
- **🎯 Customizable** — Easy to swap in your own questions and themes
- **📱 Responsive Design** — Works seamlessly on phones and tablets for group play
- **⚡ Lightweight** — Built with Vite and Tailwind CSS for lightning-fast performance
- **🎨 Beautiful UI** — Clean, modern interface that makes the game fun to play

## How It Works

Players mark off squares on a 5×5 bingo board by finding people who match the prompts (e.g., "knows 3+ languages" or "has visited 5+ countries"). Get 5 marked squares in a line — horizontally, vertically, or diagonally — and shout "Bingo!"

## Getting Started

### Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

### Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The app deploys automatically to GitHub Pages when you push to `main`.

## Customize Your Game

Want to change the questions or theme? Check out [the Lab Guide](.lab/GUIDE.md) for step-by-step instructions on customizing the game for your event.

## Tech Stack

Built with modern web technologies for reliability and developer experience:

- **React 19** — Latest React features and improvements
- **TypeScript** — Type-safe code for fewer bugs
- **Vite** — Lightning-fast build tool and dev server
- **Tailwind CSS v4** — Utility-first styling
- **Vitest** — Fast unit testing 

### What the lector did: 
1. run /setup to initialize the project. It is based on prompt saved in prompts/initial-setup.md, which includes instructions to create a React app with Vite, TypeScript, Tailwind CSS, and a custom hook for game state management.
2. triggered "generate chat instuction" from Chat window or Chat Settings (or run Command `Chat: Generate Workspace Instructions File`) to generate detailed instructions for the Copilot agent, which include an overview of the project architecture, state management pattern, core game logic, development workflows, and key conventions. These instructions are saved in .github/copilot-instructions.md and are meant to guide the agent in making informed code suggestions that align with the project's design and goals.
3. then he run the prompt "Compress down by half and add a mandatory development [ ] checklist (lint, build, test) to the top" to optimize token usage, clear unnecessary details, remove redundancy, and ensure that the agent focuses on essential development tasks via dev checklists. 
Always treat this instructions as draft. You must make sure they are correct and keep working on them to improve them as you go. You can also add more instructions to the file as you see fit. The goal is to have a comprehensive set of instructions that will help the agent understand the project and make informed code suggestions.
4. 