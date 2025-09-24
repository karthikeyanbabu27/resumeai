# Resume Genie AI

## Project info

An AI-powered resume builder. This project uses React, Vite, TypeScript, Tailwind CSS, and shadcn-ui.

## How can I edit this code?

There are several ways of editing your application.

## Local development

Clone this repository and install dependencies.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploy

You can deploy to any static hosting provider (e.g., Vercel, Netlify, GitHub Pages).

Build the project:

```sh
npm run build
```

Preview locally:

```sh
npm run preview
```

## Gemini setup

Create a `.env` file at the project root:

```
VITE_GOOGLE_API_KEY=your_api_key_here
```

The Builder page uses Gemini `gemini-1.5-pro` to generate LaTeX from your entered resume data. After generation, you can edit the LaTeX, see a live preview, and download as PDF.
# resumeai
