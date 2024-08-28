import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import { UserContextProvider } from "./Context/userContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import WishList from "./components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";
import BrandsContextProvider from "./Context/BrandsContext";
import { Helmet } from "react-helmet";
let query = new QueryClient();

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path:'home',
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            {" "}
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "forgetpassword", element: <ForgetPassword /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "resetpassword", element: <ResetPassword /> },
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  

  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <BrandsContextProvider>
              <RouterProvider router={routes}></RouterProvider>
            </BrandsContextProvider>
            <Helmet>
        <title>Fresh Cart</title>
      </Helmet>
            <ReactQueryDevtools initialIsOpen="false" />
          </WishListContextProvider>

          <Toaster />
        </CartContextProvider>

        <ReactQueryDevtools />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
