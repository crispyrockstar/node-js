import net from "node:net";

const SERVER_PORT = 4000;
const SERVER_IP = "0.0.0.0";

const server = net.createServer();

server.listen(SERVER_PORT, SERVER_IP, () => {
  console.log("Server started on port", SERVER_PORT);
});

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    socket.write("HTTP\n\n Got your message");
    socket.end();
  });
});

// server.on("listening", () => {
//   console.log("Server started on port", SERVER_PORT);
// });
