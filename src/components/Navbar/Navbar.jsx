import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  let { cart } = useContext(CartContext);
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen); 
  }

  return (
    <div>
      <nav className="fixed left-0 right-0 py-3 top-0 z-20 bg-gray-100 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-cart-shopping fa-2xl text-green-600"></i>
            <span className="self-center text-3xl font-semibold whitespace-nowrap">
              fresh cart
            </span>
          </Link>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-2 md:p-0 mt-4 border rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {userLogin !== null ? (
                <>
                  <li>
                    <Link
                      to={"/"}
                      className="block py-2 px-3 active:text-black hover:text-black text-gray-600 font-normal"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/cart"}
                      className="block py-2 px-3 hover:text-black text-gray-600 font-normal"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/wishlist"}
                      className="block py-2 px-3 hover:text-black text-gray-600 font-normal"
                    >
                      Wish list
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/products"}
                      className="block py-2 px-3 hover:text-black text-gray-600 font-normal"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"categories"}
                      className="block py-2 px-3 hover:text-black text-gray-600 font-normal"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/brands"}
                      className="block py-2 px-3 hover:text-black text-gray-600 font-normal"
                    >
                      Brands
                    </Link>
                  </li>
                </>
              ) : null}
              {userLogin === null ? (
                <>
                  <li>
                    <Link
                      to={"/register"}
                      className="block py-2 px-3 hover:text-black text-gray-600 font-normal"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/login"}
                      className="block py-2 px-3 text-gray-600 font-normal"
                    >
                      Log in
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/cart"}
                      className="block py-2 px-3 relative hover:text-black text-gray-600 font-normal"
                    >
                      {" "}
                      <div className="relative w-10">
                        <i className="fa-solid  fa-cart-shopping fa-2xl"></i>
                        <span className="bg-green-600 text-white p-[3px]  text-sm bottom-2 right-1  absolute rounded-2xl">
                          {cart?.numOfCartItems}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li onClick={logout}>
                    <span className="cursor-pointer block py-2 px-3 text-gray-600 font-normal">
                      Log out
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
