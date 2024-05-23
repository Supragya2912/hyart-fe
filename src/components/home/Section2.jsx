import React from 'react';
import { Link } from 'react-router-dom';
import Img from "../../assets/section2.png";

const Section2 = () => {
  return (
    <section className="w-full py-12">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Crafted with Care, Inspired by You
          </h2>
          <p className="py-2 max-w-[600px] text-gray-500 mb-2 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            At HYART Jewellery, we believe that every piece should be a reflection of your unique style and
            personality. Our team of skilled artisans pour their passion into every design, ensuring that each item
            is crafted with the utmost care and attention to detail.
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            to="/shop"
          >
            Shop Now
          </Link>
        </div>
        <div className='flex justify-center items-center'>
          <img
            src={Img}
            className="h-72 max-w-full"
            alt="..." />
        </div>
      </div>
    </section>
  );
}

export default Section2;