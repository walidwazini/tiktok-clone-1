import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  return (
    <div className={`flex flex-col border-b-2 border-indigo-900 pb-6`}>
      <div>
        <div className={`flex gap-3 p-2 cursor-pointer font-semibold rounded`}>
          <div className={`md:w-16 md:h-16 w-10 h-10`}>
            <Link href={"/"}>
              <>
                <Image
                  src={post.postedBy.image}
                  alt={`profilePhoto`}
                  width={62}
                  height={62}
                  layout='responsive'
                  className='rounded-full'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={"/"}>
              <div className={`flex items-center gap-2 `}>
                <p className='flex gap-2 items-center md:text-md font-bold text-white'>
                  {post.postedBy.userName}{" "}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p
                  className={`capitalize font-medium text-xs text-primary hidden md:block`}
                >
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className={`lg:ml-20 flex gap-4 relative`}>
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`rounded-3xl`}
          >
            <Link href={"/"}>
              <video
                loop
                className='lg:w-[600px] h-[300px] md:h-[400px] w-[200px] lg:h-[530px] 
                rounded-2xl cursor-pointer bg-gray-100'
                src={post.video.asset.url}
              />
            </Link>
            {isHover && (
              <div>
                {playing ? (
                  <button>
                    <BsFillPauseFill
                      className={`text-white text-2xl lg:text-4xl`}
                    />
                  </button>
                ) : (
                  <button>
                    <BsFillPlayFill
                      className={`text-white text-2xl lg:text-4xl`}
                    />
                  </button>
                )}
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff
                      className={`text-white text-2xl lg:text-4xl`}
                    />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp className={`text-white text-2xl lg:text-4xl`} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
