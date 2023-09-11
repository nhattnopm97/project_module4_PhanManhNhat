import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import {
  BsFillPlayCircleFill,
  BsFillPlayFill,
  BsHeadphones,
} from "react-icons/bs";
import { FiMoreHorizontal, FiMusic } from "react-icons/fi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changePlaylist, changeSong } from "../../redux/songChangeSlice";
import { AppDispatch } from "../../redux/store";

interface Song {
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
}

function NewRelease() {
  const dispatch = useDispatch<AppDispatch>();
  const [songLoad, setSongLoad] = useState<Song[]>([]);
  const [song, setSong] = useState<Song[]>([]);
  const [category, setCategory] = useState([
    {
      category: "Tất cả",
      clat: "bg-[#9b4de0] flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900",
    },
    {
      category: "Việt Nam",
      clat: "flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900",
    },
    {
      category: "Quốc tế",
      clat: "flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900",
    },
  ]);

  const ChangeCategory = (index: number) => {
    if (index === 0) {
      setSongLoad(song);
    } else if (index === 1) {
      let a = [...song];
      let songFinded = a.filter((item) => item.national === 1);
      setSongLoad(songFinded);
    } else {
      let a = [...song];
      let songFinded = a.filter((item) => item.national === 0);
      setSongLoad(songFinded);
    }
    let a = [...category];
    a.forEach((ctg, i) => {
      if (i === index) {
        ctg.clat =
          "bg-[#9b4de0] flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900";
      } else {
        ctg.clat =
          "flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900";
      }
    });
    setCategory(a);
  };

  const loadSong = async () => {
    try {
      let { data } = await axios.get("http://localhost:3579/api/v1/song");
      setSong(data.song);
      setSongLoad(data.song);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSong();
  }, []);

  const handleChangeSong = (song: Song) => {
    dispatch(changeSong(song));
    dispatch(changePlaylist(songLoad));
  };

  return (
    <div>
      <div className="flex flex-col bg-[#170f23] text-white mt-[70px]">
        <div className="flex items-center p-4">
          <h1 className="text">Mới phát hành</h1>
          <div className="ml-4 cursor-pointer">
            <BsFillPlayCircleFill size={48} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-white">
          <div className="font-bold p-3 flex items-center">
            {category.map((category, i) => (
              <div
                key={i}
                onClick={() => ChangeCategory(i)}
                className={category.clat}
              >
                {category.category}
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-[100%]">
            {songLoad.map((song, i) => (
              <React.Fragment key={i}>
                <div
                  onClick={() => handleChangeSong(song)}
                  className="topSongOfZing flex w-[100%] items-center h-[60px] py-[6px]"
                >
                  <div className="w-5 h-5 flex justify-center items-center ml-2">
                    <FiMusic />
                  </div>
                  <div className="w-[40px] h-[40px] ml-4 overflow-hidden rounded-md cursor-pointer relative">
                    <img src={song.img} style={{ width: "40px" }} alt="" />
                    <div className="maskANewSongTopZing cursor-pointer w-full flex justify-center items-center text-white h-full absolute top-0 left-0 opacity-0">
                      <BsFillPlayFill size={18} />
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col w-[20%] flex-1">
                    <div className="font-bold">{song.name}</div>
                    <div className="cursor-pointer">{song.singger}</div>
                  </div>
                  {/* <div className="flex-1">Anh sai roi (singgle)</div> */}
                  <div className="xxx hidden mr-5">
                    <AiFillHeart className="iconvotri  cursor-pointer" />
                    <FiMoreHorizontal className="cursor-pointer" />
                  </div>
                  <div className="yyy w-[10%] flex items-center">
                    {song.listens.toLocaleString()} <BsHeadphones />
                  </div>
                </div>
                <hr
                  className="bg-red"
                  style={{ border: "0.5px solid #2f2739" }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRelease;
