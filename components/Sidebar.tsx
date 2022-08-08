import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import GoogleLogin from "react-google-login";

import useAuthStore from "../store/authStore";
import Discover from "./Discover";
import SuggestedAcc from "./SuggestedAcc";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const { userProfile } = useAuthStore();

  const normalLink = `flex items-center gap-3 hover:bg-primary p-3 justify-center 
  xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded `;

  const toggleHandler = () => setShowSidebar((state) => !state);

  return (
    <div className='bg-indigo-700 h-full'>
      <div
        className='block xl:hidden mt-3 m-2 ml-4 text-xl'
        onClick={toggleHandler}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href={"/"}>
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>For You</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Log in to like and comment videos</p>
              <div>
                <GoogleLogin
                  clientId=''
                  render={(renderProps) => (
                    <button
                      className={`bg-white text-lg text-[#f51997] 
                      border-[1px] border-[#f51997] font-semibold px-6 py-3 rounded-md 
                      outline-none w-full mt-3 hover:bg-[#f51997]
                       hover:text-white cursor-pointer transition ease-in duration-150`}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Login
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy='single_host_origin'
                />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAcc />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
