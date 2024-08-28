import React, { useEffect, useState } from 'react'
import style from './Notfound.module.css'
export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {}, []);
  return (
    <>
    
      <div className=' text-center flex justify-center items-center flex-col error'>
        
        <h1 className=' text-green-600'>Error not found</h1>
        <h2 className=' text-green-800'>404</h2>
        
        </div>    
    
    </>
  )
}
