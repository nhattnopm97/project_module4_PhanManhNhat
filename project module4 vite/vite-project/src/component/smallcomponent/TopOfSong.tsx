import { BsFillPlayFill, BsHeadphones } from "react-icons/bs";
import { FiMoreHorizontal, FiMusic } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
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
type PropTopOfSong = {
  song: Song;
};

function TopOfSong({ song }: PropTopOfSong) {
  return (
    <div className="">
      <div className="topSongOfZing flex w-[100%] items-center h-[60px] py-[6px]">
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
  );
}

export default TopOfSong;
