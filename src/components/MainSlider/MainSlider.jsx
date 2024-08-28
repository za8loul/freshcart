import style from "./MainSlider.module.css";
import mainSlider1 from "../../assets/finalProject assets/images/slider-image-3.jpeg";
import mainSlider2 from "../../assets/finalProject assets/images/grocery-banner.png";
import mainSlider3 from "../../assets/finalProject assets/images/grocery-banner-2.jpeg";
import slide1 from "../../assets/finalProject assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/finalProject assets/images/slider-image-2.jpeg";
import Slider from "react-slick";
export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    arrows:false ,
    autoplay:true ,
    autoplaySpeed: 2000,
  }


  return (
    <div className="row">
      <div className="w-3/4">
      <Slider {...settings}>
      <img src={mainSlider1} alt="" className='w-full  h-[400px]'/>
      <img src={mainSlider2} alt="" className='w-full h-[400px]'/>
      <img src={mainSlider3} alt="" className='w-full h-[400px]'/>
      </Slider>
      </div>
      <div className="w-1/4">
      <div><img src={slide1} alt="" className='h-[200px] w-full'/></div>
      <div><img src={slide2} alt="" className='h-[200px] w-full'/></div>
      </div>
    </div>
  )
}