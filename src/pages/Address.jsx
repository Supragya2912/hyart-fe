import React, { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import { TEInput } from 'tw-elements-react';
import { useSelector } from "react-redux";

const Address = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  useEffect(() => {
    if (myProfile) {
      setAddress(myProfile?.location?.address || "");
      setCity(myProfile?.location?.city || "");
      setState(myProfile?.location?.state || "");
      setPincode(myProfile?.location?.pincode || "");
      setCountry(myProfile?.location?.country || "");
    }
  }, [myProfile]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axiosClient.post("/api/auth/update-profile", {
        address,
        city,
        state,
        pincode,
        country,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <section className="bg-white dark:bg-gray-900">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <p className="mb-8 lg:mb-10 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Add your address to get your order delivered</p>
      <form onSubmit={handleSubmit} className="space-y-8">
        <TEInput
              type="text"
              label="Address"
              size="lg"
              className="mb-6"
              id='address'
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
        ></TEInput>
        <TEInput
              type="text"
              label="City"
              size="lg"
              className="mb-6"
              id='city'
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
        ></TEInput>
        <TEInput
              type="text"
              label="Pincode"
              size="lg"
              className="mb-6"
              id='pincode'
              required
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
        ></TEInput>
        <div className="mb-6">
          <select
            id="state"
            name="state"
            onChange={(e) => setState(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
            value={state}
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
        <div className="mb-6">
          <select
            id="country"
            name="country"
            value="India"
            onChange={(e) => setCountry(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
            disabled
          >
            <option value="India">India</option>
          </select>
        </div>
        <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
            Save Address
        </button>
      </form>
    </div>
  </section>
    
  )
}

export default Address;