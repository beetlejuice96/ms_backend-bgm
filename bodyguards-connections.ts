const ioBodyGuards = require('socket.io-client');

// Dirección del servidor de Socket.IO
const serverUrl = 'http://localhost:3021/socket';

// Número de conexiones a simular
const numConnections = 1;

// Arreglo para almacenar las instancias de los clientes
const clients = [];

// Función para conectar un nuevo cliente
function connectClient() {
  const client = ioBodyGuards(serverUrl, {
    query: {
      routeId: Math.floor(Math.random() * 10),
      userId: Math.floor(Math.random() * 1000),
    },
  });

  client.on('connect', () => {
    console.log(`Cliente conectado: ${client.id}`);
  });

  //mandar un mensaje al servidor
  setInterval(() => {
    client.emit('track', {
      routeId: 1,
      userId: 1,
      lat: 19.4326,
      lng: -99.1332,
    });
  }, 1000);

  client.on('disconnect', () => {
    console.log(`Cliente desconectado: ${client.id}`);
  });

  // Agrega el cliente al arreglo
  clients.push(client);
}

// Conecta múltiples clientes
for (let i = 0; i < numConnections; i++) {
  connectClient();
}

console.log(`Simulando ${numConnections} conexiones al servidor ${serverUrl}`);
