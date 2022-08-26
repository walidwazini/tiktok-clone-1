import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
  text: string;
  video: boolean;
  comment: boolean;
}

const NoResult = ({ text, video, comment }: IProps) => {
  return (
    <div className={`flex flex-col justify-center items-center h-full`}>
      <p className='text-6xl'>
        {video && <MdOutlineVideocamOff />}
        {comment && <BiCommentX />}
      </p>
      <p className='text-xl text-center'>{text}</p>
    </div>
  );
};

export default NoResult;
