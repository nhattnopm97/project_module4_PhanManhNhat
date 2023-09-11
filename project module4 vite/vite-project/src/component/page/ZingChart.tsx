import { useEffect, useState } from "react";
// import Chart from "chart.js/auto";
import { BsFillPlayCircleFill } from "react-icons/bs";
import TopOfSong from "../smallcomponent/TopOfSong";
import BangXepHang from "../smallcomponent/BangXepHang";
import axios from "axios";
import { Link } from "react-router-dom";
function ZingChart() {
  interface Song {
    id: number;
    img: string;
    name: string;
    singger: string;
    listens: number;
    national: number;
  }
  // useEffect(() => {
  //   const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  //   type LegendItem = {
  //     text: string;
  //     fillStyle: string;
  //     hidden: boolean;
  //     lineWidth: number;
  //     strokeStyle: string;
  //   };

  //   new Chart("myChart", {
  //     type: "line",
  //     data: {
  //       labels: xValues,
  //       datasets: [
  //         {
  //           label: "Red",
  //           data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
  //           borderColor: "red",
  //           fill: false,
  //         },
  //         {
  //           label: "Green",
  //           data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
  //           borderColor: "green",
  //           fill: false,
  //         },
  //         {
  //           label: "Blue",
  //           data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
  //           borderColor: "blue",
  //           fill: false,
  //         },
  //       ],
  //     },
  //     options: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: "World Wine Production 2018",
  //         },
  //         legend: {
  //           display: true,
  //           labels: {
  //             generateLabels: function (chart) {
  //               const data = chart.data;
  //               if (
  //                 data &&
  //                 data.labels &&
  //                 data.labels.length &&
  //                 data.datasets.length
  //               ) {
  //                 return data.datasets.map(function (dataset, i) {
  //                   const legendItem: LegendItem = {
  //                     text: dataset.label || "",
  //                     fillStyle: i === 0 ? "red" : i === 1 ? "green" : "blue",
  //                     hidden: !chart.isDatasetVisible(i),
  //                     // lineCap: dataset.borderCapStyle,
  //                     // lineDash: dataset.borderDash,
  //                     // lineDashOffset: dataset.borderDashOffset,
  //                     // lineJoin: dataset.borderJoinStyle,
  //                     lineWidth: 1,
  //                     strokeStyle: "black",
  //                     // pointStyle: dataset.pointStyle,
  //                   };
  //                   return legendItem;
  //                 });
  //               }
  //               return [];
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }, []);

  const [song, setSong] = useState<Song[]>([]);

  const loadSong = async () => {
    try {
      let data = await axios.get("http://localhost:3579/api/v1/song/desc");
      // console.log(data.data);
      // let result: Song[] = data.data.song.sort((a: Song, b: Song) =>
      //   a.name.trim().localeCompare(b.name.trim())
      // );
      // console.log(result);
      setSong(data.data.song);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSong();
  }, []);

  return (
    <div className="flex flex-col bg-[#170f23] text-white mt-[70px]">
      <div className="flex items-center p-4">
        <h1 className="text">#Zingchart</h1>
        <div className="ml-4 cursor-pointer">
          <BsFillPlayCircleFill size="48px" />
        </div>
      </div>
      {/* <canvas
        id="myChart"
        style={{
          width: "100%",
          // maxWidth: "600px",
          backgroundColor: "#170f23",
          color: "white",
          marginLeft: "24px",
        }}
      ></canvas> */}

      <div className="w-full flex flex-col px-5 mt-10">
        {song?.slice(0, 10).map((song, i) => (
          <Link to={`/song/${song.id}`}>
            <TopOfSong key={i} song={song} />
          </Link>
        ))}
        <div className="flex justify-center items-center w-full h-[40px] py-5">
          <div className="btnStyle mt-2">Xem top 100</div>
        </div>
      </div>
      <BangXepHang song={song} />
    </div>
  );
}

export default ZingChart;
