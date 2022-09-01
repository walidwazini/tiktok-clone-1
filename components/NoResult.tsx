import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
  text: string;
  isVideoType?: boolean;
  isCommentType?: boolean;
}

const NoResult = ({
  text,
  isVideoType = false,
  isCommentType = false,
}: IProps) => {
  return (
    <div className={`flex flex-col justify-center items-center h-full`}>
      <p className='text-6xl'>
        {isVideoType && <MdOutlineVideocamOff />}
        {isCommentType && <BiCommentX />}
      </p>
      <p className='text-xl text-center'>{text}</p>
    </div>
  );
};

export default NoResult;
