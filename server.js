import http from 'http';

import app from './app';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listen the server ${PORT}`);
});
