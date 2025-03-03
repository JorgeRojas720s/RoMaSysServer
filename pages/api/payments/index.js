import paymentsRoutes from "../api/routes/payments-routes.js";
import corsMiddleware from "../../../utils/cors.js";

const handler = async (req, res) => {
  try {
    await paymentsRoutes(req, res);
  } catch (error) {
    console.error("Error in /api/paymentsRoutes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default corsMiddleware(handler);