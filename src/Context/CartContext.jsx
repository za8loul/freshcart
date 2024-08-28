import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
export const CartContext = createContext();
export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

let [cart, setCart] = useState(null);

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteProductItem(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function clearCartItems() {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function checkOut(cartId, url, formValues ) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formValues },
        {headers}
      )
      .then((response) => response)
      .catch((error) => error);
  }
 async function getCart() {
    let response =  await getLoggedUserCart();
    setCart(response.data);
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, checkOut, clearCartItems, deleteProductItem , getLoggedUserCart, addProductToCart , updateCartItemCount }}>
      {props.children}
    </CartContext.Provider>
  );
}
