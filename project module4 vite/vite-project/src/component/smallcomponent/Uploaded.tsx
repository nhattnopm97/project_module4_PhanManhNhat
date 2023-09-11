import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  //   listAll,
  StorageReference,
} from "firebase/storage";
import axios from "axios";
import { FiMusic } from "react-icons/fi";
import { BsFillPlayFill, BsHeadphones } from "react-icons/bs";
// import { AiFillHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { changePlaylist, changeSong } from "../../redux/songChangeSlice";
import { useDispatch } from "react-redux";

//alert
import * as React from "react";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AppDispatch } from "../../redux/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface Song {
  id: string;
  img: string;
  name: string;
  singger: string;
  listens: number;
}
function Uploaded() {
  //alert
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("Thành công");

  const handleClick = (a: "success" | "error", b: string) => {
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

  const [song, setSong] = useState<Song[]>([]);

  const loadSong = async () => {
    try {
      let data = await axios.get("http://localhost:3579/api/v1/demosong");
      setSong(data.data.song);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSong();
  }, []);

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<File | null>(null);

  // const imagesListRef: StorageReference = ref(storage, "audio/");

  const uploadFile = async (): Promise<void> => {
    if (imageUpload == null) return;

    const imageRef: StorageReference = ref(
      storage,
      `audio/${imageUpload.name}`
    );

    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url: string) => {
        console.log(url);
        console.log(imageRef);
        let userLocalJson = localStorage.getItem("userLocal");
        let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
        axios
          .post(`http://localhost:3579/api/v1/demosong/`, {
            link: url,
            name: imageRef.name,
            singger: "Various Artists",
            user_id: userLocal.id,
          })
          .then((response) => {
            console.log(response);
            loadSong();
            setImageUrls(null);
            handleClick("success", "Upload bài hát thành công");
          })
          .catch((error) => console.log(error));
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrls(e.target.files[0]);
      setImageUpload(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls]);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeSong = (a: Song) => {
    dispatch(changeSong(a));
    dispatch(changePlaylist(song));
  };

  const handleDeleteSong = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:3579/api/v1/demosong/${id}`);
      loadSong();
      handleClick("error", "Xóa bài hát thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-[20px] bg-[] text-white min-h-screen">
      <label
        className="px-[20px] py-[10px] rounded-xl overflow-hidden cursor-pointer bg-[#9b4de0] hover:bg-[#3c0d66] "
        htmlFor="upload"
      >
        Chọn bài hát tải lên
      </label>
      <input
        className="hidden"
        id="upload"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e);
        }}
        type="file"
      />
      {imageUrls !== null ? (
        <>
          <br />
          <div className="mt-5">{imageUrls.name}</div>
          <div>Đã chọn file</div>
          <button
            onClick={uploadFile}
            className="bg-red-600 rounded-2xl overflow-hidden outline-none border-none ml-[30px] px-5 py-2.5"
          >
            Upload
          </button>
        </>
      ) : (
        <></>
      )}
      {song.length > 0 ? (
        <div className="mt-7">
          {song.map((song, i) => (
            <div key={i}>
              <div
                onClick={() => handleChangeSong(song)}
                className="topSongOfZing flex w-[100%] items-center h-[60px] py-[6px]"
              >
                <div className="w-5 h-5 flex justify-center items-center ml-2">
                  <FiMusic />
                </div>
                <div className="w-[40px] h-[40px] ml-4 overflow-hidden rounded-md cursor-pointer relative">
                  <img src={song?.img} style={{ width: "40px" }} alt="" />
                  <div className="maskANewSongTopZing cursor-pointer w-full flex justify-center items-center text-white h-full absolute top-0 left-0 opacity-0">
                    <BsFillPlayFill size="18px" />
                  </div>
                </div>
                <div className="ml-4 flex flex-col w-[20%] flex-1">
                  <div className="font-bold">{song.name}</div>
                  <div className="cursor-pointer">{song?.singger}</div>
                </div>
                <div
                  onClick={(event) => handleDeleteSong(event, song.id)}
                  className="xxx cursor-pointer hidden mr-[40px] rounded-full overflow-hidden bg-black flex justify-center items-center w-[40px] h-[40px]"
                >
                  <AiFillDelete className="" />
                </div>
                <div className="yyy w-[10%] flex items-center">
                  {song.listens?.toLocaleString()} <BsHeadphones />
                </div>
              </div>
              <hr
                className="bg-red"
                style={{ border: "0.5px solid #2f2739" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-[50px]">Chưa tải lên bài hát nào!</div>
      )}
      <Stack className="mt-[100px]" spacing={2} sx={{ width: "100%" }}>
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

export default Uploaded;
