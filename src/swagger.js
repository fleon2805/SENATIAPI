const swaggerJSDoc = require("swagger-jsdoc");

const apiUrl = process.env.PUBLIC_API_URL || process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API de Consulta de Clientes SENATI",
      version: "1.0.0",
      description: "API demostrativa para consultar los datos principales de un cliente."
    },
    servers: [
      {
        url: apiUrl,
        description: process.env.PUBLIC_API_URL || process.env.RENDER_EXTERNAL_URL
          ? "API publicada"
          : "Desarrollo local"
      }
    ]
  },
  apis: ["./src/app.js"]
};

module.exports = swaggerJSDoc(options);
