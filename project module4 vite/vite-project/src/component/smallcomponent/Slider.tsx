import { useEffect, useState } from "react";
import a from "../../assets/A2.jpg";
import b from "../../assets/aaaaa.jpg";
import c from "../../assets/abc.jpg";
import d from "../../assets/Mahwa.jpg";
import e from "../../assets/maihoa.jpg";
import f from "../../assets/xyz.jpg";
import axios from "axios";

function Slider() {
  const image = [
    {
      link: a,
    },
    {
      link: b,
    },
    {
      link: c,
    },
    {
      link: d,
    },
    {
      link: e,
    },
    {
      link: f,
    },
  ];
  const [hienThi, setHienThi] = useState(image);
  const [count, setCount] = useState(0);

  const loadSlider = async () => {
    let result = await axios.get("http://localhost:3579/api/v1/banner");
    setHienThi(result.data);
  };

  useEffect(() => {
    loadSlider();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHienThi((prevState) => {
        const clone = [...prevState];
        const first = clone.shift();
        if (first) {
          clone.push(first);
        }
        return clone;
      });
      setCount((prevCount) => prevCount + 1);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count > 0) {
      const images = document.querySelectorAll(".slider-item");
      images[2].classList.add("slide-right");
      images[0].classList.add("slide-left");
      images[1].classList.add("slide-left");
      setTimeout(() => {
        images[2].classList.remove("slide-right");
        images[0].classList.remove("slide-left");
        images[1].classList.remove("slide-left");
      }, 500);
    }
  }, [hienThi]);

  return (
    <div className="w-full flex overflow-auto mt-[80px]">
      {hienThi.map((item, i) => (
        <img
          key={i}
          src={item.link}
          alt=""
          className={`slider-item w-1/3 h-70 object-over p-3 rounded-3xl overflow-hidden ${
            i < 3 ? "block" : "hidden"
          }`}
        />
      ))}
    </div>
  );
}

export default Slider;
