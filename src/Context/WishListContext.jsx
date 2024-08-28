import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function AddToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <WishListContext.Provider
      value={{ AddToWishlist, getLoggedWishList, deleteFromWishList }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
