import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { evaluateAction } from '../core/policy.js';

const port = Number(process.env.PORT || 8787);

const server = createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    return sendFile(response, '../../public/index.html', 'text/html');
  }

  if (request.method === 'POST' && request.url === '/api/evaluate') {
    try {
      const body = await readBody(request);
      const action = JSON.parse(body);
      return sendJson(response, 200, { action, ...evaluateAction(action) });
    } catch (error) {
      return sendJson(response, 400, { error: error.message });
    }
  }

  sendJson(response, 404, { error: 'Not found' });
});

server.listen(port, () => console.log(`Kairn listening on http://localhost:${port}`));

async function sendFile(response, path, contentType) {
  response.writeHead(200, { 'content-type': contentType });
  response.end(await readFile(new URL(path, import.meta.url)));
}

function sendJson(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}
