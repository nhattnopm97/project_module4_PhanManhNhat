function DoiTacAmNhac() {
  const icon: string[] = [
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/believe.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/jsj.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/route-note.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/danal.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/genie.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/stone-music.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/ingrooves.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/kakao.png",
    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png",
  ];
  return (
    <div className="text-white ml-4 mt-20">
      <div className="flex items-center justify-center">
        <span>ĐỐI TÁC ÂM NHẠC</span>
      </div>
      <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
        {icon.map((img, i) => (
          <div
            key={i}
            className="w-[100px] h-[50px] rounded-lg bg-white overflow-hidden flex justify-center items-center"
          >
            <img
              src={img}
              alt=""
              className=" object-cover max-w-[90%] max-h-[80%] w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoiTacAmNhac;
