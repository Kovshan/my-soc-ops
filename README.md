# Soc Ops

Social Bingo game for in-person mixers. Find people who match the questions and get 5 in a row!

<!-- You can remove this message when updating the readme as part of the workshop -->
👉 **[Follow the Lab Guide](.lab/GUIDE.md)** for instructions on how to set up and customize the game.


## Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deploys automatically to GitHub Pages on push to `main`.


### What the lector did: 
1. run /setup to initialize the project. It is based on prompt saved in prompts/initial-setup.md, which includes instructions to create a React app with Vite, TypeScript, Tailwind CSS, and a custom hook for game state management.
2. triggered "generate chat instuction" from Chat window or Chat Settings (or run Command `Chat: Generate Workspace Instructions File`) to generate detailed instructions for the Copilot agent, which include an overview of the project architecture, state management pattern, core game logic, development workflows, and key conventions. These instructions are saved in .github/copilot-instructions.md and are meant to guide the agent in making informed code suggestions that align with the project's design and goals.
3. then he run the prompt "Compress down by half and add a mandatory development [ ] checklist (lint, build, test) to the top" to optimize token usage, clear unnecessary details, remove redundancy, and ensure that the agent focuses on essential development tasks via dev checklists. 
Always treat this instructions as draft. You must make sure they are correct and keep working on them to improve them as you go. You can also add more instructions to the file as you see fit. The goal is to have a comprehensive set of instructions that will help the agent understand the project and make informed code suggestions.
4. 
