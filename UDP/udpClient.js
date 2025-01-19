import dgram from "node:dgram";

// Define server address and port
const UDP_IP = "127.0.0.1";
const UDP_PORT = 4000;

// Create a UDP socket
const clientSocket = dgram.createSocket("udp4");

// Message to send
const message = Buffer.from("Hello, Server!");

// Send message to the server
clientSocket.send(message, UDP_PORT, UDP_IP, (err) => {
  if (err) {
    console.error("Error sending message:", err);
    clientSocket.close();
  } else {
    console.log("Message sent to server");
  }
});

// Receive a response from the server
clientSocket.on("message", (msg, rinfo) => {
  console.log(
    `Received response: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`
  );
  // clientSocket.close();
});

//sending message through input from the terminal
process.stdin.on("data", (message) => {
  clientSocket.send(message, UDP_PORT, UDP_IP, (err) => {
    if (err) {
      console.error("Error sending message:", err);
      clientSocket.close();
    } else {
      console.log("Message sent to server");
    }
  });
});
