import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {}, []);
  return (
    <div className=' overflow-hidden'>
      <Helmet>
        <title>Home</title>
      </Helmet>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>
    </div>
  )
}
