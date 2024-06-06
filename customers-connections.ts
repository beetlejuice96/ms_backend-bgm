const io = require('socket.io-client');
const serverUrlCustomers = 'http://localhost:3021/socket';
const numConnectionsCustomers = 10;
const clientsCustomers = [];

function connectClientCustomers() {
  const client = io(serverUrlCustomers, {
    query: {
      routeId: Math.floor(Math.random() * 10),
      userId: Math.floor(Math.random() * 1000),
    },
  });

  client.on('connect', () => {
    console.log(`Cliente conectado: ${client.id}`);
  });

  client.on('track', (data) => {
    console.log('track', data);
  });

  client.on('disconnect', () => {
    console.log(`Cliente desconectado: ${client.id}`);
  });

  clientsCustomers.push(client);
}

for (let i = 0; i < numConnectionsCustomers; i++) {
  connectClientCustomers();
}

console.log(
  `Simulando ${numConnectionsCustomers} conexiones al servidor ${serverUrlCustomers}`,
);
