import { BsFillPlayFill } from "react-icons/bs";
import BXHVietNam from "./BXHVietNam";
import BXHUSUK from "./BXHUSUK";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Song {
  id: number;
  img: string;
  name: string;
  singger: string;
  listens: number;
  national: number;
}

interface BXHProps {
  song: Song[];
}

function BangXepHang({ song }: BXHProps) {
  const [songVN, setSongVN] = useState<Song[] | null>(null);
  const [songQT, setSongQT] = useState<Song[] | null>(null);
  useEffect(() => {
    console.log("song", song);
    let VNSong: Song[] = song?.filter((song) => song.national === 1);
    setSongVN(VNSong);
    let QTSong: Song[] = song.filter((song) => song.national === 0);
    setSongQT(QTSong);
  }, [song]);

  return (
    <div className="text-white bg-[#261a39] mt-[30px]">
      <div className="bg-[#251938] px-5">
        <h1 className="font-bold text-[40px]">Bảng xếp hạng tuần</h1>
        <div className="w-full rounded-[20px] mt-[50px] bg-[#2f2441]">
          <div className="flex items-center mt-[30px]">
            <div className="font-bold text-[24px] ml-[30px] mt-[30px] cursor-pointer hover:text-[#794bc5]">
              Việt Nam
            </div>
            <div className="flex items-center justify-center w-[40px] h-[40px] mt-[30px] cursor-pointer ml-[20px] rounded-full hover:bg-[#794bc5]">
              <BsFillPlayFill size="24px" />
            </div>
          </div>
          <div className="flex flex-col">
            {songVN?.slice(0, 10).map((song, i) => (
              <Link to={`/song/${song.id}`}>
                <BXHVietNam song={song} key={i} />
              </Link>
            ))}
            <div className="flex justify-center items-center my-10">
              <button className="border-solid px-5 py-2.5 rounded-3xl border-white bg-[#4b4851] hover:bg-[#ad48dd]">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
        <div className="w-full rounded-[20px] mt-[50px] bg-[#2f2441]">
          <div className="flex items-center">
            <div className="font-bold text-[24px] ml-[30px] mt-[30px] cursor-pointer hover:text-[#794bc5]">
              Quốc tế
            </div>
            <div className="flex items-center justify-center w-[40px] h-[40px] mt-[30px] cursor-pointer ml-[20px] rounded-full hover:bg-[#794bc5]">
              <BsFillPlayFill size="24px" />
            </div>
          </div>
          <div className="flex flex-col">
            {songQT?.slice(0, 10).map((song, i) => (
              <Link to={`/song/${song.id}`}>
                <BXHUSUK song={song} key={i} />
              </Link>
            ))}
            <div className="flex justify-center items-center my-10">
              <button className="border-solid px-5 py-2.5 rounded-3xl border-white bg-[#4b4851] hover:bg-[#ad48dd]">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BangXepHang;
