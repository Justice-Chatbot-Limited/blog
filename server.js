import http from "http";

import app from "./app";

const PORT = process.env.PORT || 3003;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listen the server ${PORT}`);
});
