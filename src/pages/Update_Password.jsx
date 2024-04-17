import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from "../assets/movix-logo.svg"
import { TEInput } from "tw-elements-react";
import { axiosClient } from '../utils/axiosClient';

function Update_Password() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleSubmit(e){
    e.preventDefault();
    try{
        const result = await axiosClient.post('/api/auth/reset-password', {
        password,
        confirmPassword,
        resetPasswordToken : id
      });
      if (result?.status === "ok")
        alert("Password updated successfully");
      else
        alert("Failed to update password");
      e.target.reset();
      navigate('/login');
    }catch(error){
      console.log(error);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/">
            <div>
              <img className="object-cover w-48 mb-4" src={Logo} alt="logo" />
            </div>
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit} >
              <TEInput
                type="password"
                label="Password"
                size="lg"
                id='password'
                required
                onChange={(e) => setPassword(e.target.value)}
              ></TEInput>
              <TEInput
                type="password"
                label="Confirm Password"
                size="lg"
                id='confirm-password'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></TEInput>
            <button
                type="submit"
                className="w-full inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Update_Password;