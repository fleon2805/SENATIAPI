# API de Consulta de Clientes SENATI

API demostrativa para consultar los datos principales de multiples clientes mediante su codigo.

## Requisitos

- Node.js 20 o superior
- npm

## Instalacion y ejecucion

```bash
npm install
npm start
```

En desarrollo:

```bash
npm run dev
```

URLs locales:

- Swagger UI: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/openapi.json
- Salud del servicio: http://localhost:3000/health

## Endpoint

`GET /api/v1/clientes/{codigoCliente}`

El codigo debe contener exactamente 9 numeros. La API no esta limitada a un solo usuario: actualmente incluye estos datos demo:

- `000000375`
- `001079652`

Ejemplo:

```bash
curl http://localhost:3000/api/v1/clientes/000000375
```

Respuesta `200`:

```json
{
  "codigoCliente": "000000375",
  "nombreCompleto": "Cliente Demo SENATI",
  "zonal": "Lima Centro",
  "areaGerencia": "Gerencia de Atención al Cliente"
}
```

El proyecto usa varios datos en memoria solo para la demostracion. En un ambiente real, `src/data.js` debe reemplazarse por un repositorio conectado a la fuente oficial, sin cambiar el contrato del endpoint.

## Publicacion en Render

1. Subir este proyecto a un repositorio Git.
2. En Render, elegir **New > Web Service** y conectar el repositorio.
3. Usar `npm install` como Build Command y `npm start` como Start Command.
4. Render inyectara `PORT` automaticamente.
5. Validar `/health` y abrir `/docs` usando la URL asignada por Render.

Tambien se puede usar el archivo `render.yaml` con Blueprint.

## Buenas practicas incluidas

- Versionado de la ruta (`/api/v1`).
- Validacion de entrada con expresion regular.
- Respuestas de error consistentes y codigos HTTP apropiados.
- `helmet`, limite de body JSON y desactivacion de `x-powered-by`.
- Health check para el despliegue.
- Contrato OpenAPI visible y consumible.
- Variables de puerto gestionadas por el entorno.
