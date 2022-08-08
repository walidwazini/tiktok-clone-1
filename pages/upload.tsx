import React, { useEffect, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

const Upload = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<string>(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const uploadVideo = async (ev: any) => {
    ev.preventDefault();
    const selectedFile = ev.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      // access into sanity client
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post("http://localhost:3000/api/post", document);

      router.push("/");
    }
  };

  return (
    <div
      className={`flex w-full h-full absolute left-0 top-[60px]
       justify-center mb-10 pt-10 lg:pt-20 bg-inherit `}
    >
      <div
        className={`bg-indigo-500 rounded-lg xl:h-[80vh] flex gap-6 flex-wrap 
      w-[50%] items-center justify-between p-14 pt-6 `}
      >
        <div>
          <div>
            <p className='text-2xl text-white font-bold'>Upload a Video</p>
            <p className='text-gray-400 text-md mt-1'>Post video to your acc</p>
          </div>
          <div
            className={`border-dashed rounded-xl border-4 border-gray-700 flex flex-col
        justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 
        cursor-pointer hover:border-purple-900 hover:bg-indigo-600 `}
          >
            {isLoading ? (
              <p>Uploading..</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className={`rounded-xl h-[450px] mt-16 bg-black`}
                    ></video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div
                      className={`flex flex-col items-center justify-center h-full`}
                    >
                      <div
                        className={`flex flex-col items-center justify-center`}
                      >
                        <p className={`font-bold text-xl`}>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className={`text-xl font-semibold`}>
                          Upload your video
                        </p>
                      </div>
                      <p
                        className={`text-gray-300 text-center mt-10 leading-10 text-sm`}
                      >
                        MP4 or WebM or ogg <br /> 720x1280 <br /> Up to 10
                        minutes <br /> less than 2GB{" "}
                      </p>
                      <p
                        className={`bg-[#f51997] text-center rounded mt-10 text-white
                text-md font-medium p-2 w-52 outline-none`}
                      >
                        Select File
                      </p>
                    </div>
                    <input
                      type={"file"}
                      name='upload-video'
                      className={`w-0 h-0`}
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold w-[250px] mt-4 '>
                Selec a video file
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium'>Caption</label>
          <input
            type='text'
            value={caption}
            onChange={(ev) => setCaption(ev.target.value)}
            className={`rounded outline-none text-md border-gray-200 p-2`}
          />
          <label>Choose a category</label>
          <select
            className={`outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2  rounded cursor-pointer `}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {topics.map((topic, i) => (
              <option
                value={topic.name}
                key={i}
                className={`outline-none capitalize bg-white text-md 
              text-gray-700 p-2 hover:bg-slate-300`}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className={`flex gap-6 mt-10`}>
            <button
              onClick={() => {}}
              type='button'
              className={`border-slate-500 bg-slate-500 hover:bg-slate-700 border-2 text-white
              font-medium p-2 rounded w-28 lg:w-44 outline-none `}
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type='button'
              className={`border-purple-700 bg-purple-700 hover:bg-purple-900 border-2 text-white
              font-medium p-2 rounded w-28 lg:w-44 outline-none `}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
