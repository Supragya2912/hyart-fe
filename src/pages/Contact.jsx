import React, { useState } from 'react';
import { axiosClient } from "../utils/axiosClient";
import { TEInput } from 'tw-elements-react';
import { TETextarea } from "tw-elements-react";

function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axiosClient.post("/api/user/contact-us", {
        email,
        subject,
        message,
      });
      e.target.reset();
      alert("Message sent successfully");
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about our product? Need details about our Business? Let us know.</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                id='email'
                required
                onChange={(e) => setEmail(e.target.value)}
          ></TEInput>
              <TEInput
                type="text"
                label="Subject"
                className="mb-3"
                size="lg"
                id='subject'
                required
                onChange={(e) => setSubject(e.target.value)}
          ></TEInput>
          <TETextarea 
              id="message" 
              label="Leave a message..." 
              rows={6}
              onChange={(e) => setMessage(e.target.value)}
          ></TETextarea>
          <button
              type="submit"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
              Send message
          </button>
        </form>
        <div>
          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold">Operating Address</h2>
            <p className="text-lg">
              1/102 Shish Mahal, Venkateshwar Nagar, Cabin Road, Bhayandar East, Thane-401105
            </p>
            <h2 className="text-2xl font-semibold">Email ID</h2>
            <p className="text-lg">hyart267@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;