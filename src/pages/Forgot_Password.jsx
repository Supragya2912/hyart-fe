import React, { useState } from 'react';
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import { TEInput } from "tw-elements-react";
import { axiosClient } from '../utils/axiosClient';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const result = await axiosClient.post('/api/auth/forgot-password', { email });
      if (result?.status === "ok")
        alert("Reset link sent to your mail successfully");
      else
        alert("Failed to send reset code");
      e.target.reset();
    }catch(error){
      console.log(error);
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20 lg:mt-24 lg:py-0">
        <Link to="/">
            <div>
              <img className="object-cover w-32 mb-4" src={Logo} alt="logo" />
            </div>
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">Just type in your email and we will send you a link to reset your password!</p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <TEInput
                  type="email"
                  label="Email address"
                  size="lg"
                  id='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
              ></TEInput>
            <button
                type="submit"
                className="w-full inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Send reset link
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;