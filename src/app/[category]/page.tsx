import React from "react";
import { product } from "../../../sanity/product";
import { client } from "../../lib/sanityClient";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";

export async function generateStaticParams() {
  const catergories: string[] = ["male", "female", "kids"];
  return catergories.map((item) => ({ category: item }));
}

const getProductData = async (catId: string) => {
  const response = await client.fetch(
    `*[_type=='product' && category._ref == '${catId}' ]`
  );
  return response;
};

const getCategoryID = async (category: string) => {
  const cat = category.charAt(0).toUpperCase() + category.slice(1);
  const response = await client.fetch(
    `*[_type == "category" && name == '${cat}']`
  );
  return response[0]._id || "";
};

export default async function category({
  params,
}: {
  params: { category: string };
}) {
  const catId: string = await getCategoryID(params.category);
  const data = await getProductData(catId);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4  pt-10 md:py-20 px-16 md:px-14 justify-center">
        {data.map((item: any, index: any) => (
          <Link href={`/product/${item.slug.current}`} key={index}>
            <Image
              src={urlForImage(item.image[0]).url()}
              alt=""
              width={200}
              height={250}
            ></Image>
            <h1 className="text-lg md:py-3">{item.name}</h1>
            <h2 className="text-gray-400">{item.type}</h2>
            <h3 className="font-semibold md:pt-2"> $ {item.price}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
