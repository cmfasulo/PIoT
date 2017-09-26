import axios from 'axios';

let instance = axios.create({
  baseURL: 'http://localhost:4242'
});

instance.interceptors.response.use(undefined, function (err) {
  if (err.response.status === 401 && err.response.statusText === 'Unauthorized' && !err.response.data) {
    window.location.replace('/login');
  }
});

export default instance;
