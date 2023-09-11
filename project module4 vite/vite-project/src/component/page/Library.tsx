import { useState } from "react";
import LbrHistory from "../smallcomponent/LbrHistory";
import LbrPlaylist from "../smallcomponent/LbrPlaylist";
import Uploaded from "../smallcomponent/Uploaded";

function Library() {
  const [problem, setProblem] = useState(0);
  const [category, setCategory] = useState([
    {
      category: "PLAYLIST",
      clat: "bg-[#9b4de0] flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900",
    },
    {
      category: "Nghe gần đây",
      clat: "flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900",
    },
    {
      category: "Đã tải lên",
      clat: "flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900",
    },
  ]);
  const ChangeCategory = (index: number) => {
    if (index === 0) {
      setProblem(0);
    } else if (index === 1) {
      setProblem(1);
    } else {
      setProblem(2);
    }
    let a = [...category];
    a.forEach((ctg, i) => {
      if (i === index) {
        ctg.clat =
          "bg-[#9b4de0] flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900";
      } else {
        ctg.clat =
          "flex items-center px-2.5 py-1 rounded-3xl cursor-pointer hover:bg-violet-900";
      }
    });
    setCategory(a);
  };

  return (
    <div className="mt-[70px] bg-[#170f23] text-white">
      <div className="flex items-center p-4">
        <h1 className="text">Thư viện</h1>
        <div className="ml-4 cursor-pointer text-white">
          {/* <BsFillPlayCircleFill size="48px" /> */}
        </div>
      </div>
      <div className="font-bold p-3 flex items-center">
        {category.map((category, i) => (
          <div
            key={i}
            onClick={() => ChangeCategory(i)}
            className={category.clat}
          >
            {category.category}
          </div>
        ))}
      </div>
      {problem === 0 ? <LbrPlaylist /> : <></>}
      {problem === 1 ? <LbrHistory /> : <></>}
      {problem === 2 ? <Uploaded /> : <></>}
    </div>
  );
}

export default Library;
