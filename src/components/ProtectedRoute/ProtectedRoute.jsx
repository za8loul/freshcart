import React, { useEffect, useState } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute(props) {
    const [counter, setCounter] = useState(0);
    useEffect(() => {}, []);
    if (localStorage.getItem('userToken')!==null){
        return props.children
    }
    else {
      return <Navigate to={'/login'} />;
    }
}
