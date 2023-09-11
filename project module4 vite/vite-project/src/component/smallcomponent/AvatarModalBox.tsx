import { useEffect, useState } from "react";
import { BiUpload, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutRedux } from "../../redux/authSlice";
import { changeSongLogout } from "../../redux/songChangeSlice";
import { AppDispatch } from "../../redux/store";
// import { Link } from "react-router-dom";
type SetAvtClick = (value: boolean) => void;
function AvatarModalBox({ setAvtClick }: { setAvtClick: SetAvtClick }) {
  type User = {
    name: string;
    avatar: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: number;
    createDate: string;
    birthday: string;
  };
  type dataUser = {
    message: string;
    token: string;
    status: number;
    data: User;
  };
  type Auth = {
    user: dataUser;
    loading: boolean;
    error: boolean;
  };

  type State = {
    auth: Auth;
  };

  const user = useSelector((state: State) => state.auth.user);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleClose = () => {
    setAvtClick(false);
  };
  const stopClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const handleLogout = () => {
    console.log("aaaaaaaaaa");
    localStorage.removeItem("userLocal");
    dispatch(logOutRedux());
    dispatch(changeSongLogout());
    handleClose();
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };
  useEffect(() => {
    // console.log(user);
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    if (userLocal !== null) {
      setAuthUser(userLocal);
    } else {
      if (user.status === 400) {
        return;
      } else if (user.status === 200) {
        console.log("user", user);
        setAuthUser(user.data);
      } else {
        setAuthUser(null);
      }
    }
  }, [user]);
  const handleABX = () => {
    navigate("/library");
  };
  return (
    <>
      <div className="modal z-30" onClick={handleClose}>
        <div className="modal-contentA" onClick={stopClose}>
          <div className="bg-[#34224f] w-[350px] text-white rounded-xl overflow-hidden flex justify-center items-center">
            <div className="w-[338px] m-5">
              <div className="flex items-center">
                <div className="w-[64px] h-[64px] rounded-full overflow-hidden flex justify-center items-center">
                  <img
                    className="w-full"
                    src={authUser !== null ? authUser.avatar : ""}
                    alt=""
                  />
                </div>
                <div className="ml-[20px]">
                  {authUser !== null ? authUser.name : ""}
                </div>
              </div>
              <div
                onClick={handleABX}
                className="flex cursor-pointer mt-2 items-center h-[44px] hover:bg-[#493961] rounded-md p-3"
              >
                <BiUpload />
                <div className="mx-3">Tải lên</div>
              </div>
              <div
                onClick={handleLogout}
                className="flex cursor-pointer mt-2 items-center h-[44px] hover:bg-[#493961] rounded-md p-3"
              >
                <BiLogOut />
                <div className="mx-3">Đăng xuất</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvatarModalBox;
