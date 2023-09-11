import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AvatarModalBox from "./AvatarModalBox";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import axios from "axios";

interface Song {
  id: number;
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
}

function Header() {
  type Data = {
    status: number;
    song: Song[];
  };

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

  const user: dataUser = useSelector((state: State) => {
    console.log(state);
    return state.auth.user;
  });
  let location = useLocation();
  const [song, setSong] = useState<Song[]>([]);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [avtClick, setAvtClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState<Song[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setSearchResult([]);
    }
  };

  useEffect(() => {
    let value = inputValue;
    let trueValue = value.trim().toLowerCase();
    let result = song.filter((song) =>
      song.name.toLowerCase().includes(trueValue)
    );
    setSearchResult(result);
  }, [inputValue, song]);

  useEffect(() => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    // console.log(user);
    if (userLocal !== null) {
      setAuthUser(userLocal);
    } else {
      if (user.status === 400) {
        return;
      } else if (user.status === 200) {
        // console.log(user);
        setAuthUser(user.data);
      } else {
        setAuthUser(null);
        console.log(user);
      }
    }
  }, [user]);

  const goBack = () => {
    navigate(-1);
  };

  const goAHead = () => {
    navigate(1);
  };

  const loadData = async (): Promise<void> => {
    try {
      let { data } = await axios.get<Data>("http://localhost:3579/api/v1/song");
      console.log("data", data);
      setSong(data.song);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClickSearch = (id: number): void => {
    navigate(`/song/${id}`);
    setInputValue("");
  };

  return (
    <div className="px-20 flex w-[82%] z-50 fixed top-0 h-20 bg-[#170f23] justify-center items-center">
      <div className="flex flex-1 h-10">
        <div className="flex items-center">
          <button
            onClick={goBack}
            className="w-11 text-white hover:text-[#9a9a9a]"
          >
            <BsArrowLeft size={24} />
          </button>
          <button
            onClick={goAHead}
            className="w-11 text-white hover:text-[#9a9a9a]"
          >
            <BsArrowRight size={24} />
          </button>
        </div>
        <div className="flex flex-col flex-1 h-10 w-full">
          <Tippy
            interactive
            visible={inputValue && searchResult.length > 0 ? true : false}
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <div className="w-[726px] text-white bg-[#2f2739] py-2 rounded-3xl overflow-hidden">
                  {searchResult.slice(0, 10).map((searchResult) => (
                    <div
                      onClick={() => handleClickSearch(searchResult.id)}
                      className="w-full flex pl-4 items-center h-[40px] hover:bg-[#5d4d71] cursor-pointer"
                      key={searchResult.id}
                    >
                      {searchResult.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          >
            <div className="px-5 relative flex justify-center h-[40px] items-center w-full rounded-2xl bg-[#2f2739]">
              <button>
                <BsSearch className="text-white mr-2" size={24} />
              </button>
              <input
                onChange={handleInputChange}
                value={inputValue}
                type="text"
                className="outline-none #2f2739 bg-[#2f2739] w-full text-white"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
                spellCheck={false}
              />
            </div>
          </Tippy>
        </div>
      </div>
      <div className="">
        {avtClick === true ? (
          <AvatarModalBox setAvtClick={setAvtClick} />
        ) : (
          <></>
        )}
        {authUser !== null ? (
          <div
            onClick={() => setAvtClick(!avtClick)}
            className="cursor-pointer  ml-6 flex justify-center items-center rounded-full overflow-hidden w-[38px] h-[38px]"
          >
            {authUser.avatar === null || authUser.avatar === "" ? (
              <div className="h-10 text-white font-bold flex items-center text-center rounded-full px-5 bg-[#9b4de0] hover:bg-[#5e1e84]">
                {authUser.name.split("")[0].toUpperCase()}
              </div>
            ) : (
              <img src={authUser.avatar} className="w-[38px]" alt="" />
            )}
          </div>
        ) : (
          <>
            {location.pathname !== "/login" ? (
              <Link to="/login">
                <button className="h-10 text-white content-center text-center rounded-2xl px-5 bg-[#9b4de0] hover:bg-[#5e1e84] ml-6">
                  Đăng nhập
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button className="h-10 text-white content-center text-center rounded-2xl px-5 bg-[#9b4de0] hover:bg-[#5e1e84] ml-6">
                    Đăng ký
                  </button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
