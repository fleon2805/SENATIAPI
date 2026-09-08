const clients = new Map([
  ["000000375", {
    codigoCliente: "000000375",
    nombreCompleto: "MIGUEL ALBERTO CHAPILLIQUEN REQUEJO",
    zonal: "Lima Centro",
    areaGerencia: "Gerencia de Atención al Cliente"
  }],
  ["001079652", {
    codigoCliente: "001079652",
    nombreCompleto: "CARLOS ALBERTO DAMACEN SANCHEZ",
    zonal: "Lima Norte",
    areaGerencia: "Gerencia de Atención al Cliente"
  }],
  ["001444444", {
    codigoCliente: "001444444",
    nombreCompleto: "JUAN CARLOS PEREZ MENDOZA",
    zonal: "Lima Centro",
    areaGerencia: "Gerencia de Atención al Cliente"
  }]
]);

function findClientByCode(code) {
  return clients.get(code);
}

module.exports = { findClientByCode };
