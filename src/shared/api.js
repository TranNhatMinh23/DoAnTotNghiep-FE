import axios from 'axios'; 

const instance = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_API,
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
        localStorage.removeItem("persist:root");
      }
    }
    return Promise.reject(error);;
  }
);

export default instance;