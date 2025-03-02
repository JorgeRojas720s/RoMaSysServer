import express from "express";
import clientsRoutes from "./api/routes/clients-routes.js";
import paymentsRoutes from "./api/routes/payments-routes.js";
import filterRoutes from "./api/routes/filter-routes.js";
import reportsRoutes from "./api/routes/reports-routes.js";
// import whatsappRoutes from "./api/routes/whatsapp-routes.js";
// import { whatsapp, isAuthenticated } from "./apiWhatsApp/lib/whatsapp.js";
// import sendRoutine from "./apiWhatsApp/routes/send-routines.js";
// import notifyExpiration from "./apiWhatsApp/routes/notify-expiration.js";

import { startMessageSending } from "./api/schedule-messages/membership-to-expire.js";

import { validateHttpMethod } from "./api/middleware/validation.js";
import {
  errorHandler,
  handleUnhandledRejection,
} from "./api/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT; // Añade un valor por defecto para el puerto

// Middleware para parsear el body de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para manejar CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ro-ma-sys.vercel.app"); // Permite solo este origen
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Encabezados permitidos

  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Responde con 200 OK y termina la respuesta
  }

  next();
});




// Middleware para validar métodos HTTP
app.use(validateHttpMethod);

// Rutas de API
app.use("/api/clients", clientsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/filter/clients", filterRoutes);
app.use("/api/reports", reportsRoutes);

// Iniciar el envío de mensajes programados
startMessageSending().catch((error) => {
  console.error("Error al iniciar el envío de mensajes:", error);
});

// Manejo de promesas no capturadas
process.on("unhandledRejection", handleUnhandledRejection);

// Middleware para manejar errores globales
app.use(errorHandler);

// Inicializa el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});