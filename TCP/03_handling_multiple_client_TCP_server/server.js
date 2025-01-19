import net from "node:net";

let clientArray = [];

const host = "localhost";
const port = 4000;

/* 
target:
create a server using tcp based on net module
when a client gets connected to this server then it should send a greeting and should save the remote ip and port


*/

//callback can be written as on event of "connection", here we will be receiving the socket by which will be act as a bridge between server and client
const server = net.createServer((socket) => {
  const client = `${socket.remoteAddress}, port: ${socket.remotePort}`;
  console.log("Client connected", client);

  //making record for all client connected
  clientArray.push(socket);

  // Send a welcome message to the client
  socket.write("Welcome to the main TCP server!\n");

  // Listen for data from the client
  socket.on("data", (data) => {
    console.log(`Received from client: ${data.toString()}`);
    // send a response back to the client
    socket.write(`Message received: ${data.toString()}`);
  });

  // Handle client disconnection
  socket.on("end", () => {
    console.log("Client disconnected: ", client);
    clientArray = clientArray.filter(
      (client) =>
        client.remoteAddress === socket.remoteAddress &&
        client.remotePort === socket.remotePort
    );
  });

  // Handle socket errors
  socket.on("error", (err) => {
    console.error("Socket error:", err);
    clientArray = clientArray.filter(
      (client) =>
        client.remoteAddress === socket.remoteAddress &&
        client.remotePort === socket.remotePort
    );
  });
});

// Start the server
server.listen(port, host, () => {
  console.log(`TCP server listening on ${host}:${port}`);
});
