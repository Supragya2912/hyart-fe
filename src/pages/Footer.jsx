import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import creditCardImg from "../assets/creditcardicons.png";

const Footer = () => {
  return (
    <div>
        <footer className="bg-white py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h1 className='text-center'>HYART JEWELLERY</h1>
                <nav className="sm:columns-2 -mb-6 mt-8 flex flex-wrap sm:flex-nowrap gap-3 sm:gap-0 justify-center sm:space-x-8" aria-label="Footer">
                    <div className="pb-6">
                        <Link to="/about" className="cursor-pointer hover:underline text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline]">
                            About us
                        </Link>
                    </div>
                    <div className="pb-6">
                        <Link to="/contact" className="cursor-pointer hover:underline text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline]">
                            Contact us
                        </Link>
                    </div>
                    <div className="pb-6">
                        <Link to="/terms-conditions" className="cursor-pointer hover:underline text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline]">
                            Terms &amp; Conditions
                        </Link>
                    </div>
                    <div className="pb-6">
                        <Link to="/privacy-policy" className="cursor-pointer hover:underline text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:text-[#20B2AA hover:underline]">
                            Privacy Policy
                        </Link>
                    </div>
                </nav>
                <div className="flex justify-center mt-8">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/soni_jewelleryshop"
                        className="isomorphic-link isomorphic-link--external inline-flex items-center justify-center gap-1.5 bg-white text-sm font-medium transition-all duration-150 rounded-xl border border-gray-200 px-3 py-2"
                    >
                    <FaInstagram />
                    <span className="text-sm font-medium">Follow us on Instagram</span>
                    </a>
                </div>

                <div className="flex flex-col mt-[28px] justify-center items-center">
                    <div className="w-[200px] mb-4">
                        <img src={creditCardImg} className='w-full' alt="credit card img" />
                    </div>
                    <p className='text-[#555660]'>Copyright {new Date().getFullYear()} © HYART JEWELLERY</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer;