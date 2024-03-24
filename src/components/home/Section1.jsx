import React from 'react';
import { FaTruckFast } from "react-icons/fa6";

function FeatureCard({ icon, title, description }) {
  return (
    <div>
      <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

function Section1() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mb-20 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <FeatureCard
            icon={<FaTruckFast />}
            title="Two years warranty"
            description="Our commitment to quality extends beyond the point of sale, ensuring your satisfaction for years to come."
          />
          <FeatureCard
            icon={<FaTruckFast />}
            title="Free Shipping"
            description="Experience the convenience of complimentary shipping on every order, eliminating extra costs and simplifying your online shopping experience."
          />
          <FeatureCard
            icon={<FaTruckFast />}
            title="Return Policy in 30 days"
            description="Not completely satisfied? No problem! Take advantage of our hassle-free 30-day return policy for a full refund or exchange."
          />
        </div>
      </div>
    </section>
  );
}

export default Section1;