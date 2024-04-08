import React, {useEffect, useState} from 'react'
import {axiosClient} from '../../utils/axiosClient'

const Customers = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [getProduct, setGetProduct] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState('');

  const customerCount = getProduct.length;

  async function getAllProduct(){
    try{
        const response = await axiosClient.post('/api/hyart/all-products');
        console.log(response.result.allProducts);
        setGetProduct(response.result.allProducts);
    }catch(error){
        console.log(error);
    }
  }

  const handleDeleteProduct = async (product_id) => {
    console.log('Product deleted', product_id);
    try {
        const deleteProduct = await axiosClient.post('/api/admin/delete-product', {product_id});
        if(deleteProduct.status === "ok"){
            setShowDeleteModal(!showDeleteModal);
            getAllProduct();
        }
    }
    catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    getAllProduct();
  },[]);

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                    <h5>
                        <span className="text-gray-500">All Customers:</span>
                        <span className="dark:text-white">{customerCount}</span>
                    </h5>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-24">
                                Product
                            </th>
                            <th scope="col" className="p-4">
                                Category
                            </th>
                            <th scope="col" className="px-20">
                                Description
                            </th>
                            <th scope="col" className="p-4">
                                Price
                            </th>
                            <th scope="col" className="p-4">
                                Quantity
                            </th>
                            <th scope="col" className="p-4">
                                Sales/Day
                            </th>
                            <th scope="col" className="p-4">
                                Sales/Month
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getProduct.map((product, index) => (
                            <tr key={index} className="border-b dark:border-gray-600 dark:hover:bg-gray-700">
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white" >
                                    <div className="flex items-center mr-3">
                                        <img
                                            src={product?.image?.url} 
                                            alt={product?.name} 
                                            className="h-8 w-auto mr-3"
                                        />
                                        {product?.name}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                        {product?.category_name}
                                    </p>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <p>
                                        {product?.description}
                                    </p>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Rs {product?.price}
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product?.quantity}
                                </td>
                                <td className="px-4 py-3">Rs 3200</td> 
                                <td className="px-4 py-3">Rs 3200</td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            type="button"
                                            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onClick={() => { 
                                                setDeleteProductId(product?._id);
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
              Are you sure you want to delete this product?
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
                onClick={() => handleDeleteProduct(deleteProductId)}
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

export default Customers;