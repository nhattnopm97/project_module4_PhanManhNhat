import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
interface Song {
  id: number;
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
}

interface BXHVietNamProps {
  song: Song;
}
function BXHUSUK({ song }: BXHVietNamProps) {
  return (
    <div>
      <div className="topSongOfZing flex w-[100%] items-center p-[10px] ">
        {/* <div className="w-[60px]">Số 1:</div>
        <div className="w-[18px]">-</div> */}
        <div className="w-[40px] h-[40px] overflow-hidden rounded-md cursor-pointer relative">
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
        <div className="xxx flex hidden">
          <AiFillHeart className="iconvotri  cursor-pointer" />
          <FiMoreHorizontal className="cursor-pointer" />
        </div>
        <div className="yyy mr-[20px]">{song.listens}</div>
      </div>
      <hr />
    </div>
  );
}

export default BXHUSUK;
