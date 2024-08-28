import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };  
  const [categories, setCategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {});
  }
    useEffect(() => {
      getCategories();
    }, []);
  return <>
  <div className='my-5'>
  <Slider {...settings}>
              {categories.map((category) => ( <div>
                <img
                  key={categories.length}
                  className='category-img w-full' src={category.image} alt={category.name} />
                <h3 className=' text-2xl font-semibold'>{category.name}</h3>
              </div>
              ))}
            </Slider>
  </div>
    
  
  </>
}
