import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";

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
  const { userProfile } = useAuthStore();

  return (
    <div
      className={`border-t-2 border-gray-200 pt-4 px-10  border-b-2 
    lg:pb-0 pb-[100px] `}
    >
      <div className={`overflow-scroll lg:h-[475px] bg-gray-300`}>
        {allComments?.length ? (
          <div>
            <p>Commentrs</p>
          </div>
        ) : (
          <NoResult comment video={false} text='Be the first to comment.' />
        )}
      </div>
      {userProfile && (
        <div className={`absolute bottom-0 pb-6 px-2 md:px-10`}>
          <form className='flex gap-4' onSubmit={addComment}>
            <input
              onChange={(ev) => setComment(ev.target.value.trim())}
              placeholder='Add comment..'
              value={comment ? comment : ""}
              className={`bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] 
            md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none 
            focus:border-2 focus:border-gray-300 flex-1 rounded-lg`}
            />
            <button type='submit' className='text-md text-blue-600 rounded-md'>
              {isCommenting ? "Commenting" : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
