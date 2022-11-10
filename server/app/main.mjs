import axios from 'axios';
import express from 'express';

const PORT = 4444;
const BASE_URL = process.env.BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

const app = express();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const requestHandler = async (req, res) => {
  let response = {};

  try {
    const payload = {
      method: req.method,
      url: `${BASE_URL}/${req.url}`,
      headers: {
        authorization: `Bearer ${API_TOKEN}`,
      },
    };

    response = (await axios.request(payload)).data;
  } catch (error) {
    res.sendStatus(error?.response?.status || 500);
    response = error?.response?.data || { error: 'unexpected error' };
  }

  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('content-type', 'application/json');
  res.send(response);
};

app.get('*', requestHandler);
app.post('*', requestHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
