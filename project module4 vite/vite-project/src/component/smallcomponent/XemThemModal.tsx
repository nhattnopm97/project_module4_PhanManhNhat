import { GiMicrophone } from "react-icons/gi";
import { BiBlock, BiLink } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./css/xemthemmodal.css";
import { useState } from "react";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";

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
  release: string;
  singger: string;
  listens: number;
  national: number;
  favorite_id: number;
}
type PropXemThemModal = {
  currentSong: Song | null;
  setXemThemModal: React.Dispatch<React.SetStateAction<boolean>>;
  isFavorited: () => Promise<void>;
};

function XemThemModal({
  setXemThemModal,
  currentSong,
  isFavorited,
}: PropXemThemModal) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<any>("success");
  const [message, setMessage] = useState("Thành công");
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
  const handleclosemodal = () => {
    console.log("close");
    setXemThemModal(false);
  };
  const handleStop = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleCoppy = () => {
    let coppy: HTMLInputElement | null = document.getElementById(
      "link"
    ) as HTMLInputElement;
    if (coppy) {
      coppy.select();
      navigator.clipboard.writeText(coppy.value);
      alert("Sao chép thành công!");
    }
  };
  const handleFavorite = async (id: number) => {
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
  return (
    <div id="myModal" className="modal z-30" onClick={handleclosemodal}>
      <div className="modal-content" onClick={handleStop}>
        <div className="w-[280px] bg-[#34224f] text-white rounded-[20px] flex flex-col px-5">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] rounded-[10px] overflow-hidden">
              <img
                className="w-full object-cover overflow-hidden"
                src={currentSong?.img}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center flex-col px-2">
              <div className="font-bold text-small">{currentSong?.name}</div>
              <div className="">{currentSong?.singger}</div>
            </div>
          </div>
          <div>
            {/* <div className="flex jutify-center items-center cursor-pointer py-1 px-2 rounded-xl overflow-hidden hover:bg-[#493961]">
              <BsDownload />
              <span className="text-center px-2">Tải xuống</span>
            </div> */}
            <div className="flex jutify-center items-center cursor-pointer py-1 px-2 rounded-xl overflow-hidden hover:bg-[#493961]">
              <GiMicrophone />
              <span className="text-center px-2">Lời bài hất</span>
            </div>
            <div className="flex jutify-center items-center cursor-pointer py-1 px-2 rounded-xl overflow-hidden hover:bg-[#493961]">
              <BiBlock />
              <span className="text-center px-2">Chặn</span>
            </div>
          </div>
          <div className="flex jutify-center items-center cursor-pointer py-1 px-2 rounded-xl overflow-hidden hover:bg-[#493961]">
            <AiOutlinePlusCircle />
            <span
              onClick={() => currentSong?.id && handleFavorite(currentSong.id)}
              className="text-center px-2"
            >
              Thêm vào playlist
            </span>
          </div>
          <input
            type="text"
            id="link"
            value={currentSong?.link}
            className="hidden"
          />
          <div className="flex jutify-center items-center cursor-pointer py-1 px-2 rounded-xl overflow-hidden hover:bg-[#493961]">
            <BiLink />
            <span className="text-center px-2" onClick={handleCoppy}>
              Sao chép link
            </span>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default XemThemModal;
