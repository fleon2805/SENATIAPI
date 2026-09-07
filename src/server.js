const app = require("./app");

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`API escuchando en el puerto ${port}`);
  console.log(`Swagger UI disponible en http://localhost:${port}/docs`);
});
