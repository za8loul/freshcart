import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
export default function useProducts() {

    function getRecentProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
      let responseObject =  useQuery({
        queryKey: ["recentProducts"],
        queryFn: getRecentProducts,
        // refetchInterval:3000,
        // refetchIntervalInBackground:true,
        // staleTime: 8000, 
        // retry:8,
        // retryDelay:1000
      });

  return responseObject
}
