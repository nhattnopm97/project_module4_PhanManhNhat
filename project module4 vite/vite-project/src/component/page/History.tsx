import { AiFillHeart } from "react-icons/ai";
import {
  BsFillPlayCircleFill,
  BsFillPlayFill,
  BsHeadphones,
} from "react-icons/bs";
import { FiMoreHorizontal, FiMusic } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlaylist, changeSong } from "../../redux/songChangeSlice";
import axios from "axios";
import { AppDispatch } from "../../redux/store";

interface Song {
  img: string;
  name: string;
  singger: string;
  listens: number;
}

function History() {
  type User = {
    name: string;
    avatar: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: number;
    createDate: string;
    birthday: string;
  };
  type dataUser = {
    message: string;
    token: string;
    status: number;
    data: User;
  };
  type Auth = {
    user: dataUser;
    loading: boolean;
    error: boolean;
  };

  type State = {
    auth: Auth;
  };
  const user = useSelector((state: State) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [history, setHistory] = useState<Song[]>([]);

  const loadHistory = async () => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    if (userLocal !== null) {
      try {
        let { data } = await axios.get(
          `http://localhost:3579/api/v1/history/${userLocal.id}`
        );
        // setCurrentSong(data.data.history[0]);
        setHistory(data.history);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("chua co userLocal");
    }
  };

  const handleChangeSong = (song: Song) => {
    dispatch(changeSong(song));
    dispatch(changePlaylist(history));
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  return (
    <div>
      <div className="flex flex-col bg-[#170f23] text-white mt-[70px]">
        <div className="flex items-center p-4">
          <h1 className="text">Nghe gần đây</h1>
          <div className="ml-4 cursor-pointer">
            <BsFillPlayCircleFill size={48} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-white">
          {/* <div className="font-bold p-3 flex items-center">
            {category.map((category, i) => (
              <div
                key={i}
                onClick={() => ChangeCategory(i)}
                className={category.clat}
              >
                {category.category}
              </div>
            ))}
          </div> */}
        </div>
        <div className="flex">
          <div className="flex flex-col w-[100%]">
            {history.map((song, i) => (
              <div key={i} className="flex flex-col w-[100%]">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
