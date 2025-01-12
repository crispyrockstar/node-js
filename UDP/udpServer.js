//udp connection is kind of broadcasting
// it just send the message doesn't look back for the message delivery

// USER DIAGRAM PROTOCOL

import dgram from "node:dgram";

// Define the server address and port
const UDP_IP = "0.0.0.0"; // Localhost
const UDP_PORT = 4000; // The port number the server will listen on

// Create a UDP socket
const server = dgram.createSocket("udp4", () => {
  const address = server.address();
  console.log(`Server is listening on ${address.address}:${address.port}`);
});

// Bind the server to the specified IP and port -- written in above callback
// server.on("listening", () => {
//   const address = server.address();
//   console.log(`Server is listening on ${address.address}:${address.port}`);
// });

// Handle incoming messages
server.on("message", (msg, remote) => {
  console.log(
    `Received message: ${msg.toString()} from ${remote.address}:${remote.port}`
  );

  // Optionally, send a response back to the client
  const response = Buffer.from(`Message received: ${msg}`);
  server.send(
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

// Bind the server to the IP and port
server.bind(UDP_PORT, UDP_IP);
