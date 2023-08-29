import Image from "next/image";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import fe1 from "../../public/Featured1.webp";
import fe2 from "../../public/Featured2.webp";
import fe3 from "../../public/Featured3.webp";
import fe4 from "../../public/Featured4.webp";
import hero1 from "../../public/header1.webp";
import Link from "next/link";

export default function Hero1() {
  return (
    <>
      <div className='lg:py-24 flex justify-center lg:space-x-20 lg:px-20'>
        <div className=' w-full px-5 lg:px-0 lg:w-1/3'>
          <button className='px-5 py-2 bg-blue-300 border rounded-md text-blue-800 font-semibold'>
            {" "}
            Sale 70%{" "}
          </button>
          <h1 className=' text-3xl lg:text-6xl font-bold py-8 text-center lg:text-left'>
            An Industrial Take on Streetwear
          </h1>
          <p className='text-gray-400   py-8'>
            Anyone can beat you but no one can beat your outfit as long as you
            wear Dine outfits.
          </p>
          <Link href="/product" className=' text-gray-100 font-semibold inline-flex space-x-3 items-center px-2 py-6 border bg-gray-900 w-fit rounded-lg'>
            {" "}
            <BsCartPlus size={18} color='white' />
            <span> Start Shopping </span>
          </Link>
          <div className='grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-4 justify-center py-8 '>
            <Image src={fe1} alt='' width={100} height={50}></Image>
            <Image src={fe2} alt='' width={100} height={50}></Image>
            <Image src={fe3} alt='' width={100} height={50}></Image>
            <Image src={fe4} alt='' width={100} height={50}></Image>
          </div>
        </div>
        <div className='hidden lg:block lg:w-2/3 '>
          <div className='bg-red-50 rounded-full  overflow-visible h-[550px] w-[550px] mx-auto'>
            <Image
              src={hero1}
              alt=''
              width={600}
              height={600}
              className='-mt-20 w-auto h-[575px] mx-auto'
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
