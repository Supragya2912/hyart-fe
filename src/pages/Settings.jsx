import React, { useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useSelector } from "react-redux";
import UserPic from "../assets/user.png";
import Address from "./Address";
import { TEInput } from "tw-elements-react";
import { toast } from "react-toastify";

const Settings = () => {
  const [userImg, setUserImg] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleImgSubmit(e) {
    e.preventDefault();
    try {
      const data = await axiosClient.post("/api/auth/update-profile", {image: userImg});
      data ? window.location.reload() : console.log("Error");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(newPassword !== confirmPassword) return alert('New password and confirm password do not match!');
    try {
      const data = await axiosClient.post("/api/auth/update-password", {oldPassword, newPassword, confirmPassword});
      toast.success(data.result);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageChange(e){
    const file = e.target.files[0]; 
    if(file.size > 5 * 1024 * 1024) return alert('Image size is too large (max: 5MB)');
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        if(fileReader.readyState === fileReader.DONE){
            setUserImg(fileReader.result)
        }
    }
}

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex justify-center items-center">
          <div className="w-32 h-32 cursor-pointer rounded-full">
              <label htmlFor="inputImg" className="labelImg">
                  <img src={myProfile?.userAvatar?.url ? myProfile?.userAvatar?.url : UserPic} alt="profilepic" className="w-full h-full cursor-pointer rounded-full object-cover" />
              </label>
              <div className="mt-2">
                <input className='inputImg' id="inputImg" type="file" accept="image/*" onChange={handleImageChange}/>
              </div>
              <button 
                onClick={handleImgSubmit} 
                className="inline-block mt-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Update
              </button>
          </div>
        </div>
        <div className="flex justify-center items-start mt-28 gap-10">
          <div className="flex flex-col mt-4">
            <label className="text-lg font-bold">Full Name</label>
            <input type="text" className="input" value={myProfile?.name} disabled />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-bold">Email</label>
            <input type="text" className="input" value={myProfile?.email} disabled />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-bold">Phone</label>
            <input type="text" className="input" value={myProfile?.phoneNumber} disabled />
          </div>
        </div>

        <div className="py-8 lg:pt-16 px-4 mx-auto max-w-screen-md">
          <p className="mb-8 lg:mb-10 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Update Password (Your password must be atleast 6 characters)</p>
          <form onSubmit={handleSubmit} className="space-y-8">
          <TEInput
                  type="password"
                  label="Old Password"
                  size="lg"
                  id='old-password'
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                ></TEInput>
                <TEInput
                  type="password"
                  label="New Password"
                  size="lg"
                  id='new-password'
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Update Password
                </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-10">
        <Address />
      </div>
    </>
  )
}

export default Settings;