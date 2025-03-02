// utils/cors.js
export function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todos los orígenes
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Si es una solicitud OPTIONS (pre-flight), respondemos directamente
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    // Si no es una solicitud OPTIONS, continuamos con el procesamiento de la solicitud
    next();
  }
  