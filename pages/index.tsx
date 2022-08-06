import type { NextPage } from "next";
import axios from "axios";

// interface iProps {
//   videos:
// }

const Home: NextPage = ({ videos }) => {
  console.log(videos);
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
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
