const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const { findClientByCode } = require("./data");

const app = express();
const CLIENT_CODE_PATTERN = /^\d{9}$/;

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (_request, response) => {
  response.json(swaggerSpec);
});

/**
 * @openapi
 * /api/v1/clientes/{codigoCliente}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Consulta los datos principales de un cliente
 *     description: Devuelve nombre completo, zonal y area de gerencia para cualquiera de los clientes registrados, usando un codigo numerico de exactamente 9 digitos.
 *     parameters:
 *       - in: path
 *         name: codigoCliente
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{9}$'
 *           example: '000000375'
 *         description: Codigo de cliente de exactamente 9 digitos. Ejemplos disponibles son 000000375 y 001079652.
 *     responses:
 *       200:
 *         description: Cliente encontrado.
 *       400:
 *         description: El codigo no cumple el formato requerido.
 *       404:
 *         description: No se encontro un cliente con el codigo indicado.
 */
app.get("/api/v1/clientes/:codigoCliente", (request, response) => {
  const { codigoCliente } = request.params;

  if (!CLIENT_CODE_PATTERN.test(codigoCliente)) {
    return response.status(400).json({
      error: "INVALID_CLIENT_CODE",
      message: "El codigo de cliente debe contener exactamente 9 digitos numericos."
    });
  }

  const client = findClientByCode(codigoCliente);
  if (!client) {
    return response.status(404).json({
      error: "CLIENT_NOT_FOUND",
      message: "No se encontro un cliente para el codigo indicado."
    });
  }

  return response.json(client);
});

app.use((_request, response) => {
  response.status(404).json({
    error: "ROUTE_NOT_FOUND",
    message: "La ruta solicitada no existe."
  });
});

module.exports = app;
