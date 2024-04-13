import React, {useEffect, useState} from 'react'
import {axiosClient} from '../../utils/axiosClient'

const Customers = () => {
  const [getUsers, setGetUsers] = useState([]);

  const usersCount = getUsers.length;

  async function getAllUsers(){
    try{
        const response = await axiosClient.post('/api/admin/get-users');
        console.log(response.result);
        setGetUsers(response.result);
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  },[]);

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                    <h5>
                        <span className="text-gray-500">All Customers:</span>
                        <span className="dark:text-white">{usersCount}</span>
                    </h5>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16">
                                Name
                            </th>
                            <th scope="col" className="px-16">
                                Email
                            </th>
                            <th scope="col" className="px-20">
                                Address
                            </th>
                            <th scope="col" className="p-4">
                                Phone Number
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getUsers.map((user, index) => (
                            <tr key={index} className="border-b dark:border-gray-600 dark:hover:bg-gray-700">
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white" >
                                    <div className="flex items-center mr-3">
                                        {user?.name}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                        {user?.email}
                                    </p>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <p>
                                        {user?.location?.address ? `${user?.location?.address}, ${user?.location?.city}-${user?.location?.pincode}, ${user?.location?.state}, ${user?.location?.country}` : "No Address"}
                                    </p>
                                </td>
                                <td className="px-4 py-3">{user?.phoneNumber}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Customers;