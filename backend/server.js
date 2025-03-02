import express from "express";
import cors from "cors"; // Importa el paquete cors
import clientsRoutes from "./api/routes/clients-routes.js";
import paymentsRoutes from "./api/routes/payments-routes.js";
import filterRoutes from "./api/routes/filter-routes.js";
import reportsRoutes from "./api/routes/reports-routes.js";
import { startMessageSending } from "./api/schedule-messages/membership-to-expire.js";
import { validateHttpMethod } from "./api/middleware/validation.js";
import {
  errorHandler,
  handleUnhandledRejection,
} from "./api/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000; // Usa un puerto predeterminado si no está definido

// Configura CORS
app.use(
  cors({
    origin: "https://ro-ma-sys.vercel.app", // Reemplaza con el origen de tu frontend
    methods: "GET,POST,PUT,DELETE", // Métodos permitidos
    credentials: true, // Permitir credenciales (cookies, autenticación)
  })
);

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para validar métodos HTTP
app.use(validateHttpMethod);

// Rutas de API
app.use("/api/clients", clientsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/filter/clients", filterRoutes);
app.use("/api/reports", reportsRoutes);

// Iniciar el envío de mensajes programados
const startServer = async () => {
  try {
    await startMessageSending(); // Inicia la tarea programada
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Termina el proceso si hay un error
  }
};

// Manejo de promesas no capturadas
process.on("unhandledRejection", handleUnhandledRejection);

// Middleware para manejar errores globales
app.use(errorHandler);

// Inicializa el servidor
startServer();