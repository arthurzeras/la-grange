import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:4444',
});

export default axios;
