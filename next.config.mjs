/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  // Configuración de entorno
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  // Variables para el servidor (acceso a variables solo en el backend)
  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mi-app.com",
  },



  // Asegura que Next.js ejecute el servidor sin generar un frontend
  target: 'server',  // Esto permite que Next.js se ejecute solo en el servidor, sin generar una interfaz frontend.

  // Configura el directorio de build para que se guarde en un lugar organizado
  distDir: 'build', // Puedes cambiarlo a cualquier nombre que desees para la salida del build
};

export default nextConfig;
