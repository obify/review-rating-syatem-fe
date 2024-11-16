import axios from "axios";

//const API_URL = "http://localhost:9090/rms/api/v1/organization";
const API_URL = "http://178.16.137.35:9090/rms/api/v1/organization";

const registerOrganization = (request) => {
  return axios.post(API_URL + "/register", request);
};

const register = (request) => {
  return axios.post(API_URL + "/signup", request);
};

const login = (request) => {
  return axios
    .post(API_URL + "/signin", request)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    }).catch((error)=>{
      throw error;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  registerOrganization
};
