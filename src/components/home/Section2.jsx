import React from 'react';
import { Link } from 'react-router-dom';

const Section2 = () => {
  return (
    <section className="w-full py-6">
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
        <img
          alt="Story"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          height="200"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
          width="50"
        />
      </div>
    </section>
  );
}

export default Section2;