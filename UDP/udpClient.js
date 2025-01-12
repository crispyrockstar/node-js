import dgram from "node:dgram";

// Define server address and port
const UDP_IP = "127.0.0.1";
const UDP_PORT = 4000;

// Create a UDP socket
const client = dgram.createSocket("udp4");

// Message to send
const message = Buffer.from("Hello, Server!");

// Send message to the server
client.send(message, UDP_PORT, UDP_IP, (err) => {
  if (err) {
    console.error("Error sending message:", err);
    client.close();
  } else {
    console.log("Message sent to server");
  }
});

// Receive a response from the server
client.on("message", (msg, rinfo) => {
  console.log(
    `Received response: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`
  );
  client.close();
});
