# Guia de consumo - API de Consulta de Clientes SENATI

## 1. Informacion general

La API permite consultar los datos principales de un cliente usando su codigo de cliente.

- Metodo: `GET`
- Protocolo: HTTPS
- Base URL: `https://senatiapi.onrender.com`
- Autenticacion actual: no requiere token para esta demostracion.
- Formato de respuesta: JSON
- Version: `v1`

## 2. Documentacion interactiva

Swagger UI:

<https://senatiapi.onrender.com/docs/>

Contrato OpenAPI en JSON:

<https://senatiapi.onrender.com/openapi.json>

Health check:

<https://senatiapi.onrender.com/health>

La respuesta esperada del health check es:

```json
{
  "status": "ok"
}
```

## 3. Endpoint de consulta

```text
GET https://senatiapi.onrender.com/api/v1/clientes/{codigoCliente}
```

### Parametro de ruta

| Parametro | Tipo | Obligatorio | Regla |
|---|---|---:|---|
| `codigoCliente` | string | Si | Exactamente 9 numeros, incluyendo ceros a la izquierda |

Patron de validacion:

```text
^\\d{9}$
```

El codigo debe enviarse como texto para conservar los ceros iniciales. Por ejemplo, `000000375` no debe convertirse en el numero `375`.

## 4. Usuarios o clientes de prueba

Estos son los codigos disponibles actualmente en el ambiente demo:

| Codigo | Nombre completo | Zonal | Area de gerencia |
|---|---|---|---|
| `000000375` | MIGUEL ALBERTO CHAPILLIQUEN REQUEJO | Lima Centro | Gerencia de Atención al Cliente |
| `001079652` | CARLOS ALBERTO DAMACEN SANCHEZ | Lima Norte | Gerencia de Atención al Cliente |

La API no esta limitada a estos dos codigos. En produccion, los registros deben provenir de la fuente oficial del cliente.

## 5. Consulta exitosa

### Codigo `000000375`

```bash
curl --request GET \
  --url https://senatiapi.onrender.com/api/v1/clientes/000000375 \
  --header "Accept: application/json"
```

Respuesta HTTP `200 OK`:

```json
{
  "codigoCliente": "000000375",
  "nombreCompleto": "MIGUEL ALBERTO CHAPILLIQUEN REQUEJO",
  "zonal": "Lima Centro",
  "areaGerencia": "Gerencia de Atención al Cliente"
}
```

### Codigo `001079652`

```bash
curl --request GET \
  --url https://senatiapi.onrender.com/api/v1/clientes/001079652 \
  --header "Accept: application/json"
```

Respuesta HTTP `200 OK`:

```json
{
  "codigoCliente": "001079652",
  "nombreCompleto": "CARLOS ALBERTO DAMACEN SANCHEZ",
  "zonal": "Lima Norte",
  "areaGerencia": "Gerencia de Atención al Cliente"
}
```

## 6. Ejemplos por tecnologia

### PowerShell

```powershell
Invoke-RestMethod `
  -Uri "https://senatiapi.onrender.com/api/v1/clientes/001079652" `
  -Method Get `
  -Headers @{ Accept = "application/json" }
```

### JavaScript

```javascript
const response = await fetch(
  "https://senatiapi.onrender.com/api/v1/clientes/001079652",
  { headers: { Accept: "application/json" } }
);

const data = await response.json();
console.log(data);
```

## 7. Manejo de errores

### `400 Bad Request`: codigo invalido

Se produce cuando el codigo no tiene exactamente 9 numeros.

Ejemplo:

```text
GET https://senatiapi.onrender.com/api/v1/clientes/375
```

Respuesta:

```json
{
  "error": "INVALID_CLIENT_CODE",
  "message": "El codigo de cliente debe contener exactamente 9 digitos numericos."
}
```

Otros ejemplos invalidos:

- `375` tiene menos de 9 digitos.
- `0000003750` tiene mas de 9 digitos.
- `00107965A` contiene una letra.
- ` 001079652` contiene un espacio.

### `404 Not Found`: cliente no encontrado

Se produce cuando el codigo tiene el formato correcto, pero no existe en la fuente de datos demo.

Ejemplo:

```text
GET https://senatiapi.onrender.com/api/v1/clientes/999999999
```

Respuesta:

```json
{
  "error": "CLIENT_NOT_FOUND",
  "message": "No se encontro un cliente para el codigo indicado."
}
```

### `404 Not Found`: ruta inexistente

Se produce cuando se solicita una ruta diferente a las documentadas.

Respuesta:

```json
{
  "error": "ROUTE_NOT_FOUND",
  "message": "La ruta solicitada no existe."
}
```

### Errores no funcionales

El servicio demo no implementa actualmente autenticacion, rate limiting ni un formato especial para errores `500`. Antes de pasar a produccion se recomienda agregar autenticacion, limites de consumo, monitoreo y trazabilidad.

## 8. Flujo recomendado de integracion

1. Consultar `GET /health` para verificar disponibilidad.
2. Enviar el codigo como string de 9 digitos.
3. Revisar el codigo HTTP antes de leer los campos de negocio.
4. Para `200`, procesar `nombreCompleto`, `zonal` y `areaGerencia`.
5. Para `400`, corregir el formato del codigo.
6. Para `404`, informar que el cliente no fue encontrado.
7. Registrar el identificador de la consulta y el estado, sin guardar datos sensibles innecesarios.

## 9. Consideraciones para produccion

- Consumir siempre mediante HTTPS.
- Definir autenticacion con el cliente, por ejemplo API key u OAuth 2.0.
- Reemplazar los datos demo por la fuente oficial.
- Acordar limites de solicitudes y tiempos de respuesta.
- Mantener estable el contrato de los campos de respuesta.
- No exponer credenciales en el codigo fuente.
