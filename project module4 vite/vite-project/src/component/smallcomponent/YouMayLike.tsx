import { AiFillHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiPlayCircle } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Playlist {
  id: number;
  banner: string;
  name: string;
}

function YouMayLike() {
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const loadPlaylist = async () => {
    try {
      let data = await axios.get("http://localhost:3579/api/v1/playlist");
      setPlaylist(data.data.playlist);
      //   setSongLoad(data.data.song);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPlaylist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(id);
  };

  useEffect(() => {
    loadPlaylist();
  }, []);
  return (
    <div className="text-white mt-20 p-4">
      <div className="">
        <span className="font-bold text-xl">Có Thể Bạn Muốn Nghe</span>
      </div>
      <div className="flex mt-10 flex-wrap">
        {playlist?.map((playlist, i) => (
          <Link key={i} to={`/playlist/${playlist.id}`}>
            <div className="px-3">
              <div className="playListCur relative cursor-pointer w-[210px] h-[210px] rounded-md overflow-hidden">
                <img src={playlist.banner} alt="" className="w-full" />
                <div className="maskPlayList w-full flex justify-center items-center text-white h-full opacity-0 absolute top-0 left-0">
                  <AiFillHeart
                    onClick={(event: React.MouseEvent) =>
                      handleAddPlaylist(event, playlist.id)
                    }
                    size="24px"
                    title="Thêm vào playlist bản thân"
                  />
                  <BiPlayCircle
                    onClick={(event: React.MouseEvent) =>
                      handleAddPlaylist(event, playlist.id)
                    }
                    size="48px"
                  />
                  <FiMoreHorizontal
                    onClick={(event: React.MouseEvent) =>
                      handleAddPlaylist(event, playlist.id)
                    }
                    size="24px"
                  />
                </div>
              </div>
              <div className="text-white">{playlist.name}</div>
            </div>
          </Link>
        ))}
        {/* <div className="px-5">
          <div className="playListCur relative cursor-pointer w-[210px] h-[210px] rounded-md overflow-hidden">
            <img
              src="https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2023_06_28/0001260727_001_20230628190601287.jpg"
              alt=""
              className="w-full"
            />
            <div className="maskPlayList w-full flex justify-center items-center text-white h-full opacity-0 absolute top-0 left-0">
              <AiFillHeart size="24px" />
              <BiPlayCircle size="48px" />
              <FiMoreHorizontal size="24px" />
            </div>
          </div>
          <div className="text-white">Chủ đề</div>
        </div> */}
      </div>
    </div>
  );
}

export default YouMayLike;
