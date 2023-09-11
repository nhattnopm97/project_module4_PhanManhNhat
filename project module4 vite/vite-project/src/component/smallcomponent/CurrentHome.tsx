import { IoIosArrowForward } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiPlayCircle } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSong, changePlaylist } from "../../redux/songChangeSlice";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

interface Song {
  id: number;
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
}

interface User {
  name: string;
  avatar: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: number;
  createDate: string;
  birthday: string;
}

interface DataUser {
  message: string;
  token: string;
  status: number;
  data: User;
}

interface Auth {
  user: DataUser;
  loading: boolean;
  error: boolean;
}

interface State {
  auth: Auth;
}

function CurrentHome() {
  const user = useSelector((state: State) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [history, setHistory] = useState<Song[]>([]);
  const [favorited, setFavorited] = useState<Song[]>([]);

  const loadHistory = async () => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    if (userLocal !== null) {
      try {
        let data = await axios.get(
          `http://localhost:3579/api/v1/history/${userLocal.id}`
        );
        setHistory(data.data.history);
        let dataFVR = await axios.get(
          `http://localhost:3579/api/v1/favorite/${userLocal.id}`
        );
        setFavorited(dataFVR.data.song);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(" chua co userLocal");
    }
  };

  const handleChangeSong = (song: Song) => {
    dispatch(changeSong(song));
    dispatch(changePlaylist(history));
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  const handleFavorite = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    console.log(id);
  };

  const handleUnFavorite = async (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    console.log(id);
    let result = favorited.find((f) => f.id === id);
    if (result !== undefined) {
      try {
        await axios.delete(
          `http://localhost:3579/api/v1/favorite/${result.id}`
        );
        let userLocalJson = localStorage.getItem("userLocal");
        let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
        if (userLocal !== null) {
          let dataFVR = await axios.get(
            `http://localhost:3579/api/v1/favorite/${userLocal.id}`
          );
          setFavorited(dataFVR.data.song);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center text-white">
        <div className="font-bold font text-xl p-3">Gần đây</div>
        <Link to="/history">
          <div className="p-3 cursor-pointer flex items-center">
            Tất cả <IoIosArrowForward size={24} />
          </div>
        </Link>
      </div>
      <div className="flex justify-around flex-wrap w-full">
        {history.slice(0, 6).map((history, i) => (
          <div
            key={i}
            className="px-5"
            onClick={() => handleChangeSong(history)}
          >
            <div className="playListCur relative cursor-pointer w-[128px] h-[128px] rounded-md overflow-hidden">
              <img src={history.img} alt="" className="w-full" />
              <div className="maskPlayList w-full flex justify-center items-center text-white h-full opacity-0 absolute top-0 left-0">
                {favorited?.find((song) => song.id === history.id) ===
                undefined ? (
                  <AiFillHeart
                    size={24}
                    onClick={(event: React.MouseEvent) =>
                      handleFavorite(event, history.id)
                    }
                  />
                ) : (
                  <AiFillHeart
                    onClick={(event: React.MouseEvent) =>
                      handleUnFavorite(event, history.id)
                    }
                    size={24}
                    className="text-[#9b4de0]"
                  />
                )}

                <BiPlayCircle size={48} />
                <FiMoreHorizontal size={24} />
              </div>
            </div>
            <div className="text-white w-[128px] overflow-x-hidden">
              {history.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentHome;
