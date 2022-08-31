import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";

import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const router = useRouter();
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      const data = res.data;
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (ev: any) => {
    ev.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      console.log(data.comments);
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      {/*    VIDEO DIVISION    */}
      <div
        className={`relative flex-2 w-[1000px] lg:w-9/12 flex justify-center 
        items-center bg-black`}
      >
        {/*  X BUTTON  */}
        <div className={`absolute top-6 left-2 lg:left-6 flex gap-6 z-50`}>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className={`text-white text-[35px]`} />
          </p>
        </div>
        <div className='relative'>
          <div className={`lg:h-[100vh] h-[60vh]`}>
            <video
              src={post.video.asset.url}
              className={`h-full cursor-pointer`}
              onClick={onVideoClick}
              loop
              ref={videoRef}
            ></video>
          </div>
          <div className={`absolute top-[45%] left-[45%] cursor-pointer`}>
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className={`text-white text-6xl lg:text-8xl`} />
              </button>
            )}
          </div>
        </div>
        <div
          className={`absolute bottom-5 lg:bottom-10 right-5 lg:right-10 
        cursor-pointer`}
        >
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className={`text-white text-2xl lg:text-4xl`} />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className={`text-white text-2xl lg:text-4xl`} />
            </button>
          )}
        </div>
      </div>
      {/*   CAPTIONS/USER/COMMENT DIVISION   */}
      <div
        className={`realtive w-[1000px] bg-indigo-600 md:w-[900px] lg:w-[700px]`}
      >
        <div className={`lg:mt-20 mt-10`}>
          <div
            className={`flex gap-3 p-2 cursor-pointer font-semibold rounded`}
          >
            <div className={`md:w-20 md:h-20 w-16 h-16 ml-4`}>
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
                <div className={`flex flex-col mt-3 gap-2 `}>
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
          {/* CAPTION  */}
          <p className={`text-lg text-white px-10`}>{post.caption}</p>
          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                onLike={() => handleLike(true)}
                onDislike={() => handleLike(false)}
              />
            )}
          </div>
          {/* COMMENTS  */}
          <Comments
            comment={comment}
            allComments={post.comments}
            setComment={setComment}
            addComment={addComment}
            isCommenting={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  // * We have a params of type of params where id is type of string
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
