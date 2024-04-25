import React, { useCallback, useEffect, useState } from 'react'
import { axiosClient } from '../../utils/axiosClient'
import { HiMiniUsers } from "react-icons/hi2";
import { HiShoppingCart } from "react-icons/hi2";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";

const DashboardHome = () => {
  const [counts, setCounts] = useState({});
  const [earnings, setEarnings] = useState(null);
  const [filter, setFilter] = useState("day");

  async function getCounts() {
    try {
      const response = await axiosClient.post('/api/admin/get-count');
      setCounts(response.result);
    } catch (error) {
      console.log(error);
    }
  }

  const getEarnings = useCallback(async () => {
    try {
      const response = await axiosClient.post('/api/admin/earning', { filter: filter });
      setEarnings(response.result);
    } catch (error) {
      console.log(error);
    }
  }, [filter]);

  useEffect(() => {
    getCounts();
  }, []);

  useEffect(() => {
    getEarnings();
  }, [filter, getEarnings]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mt-20">

        <h1 className="text-2xl mb-10 font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-500 text-white rounded-full">
                <HiMiniUsers />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.totalOrders}</p>
              </div>
              <div className="p-3 bg-green-500 text-white rounded-full">
                <HiShoppingCart />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.totalProducts}</p>
              </div>
              <div className="p-3 bg-yellow-500 text-white rounded-full">
                <HiTemplate />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Categories</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.totalCategories}</p>
              </div>
              <div className="p-3 bg-green-500 text-white rounded-full">
                <BiSolidCategoryAlt />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Delivery</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.pendingOrders}</p>
              </div>
              <div className="p-3 bg-red-500 text-white rounded-full">
                <MdOutlineProductionQuantityLimits />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cancelled Orders</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.cancelledOrders}</p>
              </div>
              <div className="p-3 bg-red-500 text-white rounded-full">
                <TiCancel />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivered Orders</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.completedOrders}</p>
              </div>
              <div className="p-3 bg-green-500 text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Coupons</p>
                <p className="text-lg font-semibold dark:text-gray-200">{counts?.totalCoupons}</p>
              </div>
              <div className="p-3 bg-green-500 text-white rounded-full">
                <RiCouponLine />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-14 flex justify-between items-center'>
        <div>
          <div className='flex'>
            <div>
              <h1 className="text-2xl mb-5 font-semibold text-gray-800 dark:text-white">Earnings</h1>
            </div>
            <div>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 w-32 ml-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="day">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="lastmonth">Last Month</option>
                <option value="lastyear">Last Year</option>
              </select>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
                <p className="text-lg font-semibold dark:text-gray-200">Rs {earnings?.totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardHome;