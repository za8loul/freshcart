import React, { useEffect, useState } from "react";
import style from "./Checkout.module.css";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { checkOut, getLoggedUserCart } = useContext(CartContext);
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: () => handleCheckout(cartId, "http://localhost:5173"),
  });
  const [apiError, setAPIError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState(0);

  useEffect(() => {
    console.log(cartId);
  }, [cartId]);

  async function handleCheckout(cartId, url) {
    setIsLoading(true);
    let { data } = await checkOut(cartId, url, formik.values);
    if (data.status === "success") {
      window.location.href = data.session.url;
      setIsLoading(false);
    }
    console.log(data.session.url);
  }

  async function getCartId() {
    let response = await getLoggedUserCart();
    setCartId(response.data.cartId);
  }
  useEffect(() => {
    getCartId();
  }, []);

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getCartId();
  }, []);
  return (
    <div>
      <div className="py-6 lg:px-32 px-6 w-full mx-auto">
        <h2 className="text-3xl text-start font-bold my-6 text-green-600">
          Checkout
        </h2>

        <form className="  relative" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-8 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:text-gray-500 dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium left-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details:
            </label>
          </div>

          <div className="relative z-0 w-full mb-8 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:text-gray-500 dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium left-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              city:
            </label>
          </div>

          <div className="relative z-0 w-full mb-8 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:text-gray-500 dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium left-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number:
            </label>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="text-white absolute right-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                " Pay now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
