import React, { useEffect } from "react";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAcc = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className={`text-gray-500 font-semidbold m-3 mt-4 hidden xl:block`}>
        Suggested Account
      </p>
      <div>
        {allUsers.slice(0, 2).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div
              className={`flex gap-3 transition duration-300 hover:bg-primary p-2 cursor-pointer rounded`}
            >
              <div className={`w-8 h-8`}>
                <Image
                  src={user.image}
                  height={34}
                  width={34}
                  className={`rounded-full`}
                  alt={"user profile"}
                  layout='responsive'
                />
              </div>
              <div className='hidden xl:block'>
                <p className='text-md font-bold text-white lowercase'>
                  {user.userName.replaceAll(" ", "")}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-sm'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAcc;
