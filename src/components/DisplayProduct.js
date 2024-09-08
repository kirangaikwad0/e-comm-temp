// import React, { useEffect } from "react";
// import styles from "../styles/DisplayProduct.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { showProduct } from "../features/ProductDetailSlice";

// const DisplayProduct = () => {
//   const dispatch = useDispatch();

//   const { products, loading } = useSelector((state) => state.app);

//   useEffect(() => {
//     dispatch(showProduct());
//   }, []);

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <>
//       {products &&
//         products.map((ele) => (
//           <div className={styles.productCard}>
//             <div className={styles.left}>
//               <img
//                 alt=""
//                 src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
//               />
//             </div>

//             <div className={styles.right}>
//               <div className={styles.title}>{ele.title}</div>
//               <div className={styles.price}>Rs.4000</div>
//               <img
//                 className={styles.stars}
//                 alt="stars"
//                 src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
//               />
//             </div>

//             <div className={styles.details}>
//               <p>
//                 Slim-fitting style, contrast raglan long sleeve, three-button
//                 henley placket, light weight & soft fabric for breathable and
//                 comfortable wearing. And Solid stitched shirts with round neck
//                 made for durability and a great fit for casual fashion wear and
//                 diehard baseball fans. The Henley style round neckline includes
//                 a three-button placket.
//               </p>

//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png"
//                 alt="edit"
//               />

//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
//                 alt="delete"
//               />

//               <div className={styles.actionIcon}>
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/9376/9376776.png"
//                   alt="addToCart"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//     </>
//   );
// };

// export default DisplayProduct;

import React, { useEffect } from "react";
import styles from "../styles/DisplayProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, showProduct } from "../features/ProductDetailSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../features/CartSlice";
import toast from "react-hot-toast";

const DisplayProduct = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showProduct());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // add to cart
  const sendToCart = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added to cart");
  };

  console.log("updated from display", products);

  return (
    <>
      {products &&
        products.map((ele) => (
          <div key={ele.id} className={styles.productCard}>
            <div className={styles.left}>
              <img alt={ele.title} src={ele.image || "default-image-url.jpg"} />
            </div>

            <div className={styles.right}>
              <div className={styles.title}>{ele.title}</div>
              <div className={styles.price}>Rs.{ele.price}</div>
              <div className={styles.rating}>
                <span>{ele.rating.rate}</span>
                <img
                  className={styles.stars}
                  alt="stars"
                  src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                />
              </div>
            </div>

            <div className={styles.details}>
              <p>{ele.description}</p>
              <Link to={`/edit/${ele.id}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png"
                  alt="edit"
                />
              </Link>

              <img
                src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
                alt="delete"
                onClick={() => {
                  dispatch(deleteProduct(ele.id));
                  toast.success("Item deleted");
                }}
              />

              <div className={styles.actionIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9376/9376776.png"
                  alt="add to cart"
                  onClick={() => sendToCart(ele)}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default DisplayProduct;
