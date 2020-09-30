import express, { json } from 'express';
import cors from 'cors';
import router from './server/routes/userRoute';

const app = express();

const corsOptions = {
  origin: 'http://localhost:1338'
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(json());
// app.use(logger("dev"));

// CORPS : allowing orgins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to chris's blog application." });
});

// API Entry
app.use('/api/v1', router);

export default app;
