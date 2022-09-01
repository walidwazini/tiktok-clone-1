import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const videos = showUserVideos ? "border-b-2 border-white" : "text-purple-500";
  const liked = !showUserVideos ? "border-b-2 border-white" : "text-purple-500";

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos);
    } else setVideoList(userLikedVideos);
  }, [showUserVideos, userVideos, userLikedVideos]);

  return (
    <div className={`w-full`}>
      <div className={`flex gap-6 md:gap-10 pl-4 pt-4 mb-2 w-full`}>
        <div className={`w-16 h-16 md:w-32 md:h-32`}>
          <Image
            src={user.image}
            height={120}
            width={120}
            className={`rounded-full`}
            alt={"user profile"}
            layout='responsive'
          />
        </div>
        <div className={`flex flex-col justify-center`}>
          <p
            className={`text-md md:text-2xl tracking-wider font-bold flex gap-1 
          text-white lowercase items-center justify-center `}
          >
            {user.userName.replaceAll(" ", "")}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitalize text-gray-400 text-sm'>{user.userName}</p>
        </div>
      </div>
      {/* ACC VIDEOS OR LIKED VIDEOS  */}
      <div>
        <div
          className={`flex gap-10 mb-10 mt-10 text-white border-b-2 border-purple-500 
        px-4`}
        >
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className={``}>
          {videoList?.length > 0 ? (
            <div className={`flex gap-6 flex-wrap md:justify-start`}>
              {videoList.map((post: Video, i: number) => (
                <VideoCard post={post} key={i} />
              ))}
            </div>
          ) : (
            <NoResult
              // isCommentType={false}
              isVideoType
              text={`No ${showUserVideos ? "uploaded" : "liked"} videos yet.`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
