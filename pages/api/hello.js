// pages/api/hello.js
import { cors } from '../../utils/cors';

export default function handler(req, res) {
  // Aplica el middleware de CORS
  cors(req, res, () => {
    res.status(200).json({ message: 'Hello, World!' });
  });
}