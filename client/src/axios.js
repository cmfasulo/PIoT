import axios from 'axios';

let apiServer = 'http://localhost:4242';

let instance = axios.create({
  baseURL:apiServer
});

instance.interceptors.response.use(undefined, function (err) {
  if (err.response.status === 401 && err.response.statusText === 'Unauthorized' && !err.response.data) {
    window.location.replace('/login');
  }
});

export default instance;
