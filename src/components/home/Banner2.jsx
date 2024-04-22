import React from "react";
import { Link } from "react-router-dom";

const Banner2 = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-32 flex items-center justify-center">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Timeless Elegance, Crafted to Perfection
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Discover our exquisite collection of handcrafted jewelry, designed to elevate your style and captivate
            your senses.
          </p>
          <div className="flex justify-center">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              to="/shop"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner2;