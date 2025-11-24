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

1. **Start the Application**:
   ```bash
   npm start
   ```
   This will run both the backend and frontend concurrently.

2. Open your browser to `http://localhost:3000`.

## Setup on Ubuntu 24.04

If you are deploying or running this on an Ubuntu 24.04 server/machine, follow these steps:

### 1. Install System Dependencies
Update your package list and install Node.js (version 20 or higher is recommended).

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install curl if missing
sudo apt install curl -y

# Install Node.js (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### 2. Install Project Dependencies
Navigate to the project directory and install the required npm packages.

```bash
# Navigate to project folder
cd devlogs

# Install dependencies
npm install
```

### 3. Run the Application
You can run the application using the standard commands, or use `pm2` to keep it running in the background.

**Option A: Standard Run**
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev -- --host
```
*Note: `--host` is added to expose the Vite server to the network if you are accessing it remotely.*

**Option B: Using PM2 (Recommended for background execution)**
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the Backend
pm2 start npm --name "devlog-backend" -- run server

# Start the Frontend
pm2 start npm --name "devlog-frontend" -- run dev -- --host
```
