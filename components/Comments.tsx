import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";
import { IUser } from "../types";

interface IProps {
  isCommenting: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (ev: React.FormEvent) => void;
  allComments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  isCommenting,
  comment,
  setComment,
  addComment,
  allComments,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div
      className={`border-t-2 border-gray-200 pt-4 px-10  border-b-2 
    lg:pb-0 pb-[100px] lg:w-[600px] `}
    >
      <div
        className={`overflow-auto lg:h-[475px] lg:w-auto bg-[#2d2d70] mb-2 px-3 pt-4 rounded-md`}
      >
        {allComments?.length ? (
          allComments.map((comment, i) => (
            <>
              {/*  map all users to get comment from user */}
              {allUsers?.map(
                (user: IUser) =>
                  user._id ===
                    (comment.postedBy._id || comment.postedBy._ref) && (
                    <div
                      className='p-2 items-center border-[#5656a8] border-b-2 py-3'
                      key={i}
                    >
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer text-white gap-1 items-center text-[18px] font-bold leading-6'>
                            {user.userName}{" "}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className='-mt-5 ml-16 text-[16px] text-white mr-8'>
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResult isCommentType text='Be the first to comment.' />
        )}
      </div>
      {/* {userProfile && ( */}
      <div className={` bottom-0 px-3 py-3 lg:w-auto relative rounded-md`}>
        <form className='flex gap-4 mt-2' onSubmit={addComment}>
          <input
            onChange={(ev) => setComment(ev.target.value.trim())}
            placeholder='Add comment..'
            value={comment ? comment : ""}
            className={`bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] 
            md:w-[700px] lg:w-[330px] border-gray-100 focus:outline-none 
            focus:border-2 focus:border-gray-300 flex-1 rounded-lg`}
          />
          <button
            type='submit'
            className={`text-md text-white hover:text-indigo-700 rounded-md bg-[#f51997] px-4 py-auto 
              transition duration-300 hover:bg-[#e94fa6] font-semibold `}
          >
            {isCommenting ? "Commenting" : "Comment"}
          </button>
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default Comments;
