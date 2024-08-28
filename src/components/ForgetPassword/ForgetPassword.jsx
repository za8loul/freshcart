import React, { useEffect, useState } from "react";
import style from "./ForgetPassword.module.css";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
export default function ForgetPassword() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let [errmsg, setErrmsg] = useState("");
  let [formStatus, setFormStatus] = useState(true);
  let validationSchema = yup.object({
    email: yup.string().required("Email required").email("enter a valid email"),
  });

  let validationSchema2 = yup.object({
    resetCode: yup
      .string()
      .required("reset code required")
      .matches(/^[0-9]{5,6}$/, "enter a valid code"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: ForgetPasswordApi,
    validationSchema,
  });
  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCode,
    validationSchema: validationSchema2,
  });
  async function ForgetPasswordApi(formValues) {
    setIsLoading(true);
    console.log(formValues);

    try {
      let request = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        formValues
      );

      if (request.data.statusMsg === "success") {
        setFormStatus(false);
        setIsLoading(false);
      }
      console.log(request);
    } catch (err) {
      setErrmsg(err.response.data.message);
    }
  }

  async function verifyResetCode(formValues) {
    let request = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        formValues
      )

      .catch((err) => {
        setErrmsg(err.response.data.message);
      });
    console.log(request);
    if (request.data.status == "Success") {
      navigate("/resetpassword");
    }
  }

  return (
    <div>
      {errmsg ? (
        <div className=" py-6 lg:px-32 px-6 w-full mx-auto">
          <div
            className="p-4 mb-4 w-1/2 text-lg rounded-lg bg-red-500 text-black "
            role="alert"
          >
            {errmsg}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="py-6 lg:px-32 px-6 w-full mx-auto">
        <h2 className="text-xl text-start font-bold mb-6 text-green-600">
          Enter Your Email
        </h2>

        {formStatus ? (
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

            <div className="flex items-center">
              <button
                type="submit"
                className="text-white absolute right-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  " Verify"
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={formik2.handleSubmit} className="  relative">
            <div className="relative z-0 w-full mb-8 group">
              <input
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                value={formik2.values.resetCode}
                type="text"
                name="resetCode"
                id="resetCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:text-gray-500 dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="resetCode"
                className="peer-focus:font-medium left-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter reset code:
              </label>
            </div>

            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-800"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            ) : null}

            <div className="flex items-center">
              <button
                type="submit"
                className="text-white absolute right-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  " Confirm code"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
