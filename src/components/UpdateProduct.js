// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   const { id } = useParams();

//   const [updateData, setupdateData] = useState();
//   const { products, loading } = useSelector((state) => state.app);

//   useEffect(() => {
//     if (id) {
//       const singleProduct = products.filter((ele) => ele.id === id);
//       setupdateData(singleProduct);
//     }
//   }, []);

//   console.log(updateData);

//   return (
//     <div>
//       <h2>Update product</h2>
//       <form className="w-50 mx-auto my-5">
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             className="form-comtrol"
//             name="title"
//             value={updateData.title}
//             // OnChange={getProductData}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Price</label>
//           <input
//             name="price"
//             value={updateData.price}
//             //   OnChange={getProductData}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <input
//             name="description"
//             value={updateData.description}
//             //    OnChange={getProductData}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <input
//             name="category"
//             value={updateData.category}
//             //    OnChange={getProductData}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Image</label>
//           <input
//             name="image"
//             value={updateData.image}
//             //    OnChange={getProductData}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">rating</label>
//           <input
//             name="rating"
//             value={updateData.rating?.rate}
//             //    OnChange={getProductData}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Add product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../features/ProductDetailSlice";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "" },
  });
  const { products, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id && products.length > 0) {
      const singleProduct = products.find((ele) => ele.id === parseInt(id));
      if (singleProduct) {
        setUpdateData(singleProduct);
      }
    }
  }, [id, products]);

  const handleInputChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  console.log("updated data", updateData);

  //Update cart
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct(updateData));
    toast.success("Item Updated");
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-center mt-1">Update Product</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={updateData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            name="price"
            value={updateData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            name="description"
            value={updateData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            className="form-control"
            name="category"
            value={updateData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            className="form-control"
            name="image"
            value={updateData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            className="form-control"
            name="rating"
            value={updateData.rating?.rate}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
