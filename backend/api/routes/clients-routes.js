import express from "express";
import { getClients, addClient, updateClient, deleteClient, getClientById } from "../controllers/clients-controller.js";

const router = express.Router();

// Definición de rutas
router.get("/", getClients); // GET /api/clients
router.get("/:cli_id", getClientById); // GET /api/clients/:cli_id
router.post("/", addClient); // POST /api/clients
router.put("/:cli_id", updateClient); // PUT /api/clients/:cli_id
router.delete("/:cli_id", deleteClient); // DELETE /api/clients/:cli_id

export default router;