//udp connection is kind of broadcasting
// it just send the message doesn't look back for the message delivery

// USER DIAGRAM PROTOCOL

import dgram from "node:dgram";

// Define the server address and port
const UDP_IP = "0.0.0.0"; // Localhost
const UDP_PORT = 4000; // The port number the server will listen on

// Create a UDP socket
const socket = dgram.createSocket("udp4");

// Handle incoming messages
socket.on("message", (msg, remote) => {
  console.log(
    `Received message: ${msg.toString()} from ${remote.address}:${remote.port}`
  );

  // Optionally, send a response back to the client
  const response = Buffer.from(`Message received: ${msg}`);
  socket.send(
    response,
    0,
    response.length,
    remote.port,
    remote.address,
    (err) => {
      if (err) {
        console.error("Error sending response:", err);
      } else {
        console.log("Response sent");
      }
    }
  );
});

// Bind the server socket to the IP and port
socket.bind({ port: UDP_PORT }, UDP_IP, () => {
  const address = socket.address();
  console.dir(address, { depth: null });
  console.log(`Listening on port ${address.port}`);
});
