//udp connection is kind of broadcasting
// it just send the message doesn't look back for the message delivery

// USER DIAGRAM PROTOCOL

import dgram from "node:dgram";
import fs from "node:fs";

// Define the server address and port
const UDP_IP = "0.0.0.0"; // Localhost
const UDP_PORT = 4000; // The port number the server will listen on

// Create a UDP socket
const socket = dgram.createSocket("udp4");

// write stream
const writeStream = fs.createWriteStream("sample.js");

// Handle incoming messages
socket.on("message", (message, remote) => {
  if (message.toString() === "EOF") {
    console.log(
      `File received successfully from ${remote.address}:${remote.port}`
    );
    socket.send("File uploaded to server", remote.port, remote.address);
  } else {
    writeStream.write(message);
  }
});

// Bind the server socket to the IP and port
socket.bind({ port: UDP_PORT }, UDP_IP, () => {
  const address = socket.address();
  console.dir(address, { depth: null });
  console.log(`Listening on port ${address.port}`);
});
