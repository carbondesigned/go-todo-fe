import axios from 'axios';

const URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL;

const instance = axios.create({ baseURL: URL });
instance.interceptors.request.use((config) => {
  config.params = {
    // add your default ones
    // spread the request's params
    ...config.params,
  };
  return config;
});
export default instance;
