import React from 'react';
import { Link } from 'react-router-dom';

const Footer2 = () => {
  return (
    <footer className="bg-white py-6 mt-12">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <div className="flex flex-wrap gap-x-10 gap-y-2 justify-center mb-4">
          <Link className="block text-sm font-medium text-gray-600 hover:text-gray-900" to="/">
            Home
          </Link>
          <Link className="block text-sm font-medium text-gray-600 hover:text-gray-900" to="/about">
            About us
          </Link>
          <Link className="block text-sm font-medium text-gray-600 hover:text-gray-900" to="/contact">
            Contact us
          </Link>
          <Link className="block text-sm font-medium text-gray-600 hover:text-gray-900" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="block text-sm font-medium text-gray-600 hover:text-gray-900" to="/terms-conditions">
            Terms and Conditions
          </Link>
          <Link className="block text-sm font-medium text-gray-600 hover:text-gray-900" to="/refund-policy">
            Refund Policy
          </Link>
        </div>
        <div className="text-sm text-gray-500">© 2024 HYART JEWELLERY. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer2;