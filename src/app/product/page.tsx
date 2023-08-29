import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import { client } from "../../lib/sanityClient";
import Image from "next/image";

const getProductData = async () => {
  const response = await client.fetch(`*[_type=='product']`);
  return response;
};

export default async function Home() {
  const data = await getProductData();

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4 pt-10 md:py-20 px-16 md:px-14 justify-center'>
        {data?.map((item: any, index: any) => (
          <Link href={`/product/${item.slug.current}`} key={index}>
            <Image
              src={urlForImage(item.image[0]).url()}
              alt=''
              width={250}
              height={300}
            ></Image>
            <h1 className='text-lg md:py-3'>{item.name}</h1>
            <h2 className='text-gray-400'>{item.type}</h2>
            <h3 className='font-semibold md:pt-2'> $ {item.price}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}



