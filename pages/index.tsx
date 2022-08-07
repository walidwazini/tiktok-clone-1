import type { NextPage } from "next";
import axios from "axios";

import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);
  return (
    <div className='flex flex-col gap-10 videos h-full text-red-700'>
      {videos.length ? (
        videos.map((video: Video) => (
          <div>
            <VideoCard post={video} key={video._id} />
          </div>
        ))
      ) : (
        <NoResult text={"No Videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  // console.log(data);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
