import net from "node:net";

const host = "0.0.0.0"; // Server address
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
  // socket.end(); // Close the connection after receiving the response
});

// Handle socket closure
socket.on("end", () => {
  console.log("Disconnected from server");
});

// Handle errors
socket.on("error", (err) => {
  console.error("Client error:", err);
});

//to send the message from the client terminal
process.stdin.on("data", (data) => {
  socket.write(data.toString());
  console.log(data.toString());
  if (data.toString().trim().toLocaleLowerCase() === "close") {
    socket.end(); // Close the connection after receiving the response
  }
  if (data.toString().trim().toLocaleLowerCase() === "start") {
    socket.connect();
  }
});
