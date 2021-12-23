import axios from "axios";

export const axios_instance = (withCredentials = false) =>
  axios.create({
    baseURL:
      process.env.REACT_APP_ENV === "dev"
        ? process.env.REACT_APP_API_ENDPOINT_DEV
        : process.env.REACT_APP_API_ENDPOINT_PROD,
    withCredentials: withCredentials,
  });
