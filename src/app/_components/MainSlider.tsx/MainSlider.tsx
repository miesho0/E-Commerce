"use client";
import banner1 from "../../../../public/grocery-banner-2.jpeg"
import banner2 from "../../../../public/grocery-banner.png"
import Image from 'next/image'
import swipper1 from "../../../../public/slider-image-1.jpeg"
import swipper2 from "../../../../public/slider-image-2.jpeg"
import swipper3 from "../../../../public/slider-image-3.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function MainSlider() {
  return (
    <div className='mb-10 flex mt-25'>
      <div className='w-2/3'>
          <Swiper
          spaceBetween={0}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[ Pagination]}
          loop = {true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
               <Image className='h-[400px] object-center' src={swipper1} alt='swipper1'></Image> 
          </SwiperSlide>
            <SwiperSlide>
               <Image className='h-[400px] object-center' src={swipper2} alt='swipper2'></Image> 
          </SwiperSlide>
            <SwiperSlide>
               <Image className='h-[400px] object-center' src={swipper3} alt='swipper3'></Image> 
          </SwiperSlide>

    </Swiper>
    </div>
      <div className='w-1/3'>
        <Image className='h-[200px] object-center' src={banner1} alt='banner1'></Image>
        <Image className='h-[200px] object-center' src={banner2} alt='banner2'></Image>
      </div>
    </div>
  )
}
