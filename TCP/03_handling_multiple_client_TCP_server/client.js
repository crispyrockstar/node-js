import net from "node:net";

const host = "localhost"; // Server address
const port = 4000; // Server port

const socket = net.createConnection({ host, port }, () => {
  // Get server's address and port once connected
  const serverAddress = socket.remoteAddress; // Server's IP address
  const serverPort = socket.remotePort; // Server's port

  console.log(`Connected to server at ${serverAddress}:${serverPort}`);
});

// Handle data received from the server
socket.on("data", (data) => {
  console.log(`Received from server: ${data.toString()}`);
  //   socket.end(); // Close the connection after receiving the response
});

// Handle socket closure
socket.on("end", () => {
  console.log("Disconnected from server");
});

// Handle errors
socket.on("error", (err) => {
  console.error("Client error:", err);
});

process.stdin.on("data", (data) => {
  socket.write(data.toString());
});
