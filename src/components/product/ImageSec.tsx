"use client";
import React, { useState } from "react";
import Image from "next/image";
interface ImageSecProps {
  urls: string[];
}
export const ImageSec: React.FC<ImageSecProps> = ({ urls }) => {
  const [selectIndex, setselectIndex] = useState(0);
  return (
    <div className="flex flex-row space-x-10 md:space-x-0 ">
      <div className="flex flex-col md:w-1/5 space-y-5 md:space-y-10">
        {urls.map((url: string, index: number) => (
          <Image
            key={index}
            src={url}
            alt=""
            width={100}
            height={100}
            onMouseOver={() => {
              setselectIndex(index);
            }}
          ></Image>
        ))}
      </div>
      <div className="md:w-4/5 mx-auto md:px-24 md:py-10">
        <Image src={urls[selectIndex]} alt="" width={400} height={400}></Image>
      </div>
    </div>
  );
};
