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

  // Elimina 'target: server' ya que es innecesario en Next.js 12+
  distDir: 'build', // Puedes mantenerlo si deseas personalizar la carpeta de build
};

export default nextConfig;
