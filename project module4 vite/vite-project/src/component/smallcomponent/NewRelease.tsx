import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { changePlaylist, changeSong } from "../../redux/songChangeSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { AppDispatch } from "../../redux/store";

interface Song {
  id: number;
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
  release: string;
}

function NewRelease() {
  const [song, setSong] = useState<Song[] | null>(null);
  const [songLoad, setSongLoad] = useState<Song[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();
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
  const loadSong = async () => {
    try {
      let data = await axios.get("http://localhost:3579/api/v1/song");
      setSong(data.data.song);
      setSongLoad(data.data.song);
      console.log(data.data.song[0].release);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSong();
  }, []);

  const handleChangeSong = (songPr: Object) => {
    dispatch(changeSong(songPr));
    dispatch(changePlaylist(songLoad));
  };

  const ChangeCategory = (index: any) => {
    if (index === 0) {
      setSongLoad(song);
    } else if (index === 1) {
      let a = song ? [...song] : [];
      let songFinded = a?.filter((item) => item.national === 1);
      setSongLoad(songFinded);
    } else {
      let a = song ? [...song] : [];
      let songFinded = a?.filter((item) => item.national === 0);
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
  // const timeAgo = moment(createdAt).fromNow();
  return (
    <div className="mt-20">
      <div className="w-full flex justify-between items-center text-white">
        <div className="font-bold font text-xl p-3">Mới Phát Hành</div>
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
        <Link to="/newrelease">
          <div className="p-3 cursor-pointer flex items-center">
            Tất cả <IoIosArrowForward size="24px" />
          </div>
        </Link>
      </div>
      <div className="flex">
        <div className="flex flex-col w-[50%]">
          {songLoad?.slice(0, 6).map((song, i) => (
            <div key={i} className="aNewSong flex flex-col w-full mr-4">
              <div className="flex p-4">
                <div
                  onClick={() => handleChangeSong(song)}
                  className="w-[60px] h-[60px] rounded-md overflow-hidden relative"
                >
                  <img src={song.img} alt="" className="w-full" />
                  <div className="maskANewSong cursor-pointer w-full flex justify-center items-center text-white h-full absolute top-0 left-0 opacity-0">
                    <BsFillPlayFill size="24px" />
                  </div>
                </div>
                <div className="flex flex-col pl-4 w-[70%]">
                  <div className="text-white font-bold">{song.name}</div>
                  <div className="text-white text-sm">{song.singger}</div>
                  <div className="text-white text-sm">
                    {moment(song.release).fromNow()}
                  </div>
                </div>
                <div className="findMoreHorizon cursor-pointer flex justify-center items-center text-white opacity-0">
                  <FiMoreHorizontal size="24px" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-[50%]">
          {songLoad?.slice(6, 12).map((song, i) => (
            <div key={i} className="aNewSong flex flex-col w-full mr-4">
              <div className="flex p-4">
                <div
                  onClick={() => handleChangeSong(song)}
                  className="w-[60px] h-[60px] rounded-md overflow-hidden relative"
                >
                  <img src={song.img} alt="" className="w-full" />
                  <div className="maskANewSong cursor-pointer w-full flex justify-center items-center text-white h-full absolute top-0 left-0 opacity-0">
                    <BsFillPlayFill size="24px" />
                  </div>
                </div>
                <div className="flex flex-col pl-4 w-[70%]">
                  <div className="text-white font-bold">{song.name}</div>
                  <div className="text-white text-sm">{song.singger}</div>
                  <div className="text-white text-sm">
                    {moment(song.release).fromNow()}
                  </div>
                </div>
                <div className="findMoreHorizon cursor-pointer flex justify-center items-center text-white opacity-0">
                  <FiMoreHorizontal size="24px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewRelease;
