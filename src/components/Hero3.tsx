import React from "react";
import Image from "next/image";
import pic1 from "../../public/header1.webp";
import pic2 from "../../public/hero2_1.png";
import pic3 from "../../public/hero2_3.png";
export default function Hero3() {
  return (
    <>
      <div className=''>
        <p className='text-[#418af7] font-bold text-md text-center pt-10'>
          PRODUCTS
        </p>
        <h2 className='text-[#232323] text-center text-2xl md:text-4xl py-2 font-bold'>
          Check What We Have
        </h2>
        <div className='flex flex-col md:flex-row  items-center justify-center space-x-0 md:space-x-8 space-y-4 md:space-y-0'>
          <div className='hover:scale-110 ease-in duration-300'>
            <Image src={pic2} alt=''></Image>
            <p className='font-bold text-sm md:txt-lg px-4 md:px-0'>
              Brushed Raglan Sweatshirt
            </p>
            <p className='font-bold text-sm md:text-lg px-4 md:px-0 pb-4'>
              $195
            </p>
          </div>
          <div className='hover:scale-110 ease-in duration-300'>
            <Image
              src={pic1}
              alt=''
              width={360}
              className='bg-[#eae6e3] md:py-4'
            ></Image>
            <p className='font-bold text-sm md:txt-lg px-4 md:px-0 pb-2'>
              Cameryn Sash Tie Dress
            </p>
            <p className='font-bold text-sm md:text-lg px-4 md:px-0 pb-2'> $545</p>
          </div>
          <div className='hover:scale-110 ease-in duration-300'>
            <Image src={pic3} alt=''></Image>
            <p className='font-bold text-sm px-4 md:px-0 md:txt-lg'>Flex Sweatshirt</p>
            <p className='font-bold text-sm md:text-lg px-4 md:px-0'> $175</p>
          </div>
        </div>
      </div>
    </>
  );
}
