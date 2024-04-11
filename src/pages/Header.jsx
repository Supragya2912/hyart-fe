import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import Flex from "../components/Layouts/Flex";
import Logo from "../assets/movix-logo.svg";
import { useSelector } from "react-redux";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/slices/appConfigSlice';
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";

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
    title: "About",
    link: "/about",
  },
  {
    _id: 4,
    title: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const products = useSelector((state) => state.cartReducer.products);
  const [loading, setLoading] = useState(true);

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  console.log(myProfile);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function handleLogoutClicked() {
    try {
        await axiosClient.post('/api/auth/logout');
        removeItem(KEY_ACCESS_TOKEN);
        navigate('/login')
      }catch (e){
        console.log(e);
      }
  }

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <img className="w-32 object-cover" src={Logo} />
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                <>
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
                </>
              </motion.ul>
            )}
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-28 mb-6"
                      src={Logo}
                      alt="logoLight"
                    />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex gap-10 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
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
                    <div>
                      <button
                          type="button"
                          className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-100"
                          id="user-menu-button"
                          aria-expanded={isOpen}
                          onClick={toggleDropdown}
                      >
                          <img
                              className="w-8 h-8 rounded-full"
                              src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                              alt="user photo"
                          />
                      </button>
                      <div className={`${isOpen ? 'block' : 'hidden'}`}>
                        <div className="absolute z-50 my-4 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                            <div className="py-3 px-4">
                                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{myProfile?.name}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{myProfile?.email}</span>
                            </div>
                            <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                <li>
                                    <Link to="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My Orders</Link>
                                </li>
                                <li>
                                    <Link to="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account settings</Link>
                                </li>
                            </ul>
                            <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                <li>
                                    <Link to="#" className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
        </Flex>
      </nav>
    </div>
  );
};

export default Header;