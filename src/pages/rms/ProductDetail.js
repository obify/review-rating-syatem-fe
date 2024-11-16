import React, { useEffect, useState } from 'react';
import {
  useParams,
} from "react-router-dom";
import RangeSlider from 'react-bootstrap-range-slider';
import Swal from 'sweetalert2';
import reviewService from '../../services/review.service';
import getOrganization from '../../services/utils';
import ReactStars from "react-rating-stars-component";

const ProductDetail = () => {

  const [product, setProduct] = useState();
  let { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userId, setUserId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState([]);

  const submitReview = async (event) => {
    event.preventDefault();
    if (review === "" || userId === "") {
      Swal.fire({
        title: "Mandatory Field",
        text: "One or more mandatory fields are empty!",
        icon: "error"
      });
      return;
    }
    try {
      let org = getOrganization();
      let request = { rating: rating, userId: userId, productId: productId, review: review, organizationId: org.orgId, status: "active" };
      let response = await reviewService.saveReview(request);
      console.log(response);
      if (response.status === 201) {
        getProductReviews();
        getReviewSummary();
        Swal.fire({
          title: "Congratulations",
          text: "Review added successfully",
          icon: "success"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: error.response.data[0].message,
        icon: "error"
      });
    }
  }

  const getProductReviews = async () => {
    let request = { productId: productId, status: "active", pageNo: 0, pageSize: 1000 };
    let response = null;
    try {
      response = await reviewService.getAllReviews(request);
      setReviews(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const getReviewSummary = async () => {
    let response = null;
    let request = { productId: productId };
    try {
      response = await reviewService.getReviewSummary(request);
      setReviewSummary(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function getProduct() {
    let response = await reviewService.getProduct(productId);
    setProduct(response.data);
  }
  useEffect(() => {
    getProduct();
    getProductReviews();
    getReviewSummary();
  }, [])
  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            {product && <img src={product.images[0]} className="d-block mx-lg-auto img-fluid" alt="Product Image" width={700} height={500} loading="lazy" />}
          </div>
          <div className="col-lg-6">
            {product && <h1 className="display-5 fw-bold lh-1 mb-3">{product.title}</h1>}
            {product && <p className="lead">{product.description}</p>}
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <input placeholder='Enter quantity' type='number' className='p-1' />
              <button type="button" className="btn btn-primary btn-md px-4 me-md-2">Buy now</button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-5 col-sm-12'>
            <h4 className='text-center mb-4'>Write your review</h4>
            <form onSubmit={submitReview}>
              {/*<div className="mb-3">
                <label htmlFor="apiKey" className="form-label">API Key</label>
                <input placeholder='Enter organization API key' value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="text" className="form-control" id="apiKey" />
              </div>*/}
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">User Id</label>
                <input placeholder='Enter the user id' value={userId} onChange={(e) => setUserId(e.target.value)} type="text" className="form-control" id="userId" />
              </div>
              <div className="mb-3">
                <label htmlFor="reviewBox" className="form-label">Enter your review</label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-control" id="reviewBox" />
              </div>
              <div className="mb-3">
                <label htmlFor="ratingSlider" className="form-label">Rating</label>
                <RangeSlider min={0} max={5} step={0.1}
                  value={rating}
                  onChange={event => setRating(event.target.value)}
                />
              </div>
              <button type="submit" className="d-flex w-100 btn btn-primary justify-content-center">Submit</button>
            </form>

          </div>
          <div className='col-md-7 col-sm-12'>
            <div className='col-12'>
              <h4 className='text-center mb-4'>Review Summary</h4>
              <div className="card w-100 mx-auto">
                <div className="card-body">
                    {  
                      reviewSummary.length>0 ?
                        reviewSummary.map((r)=>{
                          return <div key={r.comment} className='d-flex justify-content-between align-items-center'>
                                <ReactStars
                                  count={r.rating}
                                  color="#ffd700"
                                  size={30}
                                  activeColor="#ffd700" />
                                <label>{r.comment} ({r.count})</label>
                            </div>
                        })
                        : <h4>No reviews</h4>
                    }
                </div>
              </div>
              

              {/* {
                reviewSummary.length > 0 ? reviewSummary.map((r) => {
                  return <div key={r.rating} className="card mx-auto mt-2" style={{ width: '100%' }}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Rating range: {r.rating} - Rating count: {r.count}</h5>
                      </div>
                    </div>
                  </div>
                }) : <h6 className='text-center'>No reviews found</h6>
              } */}
            </div>
            <div className='col-12 mt-4'>
              <h4 className='text-center mb-4'>All Reviews</h4>
              {
                reviews.length > 0 ? reviews.map((r) => {
                  return <div key={r.id} className="card mx-auto mt-2" style={{ width: '100%' }}>
                    <div className="card">
                      <div className="card-body">
                        <ReactStars
                            count={r.rating}
                            color="#ffd700"
                            size={30}
                            activeColor="#ffd700" />
                        <p className="card-text">{r.review}</p>
                      </div>
                      <div className="ms-3 text-muted pb-1">
                        By user: {r.userId} on {r.createdAt}
                      </div>
                    </div>
                  </div>
                }) : <h6 className='text-center'>No reviews found</h6>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail