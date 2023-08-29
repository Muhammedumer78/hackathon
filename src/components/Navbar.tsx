"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../public/Logo.webp";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { getUserIdentifier, setUserIdentifier } from "@/lib/cookie";
import { BsCartPlus } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { GrFormClose } from "react-icons/gr";
import { DineMarketContext } from "@/DinemarketContex";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  const dmContext = useContext(DineMarketContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  async function getNumCartItems(userId: string) {
    fetch(`${baseUrl}api/numCartItems?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId}`,
      },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0].numItems) {
          dmContext?.setCartItems(response[0].numItems);
        } else {
          dmContext?.setCartItems(0);
        }
      })
      .catch(() => {
        dmContext?.setCartItems(0);
      })
      .finally(() => {
        setLoading(false);
        dmContext?.setNbFetchCompleted(true);
      });
  }
  useEffect(() => {
    const identifier = getUserIdentifier();
    if (!identifier) {
      const newIdentifier = uuidv4();
      setUserIdentifier(newIdentifier);
      setReFetch(!reFetch);
    } else {
      getNumCartItems(identifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);
  return (
    <div className=" relative flex p-4 lg:p-10 items-center justify-around ">
      <Link href="/" className="w-40 cursor-pointer">
        <Image src={logo} alt="logo" width={175} height={175}></Image>
      </Link>
      <div className="space-x-6 text-lg hidden lg:flex">
        <Link href="/" className="hover:text-red-500 hover:scale-105">
          Home
        </Link>
        <Link href="/female" className="hover:text-red-500 hover:scale-105">
          Female
        </Link>
        <Link href="/male" className="hover:text-red-500 hover:scale-105">
          Male
        </Link>
        <Link href="/kids" className="hover:text-red-500 hover:scale-105">
          Kids
        </Link>
        <Link href="/product" className="hover:text-red-500 hover:scale-105">
          All Products
        </Link>
      </div>
      <div className=" lg:flex items-center space-x-1 border-2 rounded-md py-1 px-1 hidden">
        <div className="">
          <CiSearch size={20} />
        </div>
        <div className="text-sm text-gray-900">
          <input type="text" placeholder="What you looking for" />
        </div>
      </div>
      <Link
        href="/cart"
        className="bg-gray-100 p-3 rounded-full font-bold inline-flex relative"
      >
        <BsCartPlus size={30} color="black" />
        <span className="absolute bg-red-500 rounded-full text-white text-xs px-[2px] ml-5  ">
          {dmContext?.cartItems}
        </span>
      </Link>
      <div className="lg:hidden ">
        {!isOpen ? (
          <div
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <RxHamburgerMenu size={20} />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <GrFormClose size={25} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-50 bg-white h-screen w-full flex flex-col space-y-2 top-20 text-center pt-10 ">
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/"
            className="hover:text-red-500 hover:scale-105"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/female"
            className="hover:text-red-500 hover:scale-105"
          >
            Female
          </Link>
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/male"
            className="hover:text-red-500 hover:scale-105"
          >
            Male
          </Link>
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/kids"
            className="hover:text-red-500 hover:scale-105"
          >
            Kids
          </Link>
          <Link
            onClick={() => {
              setIsOpen(false);
            }}
            href="/product"
            className="hover:text-red-500 hover:scale-105"
          >
            All Products
          </Link>
        </div>
      )}
    </div>
  );
}
