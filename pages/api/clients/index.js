import clientsRoutes from "../../backend/api/routes/clients-routes.js";


export default async function handler(req, res) {
    // Configura CORS
    res.setHeader("Access-Control-Allow-Origin", "https://ro-ma-sys.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    // Manejar solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    try {
      await clientsRoutes(req, res);
    } catch (error) {
      console.error("Error in /api/clients:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }