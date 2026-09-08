# Documento de solicitud de acceso y consumo

## Objetivo

Solicitar al cliente la informacion y autorizaciones necesarias para integrar la API de consulta de clientes.

## Servicio solicitado

- Metodo: `GET`
- Ruta: `/api/v1/clientes/{codigoCliente}`
- Entrada: codigo de cliente numerico de exactamente 9 digitos.
- Ejemplos de entrada: `000000375` y `001079652`
- Autenticacion: por definir con el cliente antes de pasar a produccion. Para una implementacion real se recomienda API key o OAuth 2.0 sobre HTTPS.

## Datos requeridos al cliente

1. URL base del ambiente de pruebas.
2. URL base del ambiente productivo, cuando corresponda.
3. Confirmacion de que el codigo de cliente siempre tiene 9 digitos numericos.
4. Fuente oficial de los campos y sus nombres funcionales:
   - Nombre completo.
   - Zonal.
   - Area de gerencia.
5. Reglas de acceso, IPs permitidas y metodo de autenticacion.
6. Contacto tecnico para incidencias y horario de soporte.
7. Volumen esperado de consultas y limite de solicitudes por minuto.
8. Ejemplos anonimizados de respuestas validas, no encontradas y errores.

## Ejemplo de consumo

```bash
curl --request GET \
  --url https://senatiapi.onrender.com/api/v1/clientes/000000375 \
  --header 'Accept: application/json'
```

## Respuestas esperadas

- `200`: consulta exitosa.
- `400`: el codigo no tiene exactamente 9 digitos numericos.
- `404`: codigo valido, pero no existe en la fuente de datos.
- `429`: limite de solicitudes excedido, si se habilita rate limiting en produccion.
- `500`: error interno no controlado.

## Criterios de aceptacion

- El servicio responde solo por HTTPS en produccion.
- Swagger UI esta disponible en `/docs`.
- El endpoint devuelve los tres campos acordados con nombres estables.
- Se registran errores sin exponer datos sensibles.
- Se valida el comportamiento con un codigo valido, uno invalido y uno inexistente.
