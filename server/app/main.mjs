import express from 'express';
import router from './router.mjs';

const PORT = 4444;
const app = express();

app.use((req, res, next) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('content-type', 'application/json');
  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
