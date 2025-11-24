import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const TEMP_DIR = path.join(__dirname, 'temp');
const LOGS_FILE = path.join(TEMP_DIR, 'logs.json');

// Ensure temp directory and logs file exist
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}
if (!fs.existsSync(LOGS_FILE)) {
    fs.writeFileSync(LOGS_FILE, JSON.stringify([]));
}

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Parse URL
    const url = new URL(req.url, `http://${req.headers.host}`);

    // GET /api/logs
    if (req.method === 'GET' && url.pathname === '/api/logs') {
        try {
            const data = fs.readFileSync(LOGS_FILE, 'utf8');
            const logs = JSON.parse(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(logs.reverse()));
        } catch (error) {
            console.error('Error reading logs:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to read logs' }));
        }
        return;
    }

    // POST /api/logs
    if (req.method === 'POST' && url.pathname === '/api/logs') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newLog = {
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                    ...JSON.parse(body)
                };

                const data = fs.readFileSync(LOGS_FILE, 'utf8');
                const logs = JSON.parse(data);
                logs.push(newLog);

                fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2));

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newLog));
            } catch (error) {
                console.error('Error saving log:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to save log' }));
            }
        });
        return;
    }

    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
