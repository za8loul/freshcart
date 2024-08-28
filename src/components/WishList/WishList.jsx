import style from "./WishList.module.css";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { CircleLoader } from "react-spinners";
export default function WishList() {
  let { addProductToCart, setCart } = useContext(CartContext);
  let { deleteFromWishList, getLoggedWishList } = useContext(WishListContext);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState(0);
  async function getWishlistItems() {
    let response = await getLoggedWishList();
    setWishlistDetails(response.data.data);
    console.log(response.data.data);
  }
  async function deleteWishlistItem(productId) {
    let response = await deleteFromWishList(productId);
    setWishlistDetails(response.data.data);
    getWishlistItems();
    console.log(response);
  }
  async function addToCart(productId) {
    setCurrentProductId(productId);
    let response = await addProductToCart(productId);
    setLoading(true);
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

    // console.log(response);
  }
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getWishlistItems();
  }, []);
  return (
    <>
      <Helmet>
        <title>Wish list</title>
      </Helmet>
      <div className="row mx-20">
        <h2 className=" mb-5 font-semibold text-green-600 text-3xl">
          WishList <i className="fa-solid fa-heart text-red-600"></i>
        </h2>

        <table className="w-full  text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50"></thead>
          <tbody>
            {wishlistDetails?.length > 0 ? (
              wishlistDetails?.map((product) => (
                <tr
                  key={product?.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={product?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product?.title}
                    />
                  </td>
                  <td className="px-6 py-4 text-xl font-semibold text-gray-900">
                    {product?.title}
                    <h5 className=" text-lg text-green-600">
                      {product.price} EGP
                    </h5>
                    <span
                      onClick={() => deleteWishlistItem(product?.id)}
                      className=" text-sm cursor-pointer font-medium text-red-600  hover:underline"
                    >
                      Remove{" "}
                      <i className="fa-solid fa-heart-broken text-red-600"></i>
                    </span>
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 font-semibold text-gray-900 "></td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => addToCart(product?.id)}
                      className="btn text-lg font-semibold"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className=" w-full spinner-container flex justify-center items-center">
                <CircleLoader color="green" size={200} />
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
