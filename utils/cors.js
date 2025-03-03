export default function corsMiddleware(handler) {
  return async (req, res) => {
    // Configura los encabezados CORS
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todos los dominios
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Maneja las solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Llama al manejador original
    return handler(req, res);
  };
}