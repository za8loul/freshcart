import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
export default function Layout() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {}, []);
  return <>
  <Navbar/>
  <div className=' container mx-auto my-6 py-6'>w
    <Outlet></Outlet>
  </div>
  
  </>
}
