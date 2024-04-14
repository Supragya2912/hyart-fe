import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [status, setStatus] = useState('');
    const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

    console.log(orders);

    const ordersCount = orders.length;

    async function getOrders() {
        try {
            const response = await axiosClient.post('/api/admin/get-orders');
            console.log(response.result);
            setOrders(response.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const response = await axiosClient.post('/api/admin/update-order-status', {
                order_id: orderId,
                status: newStatus
            });
            console.log(response);
            if (response.status === 'ok' && response.statusCode === 200) {
                console.log("Order status updated successfully");
                setStatus('');
                getOrders();
            } else {
                console.error("Failed to update order status");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCODPayment = async (orderId, status) => {

        try {
            const response = await axiosClient.post('/api/admin/delivered-cod', {
                order_id: orderId,
                status: status
            });
            console.log(response);
            if (response.status === 'ok' && response.statusCode === 200) {
                console.log("Order status updated successfully");
                setStatus('');
                getOrders();
            } else {
                console.error("Failed to update order status");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getOrderStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "text-yellow-500";
            case "confirmed":
                return "text-green-500";
            case "shipped":
                return "text-blue-500";
            case "delivered":
                return "text-green-800";
            case "cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="flex-1 flex items-center space-x-2">
                            <h5>
                                <span className="text-gray-500">Orders:</span>
                                <span className="dark:text-white">{ordersCount}</span>
                            </h5>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-20">
                                        Order ID
                                    </th>
                                    <th scope="col" className="px-16">
                                        Email
                                    </th>
                                    <th scope="col" className="px-10">
                                        Name
                                    </th>
                                    <th scope="col" className="px-8">
                                        Number
                                    </th>
                                    <th scope="col" className="p-4">
                                        Products
                                    </th>
                                    <th scope="col" className="p-4">
                                        Address
                                    </th>
                                    <th scope="col" className="p-4">
                                        Coupon Applied
                                    </th>
                                    <th scope="col" className="p-4">
                                        Coupon Discount Amount
                                    </th>
                                    <th scope="col" className="p-8">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="p-12">
                                        Date
                                    </th>
                                    <th scope="col" className="p-8">
                                        Payment method
                                    </th>
                                    <th scope="col" className="px-6">
                                        Status
                                    </th>
                                    <th scope="col" className="px-16">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="border-b dark:border-gray-600 dark:hover:bg-gray-700">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white" >
                                            <div className="flex items-center mr-3">
                                                {order?._id}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                {order?.user_id?.email}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            {order?.user_id?.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                {order?.user_id?.phoneNumber}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order?.products?.map((product, index) => (
                                                <div key={index}>
                                                    <div className="flex items-center mr-3">
                                                        - {product?.product_id?.name} x {product?.quantity}
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order?.user_id?.location?.address}, {order?.user_id?.location?.city}-{order?.user_id?.location?.pincode}, {order?.user_id?.location?.state}, {order?.user_id?.location?.country}
                                        </td>
                                        <td className="px-4 py-3">{order?.couponApplied ? "Applied" : "NA"}</td>
                                        <td className="px-4 py-3">{order?.couponDiscountAmount}</td>
                                        <td className="px-4 py-3">Rs. {order?.totalAmount}</td>
                                        <td className="px-4 py-3">{new Date(order?.createdAt).toLocaleString()}</td>
                                        <td className="px-4 py-3">{order?.payment?.paymentMethod}</td>
                                        <td className="px-4 py-3">
                                            {updateStatus && orderIdToUpdate === order._id ? (
                                                <select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <span className={`font-bold ${getOrderStatusColor(order.status.toLowerCase())}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">

                                            {updateStatus && orderIdToUpdate === order._id ? (
                                                <>
                                                    <div className='flex'>
                                                        <div>
                                                            <button
                                                                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                                                                onClick={() => {

                                                                    if (order.payment.paymentMethod === "cod" && status === 'delivered') {
                                                                        handleCODPayment(order._id, status);
                                                                        setUpdateStatus(false);
                                                                    } else {

                                                                    handleUpdateStatus(order._id, status);
                                                                    setUpdateStatus(false);
                                                                    }
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                                onClick={() => {
                                                                    setUpdateStatus(false);
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <button
                                                    className="bg-primary-500 text-white px-4 py-2 rounded-lg"
                                                    onClick={() => {
                                                        setUpdateStatus(true);
                                                        setStatus(order.status);
                                                        setOrderIdToUpdate(order._id);
                                                    }}
                                                >
                                                    Update Status
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;
