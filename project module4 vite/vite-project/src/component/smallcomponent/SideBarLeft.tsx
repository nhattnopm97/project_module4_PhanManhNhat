import logo from "../../assets/logo-dark.svg";
// import "./css/sidebarleft.css";
import { Link, NavLink } from "react-router-dom";
import { PiVinylRecordLight } from "react-icons/pi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { GiChart } from "react-icons/gi";
import "./css/sidebarleft.css";
function SideBarLeft() {
  const icons = [
    {
      path: "/",
      text: "Khám phá",
      icon: <PiVinylRecordLight size={30} />,
    },
    {
      path: "/zingchart",
      text: "#ZingChart",
      icon: <GiChart size={30} />,
    },
    {
      path: "/library",
      text: "Thư viện",
      icon: <MdOutlineLibraryMusic size={30} />,
    },
    // {
    //   path: "/subcribe",
    //   text: "Theo dõi",
    //   icon: <PiVinylRecordLight size={30} />,
    // },
  ];
  return (
    <>
      <div className="w-[240px] bg-[#2a213a] text-white min-h-full fixed z-10">
        <div className="w-[240px] bg-[#2a213a] text-white min-h-full overflow-inherit">
          <div className="w-[240px] h-[70px] flex items-center ml-4">
            <Link to="/">
              <img src={logo} alt="logo" className="w-[120px] h-[40px]" />
            </Link>
          </div>
          <div className="flex flex-col overflow-hidden">
            {icons.map((icon, i) => (
              <NavLink to={icon.path} key={i} className="NavlinkSideBar">
                {icon.icon}
                <span className="ml-2.5">{icon.text}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[240px] bg-[#2a213a] text-white min-h-full opacity-0">
        <div className="w-[240px] bg-[#2a213a] text-white min-h-full overflow-inherit">
          <div className="w-[240px] h-[70px] flex items-center">
            <img src={logo} alt="logo" className="w-[120px] h-[40px]" />
          </div>
          <div className="flex flex-col overflow-hidden">
            {icons.map((icon, i) => (
              <NavLink to={icon.path} key={i} className="NavlinkSideBar">
                {icon.icon}
                <span className="ml-2.5">{icon.text}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarLeft;
