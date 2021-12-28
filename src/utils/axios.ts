import axios from "axios";

export const axios_instance = (withCredentials = false) =>
  axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_API_ENDPOINT_DEV
        : process.env.REACT_APP_API_ENDPOINT_PROD,
    withCredentials: withCredentials,
  });
