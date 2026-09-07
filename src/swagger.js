const swaggerJSDoc = require("swagger-jsdoc");

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
        url: "http://localhost:3000",
        description: "Desarrollo local"
      },
      {
        url: "https://TU-SERVICIO.onrender.com",
        description: "Render: reemplazar por la URL asignada"
      }
    ]
  },
  apis: ["./src/app.js"]
};

module.exports = swaggerJSDoc(options);
