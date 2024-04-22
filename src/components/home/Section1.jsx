import React from 'react';


function Section1() {
  return (
    <section className="container mx-auto px-4 py-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">Two years warranty</h3>
          <p className="mt-2 text-base text-gray-500">
            Our commitment to quality extends beyond the point of sale, ensuring your satisfaction for years to come.
          </p>
        </div>
        <div>
          <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">Free Shipping</h3>
          <p className="mt-2 text-base text-gray-500">
            Experience the convenience of complimentary shipping on every order, eliminating extra costs and simplifying
            your online shopping experience.
          </p>
        </div>
        <div>
          <ArrowLeftCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">Return Policy in 30 days</h3>
          <p className="mt-2 text-base text-gray-500">
            Not completely satisfied? No problem! Take advantage of our hassle-free 30-day return policy for a full
            refund or exchange.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section1;

export function ArrowLeftCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 12H8" />
      <path d="m12 8-4 4 4 4" />
    </svg>
  );
}

export function ShieldCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}