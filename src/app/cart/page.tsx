"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { DineMarketContext } from "@/DinemarketContex";
import { getUserIdentifier } from "@/lib/cookie";
import { CartItem } from "@/lib/db/schema";
import toast from "react-hot-toast";
import getStripePromise from "@/lib/stripe";

export default function Page() {
  const [num, setnum] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const dmContext = useContext(DineMarketContext);
  const userId = getUserIdentifier() as string;

  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bDisabled, setBDisabled] = useState(false);
  const [qunat, setQuant] = useState(null);
  const [price, setPrice] = useState(null);

  async function getCartDetail(userId: string) {
    setCartItems([]);
    fetch(`${baseUrl}api/cartDetail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId}`,
      },
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length != 0) {
          setCartItems(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function onDeleteHandle(cartId: number, quantOriginal: number) {
    setBDisabled(true);
    const toastId = toast.loading("deleting order");
    fetch(`${baseUrl}api/cartDetail`, {
      method: "DELETE",
      headers: { Authorization: userId, cartId: cartId.toString() },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);

        if (response.response == "success") {
          dmContext?.decCartItems(quantOriginal);
          setReFetch(!reFetch);
          getCartSummary(userId);

          toast.success("order deleted");
        } else {
          toast.error("delete failed");
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("delete failed");
      })
      .finally(() => {
        getCartDetail(userId);
        setBDisabled(false);
      });
  }

  async function getCartSummary(userId: string) {
    fetch(`${baseUrl}api/cartSummary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId}`,
      },
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        setQuant(response[0].quant);
        setPrice(response[0].price);
        setLoading(false);
      });
  }

  async function checkoutHandle() {
    const toastId = toast.loading("trying checkout");
    setBDisabled(true);
    
    const stripe = await getStripePromise();
console.log(stripe);
    fetch(`${baseUrl}api/checkout`, {
      method: "POST",
      headers: { Authorization: userId, "Content-Type": "application/json" },
      cache: "no-cache",
    })
  
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);
        if (response.success === false || !stripe) {
          toast.error("checkout failed");
        } else {
          toast.loading("Redirecting...");
          stripe.redirectToCheckout({ sessionId: response.id });
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("checkout failed");
        setBDisabled(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getCartDetail(userId);
    getCartSummary(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="pb-10">
        <h2 className="text-3xl font-bold py-10 px-24 ">Shopping Cart</h2>
        <div className=" flex flex-col md:flex-row md:space-x-3 justify-around">
          <div className="flex flex-col space-y-3">
            {cartItems.map((data, index) => (
              <div
                key={index}
                className="bg-gray-100 flex flex-col md:flex-row space-x-10 items-center "
              >
                <div className="">
                  <Image
                    src={data.product_image_url}
                    alt=""
                    height={400}
                    width={300}
                  ></Image>
                </div>
                <div className="text-justify py-4">
                  <h2 className="text-lg md:text-xl font-semibold">
                    {data.product_name}
                  </h2>
                  <p className="text-gray-500 text-md font-semibold">
                    {data.product_type}
                  </p>
                  <p className="py-2 md:py-4 text-green-500 text-md md:text-xl font-semibold">
                    Delivery Estimation
                  </p>
                  <p className="py-2 md:py-4 text-md md:text-xl font-semibold">
                    5 Working Days
                  </p>
                  <p className="font-semibold text-lg md:text-xl pb-2">
                    $ {data.product_price}
                  </p>

                  <button
                    onClick={() => {
                      onDeleteHandle(data.cart_id, data.product_quantity);
                    }}
                    className="px-2 py-1 text-center bg-red-400 rounded-lg text-white"
                  >
                    Delete{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 ">
            <h2 className="font-bold text-xl px-4 py-6">Order Summary</h2>
            <p className="p-4">
              Quantity <span className=""> {qunat} Products</span>
            </p>
            <p className="pb-4 p-4">
              Sub Total<span className="pl-2 font-semibold">= $ {price}</span>
            </p>
            <button
              onClick={checkoutHandle}
              className="tracking-widest bg-[#474747] px-4 md:px-12 w-fit mx-auto py-2 border border-transparent rounded-lg font-bold items-center text-white"
            >
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
