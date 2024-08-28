import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { AddToWishlist } = useContext(WishListContext);
  
  const [isLiked, setIsLiked] = useState(false); // State to track heart icon appearance
  const [productDetails, setProductDetails] = useState(null);
  let { id } = useParams();

  async function addWishlist(productId) {
    let response = await AddToWishlist(productId);
    if (response.data.status === "success") {
      setIsLiked(true); // Set the heart icon to filled when added to wishlist
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error(response.data.message, {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  // Define the slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="row w-full ">
          <div className="w-1/4">
            <Slider {...settings}>
              {productDetails?.images.map((src) => (
                <img
                  key={src}
                  className="w-full"
                  src={productDetails?.imageCover}
                  alt={productDetails?.title}
                />
              ))}
            </Slider>
          </div>

          <div className="w-3/4">
            <h3 className=" text-3xl font-semibold mb-4 text-gray-800">
              {productDetails?.title}
            </h3>
            <p>{productDetails?.description}</p>
            <div className="flex justify-between items-center">
              <span className="mt-5">{productDetails?.price} EGP</span>
              <span className="me-5">
                <i className=" text-yellow-500 fa-solid  fa-star"></i>
                {productDetails?.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center mt-5">
              <button className="btn me-5 hover:bg-green-500">
                Add to cart{" "}
                <i className="fa-solid fa-cart-shopping text-white"></i>
              </button>
              <i
                onClick={() => {
                  addWishlist(id);
                }}
                className={`fa-heart fa-xl ms-5 me-5 cursor-pointer ${
                  isLiked ? "fa-solid text-red-600" : "fa-regular text-red-600"
                }`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
