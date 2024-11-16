import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://api.escuelajs.co/api/v1";
//const API_REVIEW_URL = "http://localhost:9090/rms/api/v1";
const API_REVIEW_URL = "http://178.16.137.35:9090/rms/api/v1";

const getAllProducts = () => {
  return axios.get(API_URL + "/products");
};

const getProduct = (productId) => {
  return axios.get(API_URL + "/products/"+productId);
};

const getAllReviews = async (request) => {
  return axios.post(API_REVIEW_URL + "/reviews/retrieve", request , { headers: authHeader() });
};

const getReviewSummary = async (request) => {
  return axios.post(API_REVIEW_URL + "/reviews/count", request, { headers: authHeader() });
};

const saveReview = async (request) => {
  return axios.post(API_REVIEW_URL + "/reviews/save", request , { headers: authHeader() });
};

export default {
  getAllProducts,
  getProduct,
  getAllReviews,
  saveReview,
  getReviewSummary
};
