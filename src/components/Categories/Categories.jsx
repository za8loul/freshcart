import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CircleLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    let response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(response?.data?.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="row justify-center my-5 ">
        <div className="card-container mx-0 my-auto flex flex-wrap justify-between w-3/4 ">
          {categories?.length > 0 ? (
            categories?.map((category) => (
              <div
                key={category._id}
                className=" category-container rounded-lg flex flex-col items-center mb-10 me-3 lg:max-w-[30%] border box-border w-full"
              >
                <div className="card-img overflow-hidden w-full rounded-sm">
                  <img
                    className="category w-full"
                    src={category.image}
                    alt={category.name}
                  />
                </div>
                <div className="card-body text-center p-4 flex items-center justify-center">
                  <h2 className=" cursor-pointer text-green-700 text-2xl font-medium">
                    {category.name}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <div className=" w-full spinner-container flex justify-center items-center">
              <CircleLoader color="green" size={200} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

