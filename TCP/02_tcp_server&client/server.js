import net from "node:net";

const SERVER_PORT = 4000;
const SERVER_IP = "0.0.0.0";

const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    socket.write("HTTP\n\n Got your message");
    // socket.end();
  });

  socket.on("close", () => {
    console.log(socket.remoteAddress, ": client disconnected");
  });

  socket.on("error", () => {
    console.log("Client lost");
  });

  console.log("Client connected", socket.remoteAddress);
});

server.listen(SERVER_PORT, SERVER_IP, () => {
  console.log("Server started on port", SERVER_PORT);
});

//CAN BE WRITTEN IN CREATECONNECTION CALLBACK
// server.on("connection", (socket) => {
//   socket.on("data", (chunk) => {
//     console.log(chunk.toString());
//     socket.write("HTTP\n\n Got your message");
//     socket.end();
//   });
// });

//CAN BE WRITTEN IN LISTEN CALLBACK
// server.on("listening", () => {
//   console.log("Server started on port", SERVER_PORT);
// });
