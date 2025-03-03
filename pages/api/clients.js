import clientsRoutes from "../backend/api/routes/clients-routes";

export default async function handler(req, res) {
  try {
    await clientsRoutes(req, res);
  } catch (error) {
    console.error("Error in /api/clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}