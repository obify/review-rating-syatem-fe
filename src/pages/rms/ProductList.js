import React, { useEffect, useState } from 'react';
import reviewService from '../../services/review.service';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const[products, setProducts] = useState([]);

    const getAllProducts = async ()=>{
       const response = await reviewService.getAllProducts();
       setProducts(response.data);
    }

    useEffect(()=>{
        getAllProducts();
    }, [])
    return (
        <div>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-3">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">FLIPPY PRODUCTS</h1>
                            <p className="lead text-muted">Best range of products at reasonable prices</p>
                        </div>
                    </div>
                </section>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {products.map((product)=>{
                                return <div className="col" key={product.id}>
                                <div className="card shadow-sm">
                                    {/* <svg className="bd-placeholder-img card-img-top" width="100%" height={225} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                                    <img className="bd-placeholder-img card-img-top" width="100%" height={225} src={product.images[0]}/>
                                    <div className="card-body">
                                        <h5 className="fw-light">{product.title}</h5>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`/products/`+product.id} type="button" className="btn btn-md btn-outline-primary">View</Link>
                                            </div>
                                            <small className="text-muted">{product.price} INR</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductList