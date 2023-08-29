import React from "react";

import { client } from "@/lib/sanityClient";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { ImageSec } from "@/components/product/ImageSec";
import { Detail } from "@/components/product/Detail";

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const getProductSlug = async () => {
  const res = await client.fetch(`*[_type == "product"]{slug}`);
  return res;
};

const getProductData = async (slug: any) => {
  const res = await client.fetch(
    `*[_type == "product" && slug.current == "${slug}"]`
  );
  return res;
};

export async function generateStaticParams() {
  let res = await getProductSlug();
  let productSlugs: string[] = [];
  res.map((item: any) => {
    productSlugs.push(item.slug.current);
  });
  return productSlugs.map((slug) => ({
    individual: slug,
  }));
}

export default async function page({
  params,
}: {
  params: { individual: string };
}) {
  let imageUrl: string[] = [];
  let productDetail: string[] = [];
  let coreDetail: string[] = [];

  const prod = await getProductData(params.individual);
  const data = prod[0];

  // this map is for genrating image URL array
  data.image.map((ur: SanityImageSource) => {
    imageUrl.push(urlFor(ur).width(700).url());
  });

  data.details.map((itemDetail: { children: { text: string }[] }) => {
    productDetail.push(itemDetail.children[0].text);
  });
  data.care.map((coreDet: { children: { text: string }[] }) => {
    coreDetail.push(coreDet.children[0].text);
  });

  return (
    <>
      <div>
        {/* page div start */}

        <div className="bg-gray-50 maxw-[1440px] flex flex-col md:flex-row md:space-x-3 px-5 md:px-20 py-6 md:py-16">
          {/* section i div start */}

          <ImageSec urls={imageUrl} />
          <Detail
            name={data.name}
            type={data.type}
            price={data.price}
            url={imageUrl[0]}
            slug={params.individual}
          />
          {/* section 1 div end  */}
        </div>

        <div className="justify-center relative">
          {/* section 2 div start */}
          <div className=" border-b border-b-gray">
            {/*div 2.1 start  */}
            <h1 className="text-xl md:text-2xl p-16 md:p-24 font-bold">
              Product Information
            </h1>
            {/* div 2.1 end */}
          </div>

          <div className="flex flex-col md:flex-row md:text-start md:space-x-28 py-8 md:py-6 px-12 md:px-24 md:items-start ">
            {/* div 2.2 start */}
            <h2 className="md:w-2/3 text-md md:text-lg font-semibold text-gray-400">
              PRODUCT DETAILS
            </h2>

            {productDetail.map((prodDetail: any, index: any) => (
              <p key={index} className="py-5 md:py-0 px-4 md:px-16">
                {prodDetail}
              </p>
            ))}

            {/* div 2.2 end */}
          </div>
          <div className="flex flex-col md:flex-row py-5 md:py-10 px-10 md:px-24 ">
            {/* div 2.3 start */}
            <h2 className="md:w-1/3 text-md md:text-lg font-semibold text-gray-400">
              PRODUCT CARE{" "}
            </h2>
            <ul className="md:font-semibold text-md md:text-lg py-4 md:py-0">
              {coreDetail.map((careDetail: any, index: any) => (
                <li key={index}>{careDetail}</li>
              ))}
            </ul>
            {/* div 2.3 end */}
          </div>
          <div className="absolute inset-0 -z-50 justify-left p-14">
            <div className="text-3xl font-bold text-gray-100 sm:text-9xl sm:font-extrabold">
              <p>Overview </p>
            </div>
          </div>
          {/* section 2 div end */}
        </div>
        {/* page div end */}
      </div>
    </>
  );
}
