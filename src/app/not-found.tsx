import React from 'react'
import Image from "next/image";
import Error from "../../public/404.jpg";

export default function ErrorPage() {
  return (
    <div className='w-full md:w-[80%] mx-auto p-5 my-5 md:p-0'>
<Image src={Error} alt="Error"  />
    </div>
  )
}
