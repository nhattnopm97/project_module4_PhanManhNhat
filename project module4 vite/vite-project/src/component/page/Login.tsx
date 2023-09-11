import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-dark.svg";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../redux/authSlice";
import { AppDispatch } from "../../redux/store";
type Data = {
  email: string;
  password: string;
};
function Login() {
  const [showPsw, setShowPsw] = useState(false);
  const [message, setMessage] = useState("");
  const [notifyErr, setNotifyErr] = useState<NotifyError>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const initialValue: Data = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialValue);
  interface NotifyError {
    email?: string | undefined;
    password?: string | undefined;
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value } as Data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let notify: NotifyError = {};
    let flag = true;
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formValue.email === "") {
      notify.email = "Vui lòng nhập email.";
      flag = false;
    } else if (!regex.test(formValue.email)) {
      notify.email = "Email không đúng định dạng.";
      flag = false;
    }

    if (formValue.password === "") {
      notify.password = "Vui lòng tạo mật khẩu";
      flag = false;
    } else if (
      formValue.password.length < 6 ||
      formValue.password.length > 18
    ) {
      notify.password = "Độ dài mật khẩu chỉ trong khoảng 6 đến 18 ký tự";
      flag = false;
    }
    if (flag === false) {
      setNotifyErr(notify);
      return;
    }
    setNotifyErr({});
    let result = await dispatch(loginRedux(formValue));
    if (
      result.type === "auth/login/fulfilled" &&
      result.payload.status === 200
    ) {
      setMessage("");
      setLoginSuccess(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (result.payload.status === 400) {
      setMessage("Tài khoản hoặc mật khẩu không chính xác");
      window.scrollTo(0, 0);
    }
  };

  const [loginSuccess, setLoginSuccess] = useState(false);
  return (
    <div className="flex justify-center items-center mt-[40px] bg-[#340b57] h-[100vh]">
      <div className="w-[500px] p-[20px] flex flex-col justify-center items-center bg-[#2a213a] text-white rounded-[30px] overflow-hidden">
        <div className="relative flex justify-center items-center">
          <img src={logo} alt="logo" className="w-[120px] h-[40px]" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2>Chào mừng tới Zingmp3</h2>
          <h2>Đăng nhập</h2>
          {loginSuccess && (
            <h2 style={{ color: "green" }}>Đăng nhập thành công!</h2>
          )}
          {message !== "" ? <h2 style={{ color: "red" }}>{message}</h2> : <></>}
          <span className="text-center">Tìm và thưởng thức bài hát mới</span>
        </div>
        <form
          action="POST"
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-[268px] overflow-hidden">
            <label>Email</label>
            <p className="text-red-600">{notifyErr.email}</p>
            <div className="wrapperInput border-2 flex justify-center items-center w-[268px] h-[50px] rounded-[10px] border-solid overflow-hidden">
              <input
                onChange={handleChange}
                className="w-11/12 outline-0 border-none bg-[#2a213a]"
                type="text"
                name="email"
                placeholder="Email"
                value={formValue.email}
              />
            </div>
          </div>
          <div>
            <label>Mật khẩu</label>
            <p className="text-red-600">{notifyErr.password}</p>
            <div className="wrapperInput border-2 flex justify-center items-center w-[268px] h-[50px] rounded-[10px] overflow-hidden relative">
              <input
                onChange={handleChange}
                className="w-11/12 outline-0 border-none bg-[#2a213a]"
                value={formValue.password}
                type={showPsw ? "text" : "password"}
                name="password"
                placeholder="Tạo mật khẩu mới"
              />
              {showPsw ? (
                <RemoveRedEyeIcon
                  className="absolute right-[10px] cursor-pointer"
                  onClick={() => setShowPsw(false)}
                ></RemoveRedEyeIcon>
              ) : (
                <VisibilityOffIcon
                  className="absolute right-[10px] cursor-pointer"
                  onClick={() => setShowPsw(true)}
                ></VisibilityOffIcon>
              )}
            </div>
          </div>
          <button
            className="submitButton w-[268px] px-[10px] py-[20px] mt-[10px] border-none outline-0 bg-[#9b4de0] rounded-[30px] text-white hover:bg-[#340b57]"
            type="submit"
          >
            Tiếp tục
          </button>
        </form>
        <div>
          Chưa có tài khoản? <Link to="/register">Đăng ký!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
