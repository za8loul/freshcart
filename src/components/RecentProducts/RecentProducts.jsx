import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const { AddToWishlist } = useContext(WishListContext);
  const { addProductToCart, setCart } = useContext(CartContext);

  const [likedProducts, setLikedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  async function addWishlist(productId) {
    let response = await AddToWishlist(productId);
    if (response.data.status === "success") {
      setLikedProducts((prevLikedProducts) => ({
        ...prevLikedProducts,
        [productId]: true,
      }));
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error(response.data.message, {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      setCart(response.data);
      setLoading(false);
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      setLoading(false);
      toast.error(response.data.message, {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  const { data, isError, error, isLoading } = useProducts();
  if (isLoading) {
    return (
      <div className="w-full spinner-container flex justify-center items-center">
        <CircleLoader color="green" size={200} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="w-full px-4 py-4 sm:w-1/2 lg:w-1/4">
            <div className="product">
              <Link to={`/productdetails/${product.id}`}>
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-medium text-green-600">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="text-yellow-500 fa-solid fa-star"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-2">
                <button onClick={() => addProduct(product.id)} className="btn">
                  {currentProductId === product.id && loading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping text-white"></i>{" "}
                      Add to cart
                    </>
                  )}
                </button>
                <span onClick={() => addWishlist(product.id)}>
                  <i
                    className={`fa-xl cursor-pointer ${
                      likedProducts[product.id]
                        ? "fa-solid text-red-600"
                        : "fa-regular text-red-600"
                    } fa-heart`}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
