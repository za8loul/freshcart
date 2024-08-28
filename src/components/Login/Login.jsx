import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
export default function Login() {
  let { setUserLogin } = useContext(UserContext);
  const [apiError, setAPIError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((apiResponse) => {
        setIsLoading(false);
        setUserLogin(apiResponse.data.token);
        localStorage.setItem("userToken", apiResponse.data.token);
        console.log(apiResponse.data.token);
        navigate("/");
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setAPIError(apiResponse?.response?.data?.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <div>
      <div className="py-6 lg:px-32 px-6 w-full mx-auto">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-800"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}

        <h2 className="text-3xl text-start font-bold mb-6 text-green-600">
          Sign in
        </h2>

        <form className="  relative" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-8 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:text-gray-500 dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium left-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address:
            </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-800"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-8 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:text-gray-500 dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium left-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password:
            </label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-800"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}

          <div className="flex items-center">
            <button
              type="submit"
              className="text-white absolute right-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <p className=" pl-5 text-green-700">
              Don't have an Account?{" "}
              <span className=" font-semibold text-green-500">
                {" "}
                <Link to={"/register"}> Register now</Link>{" "}
              </span>
            </p>
          </div>

          <span className=" ps-5 py-5 font-semibold text-green-500">
            {" "}
            <Link to={"/forgetpassword"}> Forgot Password?</Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
}
