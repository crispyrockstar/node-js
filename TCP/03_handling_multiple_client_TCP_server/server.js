import net from "node:net";

let clientArray = [];
let clientId = 1;

const host = "0.0.0.0";
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
  // console.log(socket);
  const currentClientID = clientId++;
  clientArray.push({ socket, clientId: currentClientID });

  // Send a welcome message to the client
  socket.write(
    `Welcome to the main TCP server!\n your clientId: ${currentClientID}`
  );

  // Listen for data from the client
  socket.on("data", (data) => {
    console.log(`Received from client: ${data.toString()}`);
    // send a response back to the client
    socket.write(`Message received: ${data.toString()}`);
  });

  // Handle client disconnection
  socket.on("end", () => {
    console.log("Client disconnected: ", client, currentClientID);
    clientArray = clientArray.filter(
      (client) => client.clientId !== currentClientID
    );
  });

  // Handle socket errors
  socket.on("error", (err) => {
    console.error("Socket error with clientId:", currentClientID, err);
    clientArray = clientArray.filter(
      (client) => client.clientId !== currentClientID
    );
  });
});

// Start the server
server.listen(port, host, () => {
  console.log(`TCP server listening on ${host}:${port}`);
});

//broadcasting a message to connected clients
process.stdin.on("data", (data) => {
  const inputString = data.toString();
  const [clientID] = inputString.split(" ");
  const isValidClient =
    parseInt(clientID) !== NaN &&
    parseInt(clientID) > 0 &&
    clientArray[parseInt(clientID) - 1];
  if (isValidClient) {
    clientArray[parseInt(clientID) - 1].socket.write(inputString.substring(1));
  } else {
    clientArray.forEach((client) => {
      client.socket.write(inputString);
    });
  }
});
