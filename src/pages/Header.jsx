import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/slices/appConfigSlice';
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";
import UserPic from "../assets/user.png";

const navBarList = [
  {
    _id: 1,
    title: "Home",
    link: "/",
  },
  {
    _id: 2,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 3,
    title: "Contact",
    link: "/contact",
  }
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.cartReducer.products);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getMyProfile())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth >= 667);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleLogoutClicked() {
    try {
        await axiosClient.post('/api/auth/logout');
        removeItem(KEY_ACCESS_TOKEN);
        navigate('/login')
      }catch (e){
        console.log(e);
      }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="flex items-center justify-between h-full overflow-x-clip">
          <Link to="/">
            <div>
              <img className="w-16 object-cover hidden lg:block" src={Logo} alt="logo"/>
            </div>
          </Link>
          <div className="lg:hidden">
            <button onClick={() => setShowMenu(!showMenu)} className="block text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {showMenu && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center w-auto z-50 p-0 gap-2 lg:flex"
            >
              {navBarList.map(({ _id, title, link }) => (
                <NavLink
                  key={_id}
                  className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626]"
                  to={link}
                  state={{ data: location.pathname.split("/")[1] }}
                >
                  <li>{title}</li>
                </NavLink>
              ))}
            </motion.ul>
          )}
          <div className="flex mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
              {!loading ? (
                myProfile ? (
                  myProfile?.role === "admin" ? (
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      onClick={() => navigate('/admin/dashboard')}>
                      Dashboard
                    </button>
                  ) : (
                    <div className="pr-12" ref={dropdownRef}>
                      <button
                          type="button"
                          className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-100"
                          id="user-menu-button"
                          aria-expanded={isOpen}
                          onClick={toggleDropdown}
                      >
                        <div className="w-[40px] h-[40px] rounded-full">
                          <img
                              className="w-full h-full cursor-pointer rounded-full object-cover"
                              src={myProfile?.userAvatar?.url ? myProfile?.userAvatar?.url : UserPic}
                              alt="user"
                          />
                        </div>
                      </button>
                      <div className={`${isOpen ? 'block' : 'hidden'}`}>
                        <div className="absolute z-50 my-4 w-52 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                            <div className="py-3 px-4">
                                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{myProfile?.name}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{myProfile?.email}</span>
                            </div>
                            <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                <li>
                                    <Link to="/myorders" onClick={closeDropdown} className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My Orders</Link>
                                </li>
                                <li>
                                    <Link to="/settings" onClick={closeDropdown} className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account settings</Link>
                                </li>
                            </ul>
                            <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                <li>
                                    <Link to="/wishlist" onClick={closeDropdown} className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="mr-2 w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/></svg>
                                        My Wishlist
                                    </Link>
                                </li>
                            </ul>
                            <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                <li 
                                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={handleLogoutClicked}
                                >
                                  Sign Out
                                </li>
                            </ul>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                )
              ) : (
                null
              )}
              <Link to="/cart">
                <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center overflow-x-hidden group cursor-pointer relative">
                  <div className="flex justify-center items-center">
                  <RiShoppingCart2Line className="text-2xl" />
                  </div>
                  {products.length > 0 && (
                    <p className="absolute top-4 right-3 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {products.length}
                    </p>
                  )}
                </div>
              </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;