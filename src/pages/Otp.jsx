import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png"
import { axiosClient } from '../utils/axiosClient';
import { TEInput } from 'tw-elements-react';

function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    try{ // eslint-disable-next-line
      const response = await axiosClient.post('/api/auth/sendotp', {
        email,
      }); 
      e.target.reset();
      navigate('/signup');
    }catch(error){
      console.log(error);
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20 lg:mt-24 lg:py-0">
        <Link to="/">
            <div>
              <img className="object-cover w-32 mb-4" src={Logo} alt='logo' />
            </div>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                Send OTP
              </button>
              <div className="flex gap-1 text-sm font-light text-gray-500 dark:text-gray-400">
                <p>Already have an account? </p>
                <Link to="/login"><p className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</p></Link> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;