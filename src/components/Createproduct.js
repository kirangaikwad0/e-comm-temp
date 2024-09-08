
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/ProductDetailSlice";
import { useNavigate } from "react-router-dom";

const Createproduct = () => {
  const [products, setProducts] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "" }, // If rating is an object
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductData = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      setProducts((prevState) => ({
        ...prevState,
        rating: { ...prevState.rating, rate: value }, // Handle rating as an object
      }));
    } else {
      setProducts({ ...products, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(products);
    dispatch(createProduct(products));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="text-center mt-1">Add Product</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control" // Fixed typo
            name="title"
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            name="price"
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            name="description"
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            className="form-control"
            name="category"
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            className="form-control"
            name="image"
            onChange={getProductData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            className="form-control"
            name="rating"
            onChange={getProductData}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Createproduct;
