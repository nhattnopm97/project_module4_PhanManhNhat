import { BsFillPlayFill, BsHeadphones } from "react-icons/bs";
import { FiMoreHorizontal, FiMusic } from "react-icons/fi";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changePlaylist, changeSong } from "../../redux/songChangeSlice";
import { AppDispatch } from "../../redux/store";

interface Song {
  id: number;
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
}

function LbrPlaylist() {
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
    // changeSong: any;
  };

  type State = {
    auth: Auth;
  };
  const user = useSelector((state: State) => state.auth.user);
  const [songLibrary, setSongLibrary] = useState<Song[] | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const loadSonglibrary = async () => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    if (userLocal !== null) {
      try {
        let data = await axios.get(
          `http://localhost:3579/api/v1/favorite/${userLocal.id}`
        );
        console.log(data.data);
        setSongLibrary(data.data.song);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(" chua co userLocal");
    }
  };
  const handleChangeSong = (song: Song) => {
    dispatch(changeSong(song));
    dispatch(changePlaylist(songLibrary));
  };
  useEffect(() => {
    loadSonglibrary();
  }, [user]);
  return (
    <div className=" min-h-screen">
      {songLibrary?.map((song, i) => (
        <div key={i}>
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
                <BsFillPlayFill size="18px" />
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
          <hr className="bg-red" style={{ border: "0.5px solid #2f2739" }} />
        </div>
      ))}
    </div>
  );
}

export default LbrPlaylist;
