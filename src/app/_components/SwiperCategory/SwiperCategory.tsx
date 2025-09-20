"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"


import Image from "next/image";
import { Category } from '@/types/product.type';

export default function SwiperCategory({ categories } : {categories :Category[]}) {
    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={5}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
               
                loop = {true}
              
            >
                {categories.map((category, idx:number) =>
                    <SwiperSlide key={idx}>
                        <Image src={category.image} alt={category.name} className='h-[200px] object-cover w-full' width={500} height={500} />
                        <p className='my-4 text-center'>{category.name}</p>
                    </SwiperSlide>
                )}


            </Swiper>
        </div>
    )
}
