import express from "express";
import clientsRoutes from "./api/routes/clients-routes.js";
import paymentsRoutes from "./api/routes/payments-routes.js";
import filterRoutes from "./api/routes/filter-routes.js";
import reportsRoutes from "./api/routes/reports-routes.js"
// import whatsappRoutes from "./api/routes/whatsapp-routes.js";
// import { whatsapp, isAuthenticated } from "./apiWhatsApp/lib/whatsapp.js";
// import sendRoutine from "./apiWhatsApp/routes/send-routines.js";
// import notifyExpiration from "./apiWhatsApp/routes/notify-expiration.js";

import {startMessageSending} from "./api/schedule-messages/membership-to-expire.js"

import { validateHttpMethod } from "./api/middleware/validation.js";
import {
  errorHandler,
  handleUnhandledRejection,
} from "./api/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ro-ma-sys.vercel.app'); // Permite solo este origen
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
  next();
});

if (req.method === 'OPTIONS') {
  // Handle the preflight request
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or specify specific origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  res.status(200).end(); // Respond with 200 OK and terminate the response
} else {
  // Your serverless function here
}

//? Middleware para validar métodos HTTP
app.use(validateHttpMethod);

//? Rutas de API
app.use("/api/clients", clientsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/filter/clients", filterRoutes);
app.use("/api/reports", reportsRoutes);

//!Al correr el server ocupo que se este llmando constantemente la funcion del archivo membership-to-expire.js

await startMessageSending();

//? Rutas para enviar rutinas a WhatsApp
//!app.use("/apiWhatsApp", sendRoutine);

//? Rutas para avisar caducidad de membresías
//!app.use("/apiWhatsApp", notifyExpiration);

//?Ruta para el qr
//!app.use("/api/isConnected", whatsappRoutes);

//? Inicializa el cliente de WhatsApp
//!whatsapp.initialize();

//? Manejo de promesas no capturadas
process.on("unhandledRejection", handleUnhandledRejection);

//? Middleware para manejar errores globales
app.use(errorHandler);

//? Inicializa el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
