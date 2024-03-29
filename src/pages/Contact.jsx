import React, { useState } from 'react';
import { axiosClient } from "../utils/axiosClient";
import { TEInput } from 'tw-elements-react';

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
          <div className="sm:col-span-2">
            <textarea 
              id="message" 
              rows="6" 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
              placeholder="Leave a comment..."
              onChange={(e) => setMessage(e.target.value)}
            >
            </textarea>
          </div>
          <button
              type="submit"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
              Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;