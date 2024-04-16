import React, {useEffect, useState} from 'react'
import {axiosClient} from '../../utils/axiosClient'

const Coupons = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [getCoupon, setGetCoupon] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [deleteCouponId, setDeleteCouponId] = useState('');

  const couponCount = getCoupon.length;

  async function getAllCoupons(){
    try{
        const response = await axiosClient.post('/api/hyart/list-coupons');
        console.log(response.result);
        setGetCoupon(response.result);
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    getAllCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedCreationDate = new Date(creationDate);
      formattedCreationDate.setHours(0, 0, 0, 0);
      const formattedCreationDateString = formattedCreationDate.toISOString();
  
      const formattedExpiryDate = new Date(expiryDate);
      formattedExpiryDate.setHours(23, 59, 59, 999);
      const formattedExpiryDateString = formattedExpiryDate.toISOString();
  
      const addCategory = await axiosClient.post('/api/admin/create-coupon', {
        code: couponCode,
        discountType: 'percentage',
        discountAmount: discount,
        validFrom: formattedCreationDateString,
        validUntil: formattedExpiryDateString,
      });
      if (addCategory.status === "ok") {
        setShowAddModal(!showAddModal);
      }
      getAllCoupons();
    } catch (err) {
      console.log(err);
    }
  } 

  const handleDeleteCategory = async (coupon_id) => {
    try {
        const deleteCategory = await axiosClient.post('/api/admin/delete-coupon', {coupon_id});
        if(deleteCategory.status === "ok"){
            setShowDeleteModal(!showDeleteModal);
            getAllCoupons();
        }
    }
    catch(err){
        console.log(err);
    }
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                    <h5>
                        <span className="text-gray-500">All Coupons:</span>
                        <span className="dark:text-white">{couponCount}</span>
                    </h5>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                    type="button"
                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={toggleAddModal}
                >
                    <svg
                        className="h-3.5 w-3.5 mr-1.5 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                    </svg>
                    Add Coupon
                </button>
            </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                Coupon Code
                            </th>
                            <th scope="col" className="p-4">
                                Discount %
                            </th>
                            <th scope="col" className="p-4">
                                Valid From
                            </th>
                            <th scope="col" className="p-4">
                                Expiry Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCoupon.map((coupon, index) => (
                            <tr key={index} className="border-b dark:border-gray-600 dark:hover:bg-gray-700">
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <p>
                                        {coupon?.code}
                                    </p>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {coupon?.discountAmount}%
                                </td>
                                <td className="px-4 py-3">{new Date(coupon?.validFrom).toLocaleString()}</td>
                                <td className="px-4 py-3">{new Date(coupon?.validUntil).toLocaleString()}</td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            type="button"
                                            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onClick={() => { 
                                                setDeleteCouponId(coupon._id);
                                                toggleDeleteModal();
                                            }}                                        
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2 -ml-0.5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </section>

    {/* Add Product Modal */}
    {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                  Add Coupon
                </h4>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleAddModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Coupon Code
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Coupon Code"
                                required
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="discount"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Discount %
                            </label>
                            <input
                                type="text"
                                name="discount"
                                id="discount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Discount %"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="creationDate"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Valid From
                            </label>
                            <input
                                type="date"
                                name="creationDate"
                                id="creationDate"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                                onChange={(e) => setCreationDate(e.target.value)}
                            />
                         </div> 
                         <div>
                            <label
                                htmlFor="expiryDate"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Expiry Date
                            </label>
                            <input
                                type="date"
                                name="expiryDate"
                                id="expiryDate"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Add Coupon
                    </button>
                </form>
            </div>
          </div>
        </div>
    )}
   
    {/* Delete Modal */}
    {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={toggleDeleteModal}></div>
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              type="button"
              className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleDeleteModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this coupon?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={toggleDeleteModal}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => handleDeleteCategory(deleteCouponId)}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Coupons;