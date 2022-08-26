import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";

interface IProps {
  onLike: () => void;
  onDislike: () => void;
  likes: any[];
}

const LikeButton = ({ onLike, onDislike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  let filterLikes = likes?.filter(
    (like: any) => like._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={` gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div
            className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] '
            onClick={onDislike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div
            className='bg-primary rounded-full p-2 md:p-4 text-gray-400'
            onClick={onLike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
