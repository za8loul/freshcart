import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import style from "./Brands.module.css";
import { BrandsContext } from "../../Context/BrandsContext";
import { CircleLoader } from "react-spinners";
export default function Brands() {
  const { getBrands, clickOnBrands } = useContext(BrandsContext);
  const [brands, setBrands] = useState([]);
  const [clickBrands, setClickBrands] = useState(null);

  useEffect(() => {
    async function fetchBrands() {
      let data = await getBrands();
      if (data) {
        setBrands(data.data);
      }
    }

    fetchBrands();
  }, [getBrands]);

  async function getClickOnBrands(id) {
    let { data } = await clickOnBrands(id);
    console.log(data.data);
    setClickBrands(data.data);
  }

  function closeDetails() {
    setClickBrands(null);
  }

  return (
    
    <div className="brands-container p-5 max-w-[1200px] text-center mx-auto my-0 ">
      {clickBrands && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={closeDetails}
                type="button"
                className="text-gray-600 hover:text-gray-900 rounded-lg p-2 ml-auto"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 flex flex-row items-center">
              <div className="flex-1">
                <h2 className="text-2xl text-green-600 font-bold">
                  {clickBrands.name}
                </h2>
                <h3>{clickBrands.slug}</h3>
              </div>
              <img
                className="w-1/2 ml-4 rounded-lg shadow-lg"
                src={clickBrands.image}
                alt={clickBrands.name}
              />
            </div>

            <div className="flex items-center justify-end p-4 border-t">
              <button
                onClick={closeDetails}
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-white bg-gray-600 rounded-lg border border-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className="brands-title text-4xl mb-5 text-green-600">All Brands</h1>
      <div className="brands-grid">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div
              onClick={() => getClickOnBrands(brand._id)}
              key={brand._id}
              className="brand-card cursor-pointer p-5 text-center bg-white"
            >
              <img src={brand.image} alt={brand.name} className="brand-image" />
              <p className="brand-name text-black text-lg">{brand.name}</p>
            </div>
          ))
        ) :( <div className=" w-full spinner-container flex justify-center items-center">
          <CircleLoader color="green" size={200} />
        </div>)}
      </div>
    </div>
  );
}
