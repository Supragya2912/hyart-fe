import React, { useState, useEffect } from 'react'
import { axiosClient } from '../utils/axiosClient'

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      const response = await axiosClient.post(`/api/user/get-orders`);
      setOrders(response.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-6 mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order?._id} className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{order?._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="grid gap-2">
                    {order.products.map(product => (
                      <div key={product?._id}>
                        <span className="font-medium text-gray-500">{product?.product_id?.name}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="grid gap-2">
                    {order.products.map(product => (
                      <div key={product?._id}>
                        <span>{product?.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order?.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-500">Rs {order?.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                    order.status === 'shipped' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                    order.status === 'delivered' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                    ''}`}>
                    {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paymentMethod === 'COD' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'}`}>
                    {order?.paymentMethod}
                  </span>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

export default MyOrders