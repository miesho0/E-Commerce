import getAllCategories from '@/apis/allcategories'
import React from 'react'
import SwiperCategory from '../SwiperCategory/SwiperCategory'
import { Category } from '@/types/product.type';

export default async function CategorySlide() {
    const data : Category[] = await  getAllCategories();

  return (
    <div className='mb-3'>
     <SwiperCategory categories={data} />
    </div>
  )
}
