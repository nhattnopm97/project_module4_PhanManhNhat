import { BsFillPlayFill } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
// import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { changePlaylist, changeSong } from "../../redux/songChangeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
interface Song {
  id: number;
  img: string;
  link: string;
  name: string;
  release: string;
  singger: string;
  listens: number;
  national: number;
  favorite_id: number;
}
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

type ChangeSong = {
  error: boolean;
  listent: boolean;
  loading: boolean;
  playlist: Song[];
  song: Song;
};
type Auth = {
  user: dataUser;
  loading: boolean;
  error: boolean;
  changeSong: any;
};

type State = {
  auth: Auth;
  changeSong: ChangeSong;
};
function Song() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [song, setSong] = useState<Song | null>(null);
  const handleChangeSong = (songPr: Song) => {
    dispatch(changeSong(songPr));
    dispatch(changePlaylist({}));
  };
  const loadSong = async () => {
    try {
      let data = await axios.get(`http://localhost:3579/api/v1/song/${id}`);
      let result = data.data.song[0];
      setSong(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSong();
  }, [id]);
  return (
    <div className=" mt-[80px] pl-[20px] py-[10px] bg-[#170f23] min-h-screen text-white">
      <div className="flex">
        <div className="flex flex-col">
          <div className="w-[300px] h-[300px] rounded-xl overflow-hidden relative">
            <img className="w-full" src={song?.img} alt="" />
            <div className="hover:opacity-100 cursor-pointer w-full flex justify-center items-center text-white h-full absolute top-0 left-0 opacity-0">
              <BsFillPlayFill size="48px" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <h3>{song?.name}</h3>
          </div>
          <div className="text-[#88848e] flex justify-center items-center">
            {song?.singger}
          </div>
          <div
            onClick={() => song && handleChangeSong(song)}
            className="py-2 px-2 flex items-center justify-center rounded-lg overflow-hidden hover:bg-[#9b4de0] bg-[#2f2739]"
          >
            Phát bài hát
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" flex w-[600px] mx-[30px]">
            <div className="flex items-center h-[40px] w-[85%]">
              <div className="cursor-pointer">
                <TbArrowsSort />
              </div>
              <div className="ml-[10px]">BÀI HÁT</div>
            </div>
            <div className="flex items-center h-[60px]">LƯỢT NGHE</div>
          </div>
          <div className="flex aNewSong flex-col ml-[20px] px-2.5 rounded-xl  hover:bg-[#2f2739]">
            <div className=" flex w-[600px]">
              <div className="flex items-center h-[60px] w-[75%]">
                <div className="cursor-pointer">1</div>
                <div className="ml-[10px] relative">
                  <img
                    className="w-[40px] h-[40px] rounded-md"
                    src={song?.img}
                    alt=""
                  />
                  <div className="hover:opacity-100 cursor-pointer w-full flex justify-center items-center text-white h-full absolute top-0 left-0 opacity-0">
                    <BsFillPlayFill size="24px" />
                  </div>
                </div>
                <div className="flex flex-col ml-2.5">
                  <div className="">{song?.name}</div>
                  <div className="text-[#88848e]">{song?.singger}</div>
                </div>
              </div>
              <div className="flex justify-center items-center mr-5">
                {moment(song?.release).fromNow()}
              </div>
              {/* <div className="findMoreHorizon cursor-pointer flex justify-center items-center text-white opacity-0">
                <AiFillHeart size="20px" />
              </div> */}
              <div className="flex items-center h-[60px]">{song?.listens}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
