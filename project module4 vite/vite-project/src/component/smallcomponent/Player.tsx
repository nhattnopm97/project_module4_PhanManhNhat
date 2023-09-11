import ReactAudioPlayer from "react-audio-player";
import { AiFillHeart } from "react-icons/ai";
import { BsRepeat1, BsRepeat } from "react-icons/bs";
import { TbPlaylist } from "react-icons/tb";
import { BiSkipNext } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState, useEffect } from "react";
import XemThemModal from "./XemThemModal";
import axios from "axios";
import { useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Song {
  id: number;
  img: string;
  link: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
  favorite_id: number;
}
function Player() {
  type User = {
    name: string;
    avatar: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: number;
    release: string;
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
  const song = useSelector((state: State) => state.changeSong.song);
  const playlist = useSelector((state: State) => state.changeSong.playlist);
  const user = useSelector((state: State) => state.auth.user);

  const navigate = useNavigate();
  const [repeat, setRepeat] = useState(0);
  const [loop, setLoop] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [heart, setHeart] = useState(true);
  const [xemThemModal, setXemThemModal] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);

  const handleOnPlay = async (song: Song) => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;

    const newHistory = {
      song_id: song.id,
      user_id: userLocal.id,
      timelisten: getCurrentTime(),
    };
    await axios.post("http://localhost:3579/api/v1/history", newHistory);
  };

  const playNextSong = () => {
    if (repeat === 0) {
      return;
    } else if (repeat === 1) {
      setLoop(true);
    } else {
      const currentIndex = currentPlaylist.findIndex(
        (song: Song) => song.id === currentSong?.id
      );
      if (currentIndex !== currentPlaylist.length - 1) {
        const nextSong = currentPlaylist[currentIndex + 1];
        setCurrentSong(nextSong);
        setAutoPlay(true);
        console.log(
          "currentPlaylist[currentIndex + 1]",
          currentPlaylist[currentIndex + 1]
        );
      } else {
        setCurrentSong(currentPlaylist[0]);
        setAutoPlay(true);
      }
    }
  };

  const handlePlayNextSong = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = currentPlaylist.findIndex(
      (song: Song) => song.id === currentSong?.id
    );
    if (currentIndex !== currentPlaylist.length - 1) {
      const nextSong = currentPlaylist[currentIndex + 1];
      setCurrentSong(nextSong);
      setAutoPlay(true);
      console.log(
        "currentPlaylist[currentIndex + 1]",
        currentPlaylist[currentIndex + 1]
      );
    } else {
      setCurrentSong(currentPlaylist[0]);
      setAutoPlay(true);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const second = now.getSeconds().toString().padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDateTime;
  };

  useEffect(() => {
    setCurrentSong(song);
    console.log(song);
    setAutoPlay(true);
    setCurrentPlaylist(playlist);
  }, [song]);

  useEffect(() => {
    // setAuthUser(user);
    if (Object.keys(user).length === 0) {
      setCurrentPlaylist([]);
      setCurrentSong(null);
      setHeart(false);
    } else {
      let songLocalJson = localStorage.getItem("songLocal");
      let songLocal = songLocalJson ? JSON.parse(songLocalJson) : null;
      if (songLocal !== null) {
        setCurrentSong(songLocal);
      }
      let playlistLocalJson = localStorage.getItem("playlistLocal");
      let playlistLocal = playlistLocalJson
        ? JSON.parse(playlistLocalJson)
        : null;
      if (playlistLocal !== null) {
        setCurrentPlaylist(playlistLocal);
      }
    }
  }, [user]);

  useEffect(() => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    isFavorited();
    if (userLocal !== null) {
      let songLocalJson = localStorage.getItem("songLocal");
      let songLocal = songLocalJson ? JSON.parse(songLocalJson) : null;
      if (songLocal !== null) {
        setCurrentSong(songLocal);
      }
      let playlistLocalJson = localStorage.getItem("playlistLocal");
      let playlistLocal = playlistLocalJson
        ? JSON.parse(playlistLocalJson)
        : null;
      if (playlistLocal !== null) {
        setCurrentPlaylist(playlistLocal);
      }
    }
    let repeatLocal = localStorage.getItem("repeatLocal");
    if (repeatLocal !== null) {
      setRepeat(+repeatLocal);
      if (+repeatLocal === 1) setLoop(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repeatLocal", JSON.stringify(repeat));
    if (repeat === 1) {
      setLoop(true);
    } else {
      setLoop(false);
    }
  }, [repeat]);

  const isFavorited = async () => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    if (userLocal !== null) {
      try {
        let data = await axios.get(
          `http://localhost:3579/api/v1/favorite/${userLocal.id}`
        );
        setFavorite(data.data.song);
        let result = data.data.song;
        let a = result.find((song: Song) => song.id === currentSong?.id);
        if (a === undefined || a === null || a.length === 0) {
          setHeart(false);
        } else {
          setHeart(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    isFavorited();
  }, [currentSong]);

  const handleFavorite = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (id !== undefined) {
      let userLocalJson = localStorage.getItem("userLocal");
      let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
      if (userLocal !== null) {
        try {
          await axios.post(`http://localhost:3579/api/v1/favorite/`, {
            user_id: userLocal.id,
            song_id: id,
          });
          isFavorited();
          handleClick("success", "Bài hát đã được thêm vào thư viện");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const handleUnFavorite = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (id) {
      try {
        let findIdOfFavorite: any = favorite.find((f: Song) => f.id === id);
        if (
          findIdOfFavorite !== undefined &&
          "favorite_id" in findIdOfFavorite
        ) {
          await axios.delete(
            `http://localhost:3579/api/v1/favorite/${findIdOfFavorite.favorite_id}`
          );
          handleClick("error", "Đã xóa bài hát khỏi thư viện!");
          isFavorited();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<any>("success");
  const [message, setMessage] = useState<string>("Thành công");

  const handleClick = (a: string, b: string) => {
    setType(a);
    setMessage(b);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClickPlayer = (id: number) => {
    if (id !== undefined && currentSong !== null) {
      navigate("/song/" + id);
    }
  };
  const hahahaha = (e: React.MouseEvent) => {
    e.stopPropagation();
    setXemThemModal(true);
  };

  const hihihhihi = (e: React.MouseEvent, a: number) => {
    e.stopPropagation();
    setRepeat(a);
  };
  return (
    <>
      {xemThemModal ? (
        <XemThemModal
          currentSong={currentSong}
          setXemThemModal={setXemThemModal}
          isFavorited={isFavorited}
        />
      ) : (
        <></>
      )}
      <Stack className="" spacing={2} sx={{ width: "100%" }}>
        {/* <Button
          variant="outlined"
          onClick={() => handleClick("success", "oke ae")}
        >
          Open success snackbar
        </Button> */}
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
      </Stack>
      <div
        onClick={() => currentSong?.id && handleClickPlayer(currentSong.id)}
        className="flex justify-center items-center border-none outline-none bg-[#130c1c] text-white fixed bottom-0 w-full h-[90px] border z-20"
      >
        <div className="flex justify-evenly w-[30%]">
          <div className="w-[64px] h-[64px] rounded-[10px] overflow-hidden">
            <img
              className="w-full object-cover overflow-hidden"
              src={currentSong?.img}
              alt=""
            />
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="font-bold text-small">{currentSong?.name}</div>
            <div className="">{currentSong?.singger}</div>
          </div>
          <div className="flex justify-center items-center">
            {heart === false ? (
              <AiFillHeart
                style={{ cursor: "pointer", marginRight: "20px" }}
                onClick={(event: React.MouseEvent) =>
                  currentSong?.id && handleFavorite(event, currentSong.id)
                }
              />
            ) : (
              <AiFillHeart
                style={{
                  color: "#9b4de0",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
                onClick={(event: React.MouseEvent) =>
                  currentSong?.id && handleUnFavorite(event, currentSong.id)
                }
              />
            )}
            <FiMoreHorizontal
              title="Xem thêm"
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={(event: React.MouseEvent) => hahahaha(event)}
            />
          </div>
        </div>
        <div className="w-[40%] justify-center ">
          {currentSong === null ? (
            <></>
          ) : (
            <ReactAudioPlayer
              src={currentSong?.link}
              onPlay={() => handleOnPlay(currentSong)}
              autoPlay={autoPlay}
              controls
              style={{ width: "100%", marginLeft: "30px" }}
              onEnded={playNextSong}
              loop={loop}
            />
          )}
        </div>
        <div className="w-[30%] flex justify-evenly items-center">
          <BiSkipNext
            className="cursor-pointer text-3xl rounded-full overflow-hidden hover:bg-[#2f2441]"
            onClick={(event: React.MouseEvent) => handlePlayNextSong(event)}
          />
          {repeat === 0 ? (
            <BsRepeat
              title="Bật lặp lại"
              style={{ cursor: "pointer" }}
              onClick={(event: React.MouseEvent) => hihihhihi(event, 1)}
            />
          ) : (
            <>
              {repeat === 1 ? (
                <BsRepeat1
                  title="Đang lặp lại 1 bài"
                  style={{ color: "#6d5a78", cursor: "pointer" }}
                  onClick={(event: React.MouseEvent) => hihihhihi(event, 2)}
                />
              ) : (
                <BsRepeat
                  title="Đang lặp lại 1 danh sách phát"
                  style={{ color: "#6d5a78", cursor: "pointer" }}
                  onClick={(event: React.MouseEvent) => hihihhihi(event, 0)}
                />
              )}
            </>
          )}
          <TbPlaylist title="Playlist" style={{ cursor: "pointer" }} />
        </div>
      </div>
    </>
  );
}

export default Player;
