// pages/api/clients.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const backendUrl = 'https://ro-ma-sys-server.vercel.app/api/clients'; // URL de tu servidor backend
  const response = await fetch(backendUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}