import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CircleLoader } from "react-spinners";
export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartItemCount,
    deleteProductItem,
    clearCartItems,
    setCart,
    cart,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartDetails(response.data.data);
    console.log(response.data.data);
    console.log(response.data.data._id);
  }
  async function updateCartCount(productId, count) {
    let response = await updateCartItemCount(productId, count);
    setCartDetails(response.data.data);
  }
  async function deleteItem(productId) {
    let response = await deleteProductItem(productId);
    setCartDetails(response.data.data);
    setCart(response.data);
  }
  async function clearCart() {
    let response = await clearCartItems();
    setCartDetails(response.data.data);
    setCart(0);
  }
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="  py-10 flex justify-center items-center ">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="relative w-3/4  overflow-x-auto mt-10 bg-gray-100  shadow-md sm:rounded-lg">
        <div className=" flex justify-between items-center p-5">
          <h2 className=" font-semibold text-3xl">Cart Shop</h2>
          <Link to={"/checkout"}>
            <button className="check-btn">Check out</button>
          </Link>
        </div>
        <div className=" flex justify-between items-center p-5">
          <h2 className=" font-semibold text-xl">
            Total price:{" "}
            <span className="text-green-500">
              {cartDetails?.totalCartPrice}
            </span>
          </h2>
          <h2 className=" font-semibold text-xl">
            Total number of items:{" "}
            <span className="text-green-500">
              {cartDetails?.products.length}
            </span>
          </h2>
        </div>

        <table className="w-full  text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50"></thead>
          <tbody>
            {cartDetails?.products?.length > 0 ? (
              cartDetails?.products.map((product) => (
                <tr
                  key={product?.product?.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-black bg-white border border-green-300 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-green-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-black bg-white border border-green-300 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-green-200  "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    <span>{product.price} EGP</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => deleteItem(product.product.id)}
                      className=" cursor-pointer font-medium text-red-600  hover:underline"
                    >
                      Remove
                    </span>
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
        <div className=" flex justify-center items-center">
          <button onClick={() => clearCart()} className="clear-btn">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
