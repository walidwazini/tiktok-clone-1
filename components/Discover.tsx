import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const topicStyle = `xl:border-2 hover:bg-primary  bg-transparent md:bg-indigo-800
  xl:border-gray-300 py-2 rounded xl:rounded-full lg:px-3 px-4
  flex items-center gap-2 justify-center cursor-pointer transition 
  ease-in duration-100 text-white hover:text-black`;

  const activeTopicStyle = `xl:border-2 hover:bg-primary xl:border-[#F51997] lg:px-3
   py-2 rounded xl:rounded-full flex items-center 
  gap-2 justify-center cursor-pointer text-[#F51997]`;

  return (
    <div className=' pb-6'>
      <p className='text-white font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className='font-bold text-2xl xl:text-md '>
                {item.icon}
              </span>
              <span
                className={`font-medium text-md hidden xl:block capitalize`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
