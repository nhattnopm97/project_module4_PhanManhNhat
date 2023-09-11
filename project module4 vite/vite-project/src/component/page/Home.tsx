import CurrentHome from "../smallcomponent/CurrentHome";
import DoiTacAmNhac from "../smallcomponent/DoiTacAmNhac";
import NewRelease from "../smallcomponent/NewRelease";
import Slider from "../smallcomponent/Slider";
import YouMayLike from "../smallcomponent/YouMayLike";

function Home() {
  return (
    <div className="bg-[#170f23]">
      <Slider />
      <CurrentHome />
      <YouMayLike />
      <NewRelease />
      <DoiTacAmNhac />
    </div>
  );
}

export default Home;
