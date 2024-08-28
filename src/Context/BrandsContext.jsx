import axios from "axios";
import { createContext } from "react";

export const BrandsContext = createContext();

let headers = { token: localStorage.getItem('userToken') };

export default function BrandsContextProvider(props) {

    async function getBrands() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands', { headers });
            return response.data; 
        } catch (error) {
            console.error("Error fetching brands:", error);
            return null; 
        }
    }

    function clickOnBrands(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
            headers,
          }).then((data) => data
          ).catch((err) => err);
      }




    return (
        <BrandsContext.Provider value={{ getBrands , clickOnBrands}}>
            {props.children}
        </BrandsContext.Provider>
    );
}