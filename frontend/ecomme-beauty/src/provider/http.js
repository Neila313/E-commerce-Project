import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Accept: 'application/json',
    }
  });
  
  HTTP.interceptors.request.use(
    config => {
      const token = localStorage.getItem('tokenUser');
      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`;
      }
  
      return config;
    }
  );
  
  export default HTTP;
