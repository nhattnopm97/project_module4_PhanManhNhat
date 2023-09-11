import { useState } from "react";
import "../pagecss/register.css";
import logo from "../../assets/logo-dark.svg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [showPsw, setShowPsw] = useState(false);
  const [rgOk, setRgOk] = useState("");
  const [rgNotOk, setRgNotOk] = useState("");
  interface NotifyError {
    email?: string;
    name?: string;
    password?: string;
    repeatPassword?: string;
    birthday?: string;
  }

  const [notifyErr, setNotifyErr] = useState<NotifyError>({});

  type Data = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: number;
    createDate: string;
    birthday: string;
  };
  const initialValue: Data = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: 0,
    createDate: "",
    birthday: "",
  };
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValue);
    let notify: NotifyError = {};
    let flag = true;
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let now = new Date();
    formValue.createDate =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    if (formValue.email === "") {
      notify.email = "Vui lòng nhập email.";
      flag = false;
    } else if (!regex.test(formValue.email)) {
      notify.email = "Email không đúng định dạng.";
      flag = false;
    }
    if (formValue.name === "") {
      notify.name = "Vui lòng nhập tên.";
      flag = false;
    } else if (formValue.name.length < 5) {
      notify.name = "Tên tối thiểu là 5 ký tự.";
      flag = false;
    } else if (formValue.name.length > 30) {
      notify.name = "Tên quá dài, tối đa là 30 ký tự";
      flag = false;
    } else if (formValue.name && formValue.name.trim() !== formValue.name) {
      notify.name = "Tên không được chứa khoảng trắng ở đầu hoặc cuối!";
      flag = false;
    }
    if (formValue.password === "") {
      notify.password = "Vui lòng tạo mật khẩu";
      flag = false;
    } else if (
      formValue.password.length < 6 &&
      formValue.password.length > 18
    ) {
      notify.password = "Độ dài ký tự chỉ trong khoảng 6 đến 18 ký tự";
      flag = false;
    }
    if (formValue.repeatPassword !== formValue.password) {
      notify.repeatPassword = "Lặp lại mật khẩu không đúng";
      flag = false;
    }
    if (!formValue.birthday) {
      notify.birthday = "Vui lòng nhập ngày sinh";
      flag = false;
    }

    if (flag === false) {
      setNotifyErr(notify);
      return;
    } else {
      setNotifyErr({});
    }
    try {
      let result = await axios.post(
        "http://localhost:3579/api/v1/user/register",
        formValue
      );
      console.log(result.data);
      setRgNotOk("");
      setRgOk("Đăng ký thành công!");
      window.scrollTo(0, 0);
      navigate("/login");
    } catch (error) {
      setRgNotOk("Email đã tồn tại");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex mt-[80px] justify-center items-center bg-[#340b57] ">
      <div className="w-[500px] p-[20px] flex flex-col justify-center items-center bg-[#2a213a] text-white rounded-[30px] overflow-hidden ">
        <div className="relative flex justify-center items-center ">
          <img src={logo} alt="logo" className="w-[120px] h-[40px]" />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h2>Chào mừng tới Zingmp3</h2>
          <h2>Đăng ký</h2>
          <h2 className="text-green-500">{rgOk}</h2>
          <h2 className="text-red-900">{rgNotOk}</h2>
          {/* <span>Tìm và thử ý tưởng mới</span> */}
        </div>
        <form action="POST" className="form" onSubmit={handleSubmit}>
          <div className="email">
            <label>Email</label>
            <p className="text-red-900">{notifyErr.email}</p>
            <div className="wrapperInput">
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
            <label>Tên</label>
            <div className="text-red-900 flex items-center w-[268px]">
              {notifyErr.name}
            </div>
            <div className="wrapperInput">
              <input
                onChange={handleChange}
                className="w-11/12 outline-0 border-none bg-[#2a213a]"
                value={formValue.name}
                type="text"
                name="name"
                placeholder="Tên của bạn"
              />
            </div>
          </div>
          <div>
            <label>Mật khẩu</label>
            <p className="text-red-900">{notifyErr.password}</p>
            <div className="wrapperInput relative">
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
          <div>
            <label>Nhập lại mật khẩu</label>
            <p className="text-red-900">{notifyErr.repeatPassword}</p>
            <div className="wrapperInput relative">
              <input
                onChange={handleChange}
                className="w-11/12 outline-0 border-none bg-[#2a213a]"
                value={formValue.repeatPassword}
                type={showPsw ? "text" : "password"}
                name="repeatPassword"
                placeholder="Nhập lại mật khẩu"
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
          <div>
            <label>Ngày sinh</label>
            <p className="text-red-900">{notifyErr.birthday}</p>
            <div className="wrapperInput relative">
              <input
                onChange={handleChange}
                className="w-11/12 outline-0 border-none bg-[#2a213a]"
                type="date"
                name="birthday"
                value={formValue.birthday}
              />
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
          Đã có tài khoản?{" "}
          <span>
            <Link to="/login">Đăng nhập</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
