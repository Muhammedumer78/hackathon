"use client";
import Link from "next/link";
import { DineMarketContext } from "@/DinemarketContex";
import { getUserIdentifier } from "@/lib/cookie";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsCartPlus } from "react-icons/bs";
interface DetProps {
  name: string;
  price: number;
  type: string;
  url: string;
  slug: string;
}
export const Detail: React.FC<DetProps> = ({
  name,
  type,
  price,
  url,
  slug,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const userId = getUserIdentifier();
  const dmContext = useContext(DineMarketContext);
  console.log(dmContext);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [num, setnum] = useState(1);
  const [size, setsize] = useState(sizes[0]);
  const incF = () => {
    setnum(num + 1);
  };
  const decF = () => {
    if (num > 1) {
      setnum(num - 1);
    }
  };
  const [bDisabled, setBDisabled] = useState(false);
  async function addToCart() {
    const toastId = toast.loading("adding to cart");
    setBDisabled(true);
    fetch(`${baseUrl}api/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId}`,
      },
      body: JSON.stringify({
        productName: name,
        productType: type,
        productSlug: slug,
        productImageUrl: url,
        productSelectedSize: size,
        productQuantity: num,
        productPrice: price,
      }),
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);
        if (response[0].product_quantity) {
          dmContext?.incCartItems(num);
          toast.success("added to cart");
        } else {
          toast.error("cart failed");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("adding to cart failed");
      })
      .finally(() => {
        setBDisabled(false);
      });
  }
  return (
    <div className="md:w-2/5 w-auto justify-center pl-4 py-10">
      <h2 className="text-xl md:text-3xl font-bold">{name}</h2>
      <p className="text-gray-500 text-md md:text-lg font-semibold">{type}</p>
      <p className="py-4 md:py-7 text-md md:text-xl font-bold">SELECT SIZE</p>
      <div className="flex space-x-3 md:space-x-5 font-semibold py-3 md:py-5">
        {sizes.map((item, index) => (
          <p
            onClick={() => {
              setsize(item);
            }}
            key={index}
            className={` bg-gray-200 px-[6px] md:px-4 py-[6px] md:py-4 border rounded-full text-center min-w-[40px] ${
              item === size && "bg-gray-500"
            } cursor-pointer`}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="flex space-x-2">
        <p className="text-lg font-semibold py-7">Quantity: </p>
        <div className=" flex items-center">
          <button
            onClick={decF}
            className="text-lg border-2 bg-gray-100 border-black rounded-full px-2 md:px-4 cursor-pointer"
          >
            -
          </button>
          <h1 className="text-xl md:text-3xl">--{num}--</h1>
          <button
            onClick={incF}
            className="text-lg md:text-xl border-2 bg-gray-100 border-black rounded-full px-2 md:px-4 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={addToCart}
        disabled={bDisabled}
        className=" text-gray-100 font-semibold inline-flex space-x-3 items-center px-1 md:px-2 py-2 md:py-4 border rounded-lg bg-gray-900 w-fit"
      >
        {" "}
        <BsCartPlus size={18} color="white" />
        <span> Add to Cart </span>
      </button>{" "}
      <span className="font-bold text-lg md:text-2xl md:pl-6 pl-1">
        = $ {price}.00
      </span>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
