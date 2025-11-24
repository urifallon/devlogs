<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DevLog Error Dashboard

A premium error tracking dashboard for local development.

## Features
- **Create Logs**: Manually log errors with rich context (Severity, Project, Tags).
- **Log Explorer**: View logs in real-time.
- **Local Persistence**: Logs are saved to `temp/logs.json` in your project folder.
- **Premium UI**: Custom designed components and smooth interactions.

## Run Locally

You need to run both the backend server (for saving logs) and the frontend.

1. **Start the Backend Server**:
   ```bash
   node server.js
   ```
   This will start the API server on `http://localhost:3001`.

2. **Start the Frontend** (in a new terminal):
   ```bash
   npm run dev
   ```
   This will start the Vite dev server.

3. Open your browser to the URL shown by Vite (usually `http://localhost:5173`).
