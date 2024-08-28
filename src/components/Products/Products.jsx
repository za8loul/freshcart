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
  const [heart, setHeart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredProducts = data?.data?.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border w-3/4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full px-4 py-4 sm:w-1/2 lg:w-1/4">
           
            <div className="product">
              <Link to={`/productdetails/${product.id}`}>
                <img className="w-full" src={product.imageCover} alt={product.title} />
                <span className="block font-medium text-green-600">{product.category.name}</span>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {" "}
                    <i className="text-yellow-500 fa-solid fa-star"></i> {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-2">
               
                <button onClick={() => addProduct(product.id)} className="btn">
                  {currentProductId === product.id && loading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping text-white"></i> Add to cart
                    </>
                  )}
                </button>
               
                <span onClick={() => addWishlist(product.id)}>
                  {currentProductId === product.id && heart ? (
                    <i className="fa-solid fa-xl text-red-600 fa-heart"></i>
                  ) : (
                    <>
                      <i className="fa-regular fa-xl text-red-600 fa-heart"></i>{" "}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
