import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@mui/material";
import { RiLoginCircleLine } from "react-icons/ri";
import { PiUserCirclePlus } from "react-icons/pi";
import { useContext, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { MyContext } from "../../MyContext";
import { postData } from "../../utils/api";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phoneNo: "", // Renamed to match backend
    password: "",
    isAdmin: true
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeType = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  function handleClickGoogle() {
    setLoadingGoogle(false);
  }
  function handleClickFb() {
    setLoadingFb(false);
  }

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox({ type: "error", msg: "Please enter your name" });
      setIsLoading(false);
      return;
    }
    if (formFields.email === "") {
      context.alertBox({ type: "error", msg: "Please enter your email" });
      setIsLoading(false);
      return;
    }
    if (formFields.phoneNo === "") { // Updated check
      context.alertBox({ type: "error", msg: "Please enter your phone number" });
      setIsLoading(false);
      return;
    }
    if (formFields.password === "") {
      context.alertBox({ type: "error", msg: "Please create a password" });
      setIsLoading(false);
      return;
    }

    try {
      console.log("Register Payload:", formFields);
      const res = await postData("/api/user/register", formFields);
      console.log("Register Response:", res); // Debug log

      if (res.error !== true) {
        context.alertBox({ type: "success", msg: "Registration successful!" });
        localStorage.setItem("userEmail", formFields.email);
        setTimeout(() => {
          history("/verify");
        }, 1000);
      } else {
        context.alertBox({ type: "error", msg: res.message || "Registration failed" });
      }
    } catch (error) {
      console.error(error);
      context.alertBox({ type: "error", msg: "Network error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <header className="w-full bg-white fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg28TIT_nfkkO9IgbiA2ptw36x_-8OjSCrgA277IeGjDKFmwTOaMl1PNOBUQN00lRNFuM&usqp=CAU" alt="iamge" className="w-[100px]" />
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 gap-1">
              <RiLoginCircleLine className="text-[18px]" />Login
            </Button>
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 gap-1">
              <PiUserCirclePlus className="text-[18px]" />Sign Up
            </Button>
          </NavLink>
        </div>
      </header>

      <div className="pb-20 loginBox card flex items-center flex-col justify-center w-[45%] h-auto mx-auto relative z-50 mt-14">
        <div className="text-center mt-30">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg28TIT_nfkkO9IgbiA2ptw36x_-8OjSCrgA277IeGjDKFmwTOaMl1PNOBUQN00lRNFuM&usqp=CAU" alt="" className="w-[220px] h-[90px]" />
        </div>

        <h1 className="text-center text-[35px] font-[500] mb-10 leading-10">Register a new<br />account</h1>

        <div className=" gap-5 flex items-center justify-center w-full pb-4 mt-[-20px]">
          <LoadingButton
            size="small"
            color="inherit"
            onClick={handleClickGoogle}
            loading={loadingGoogle}
            loadingPosition="start"
            startIcon={<FcGoogle />}
            variant="outlined"
            className="!px-5 !bg-none !text-[16px] !capitalize !text-[rgba(0,0,0,0.7)]"
          >
            Login with Google
          </LoadingButton>
          <LoadingButton
            size="small"
            color="inherit"
            onClick={handleClickFb}
            loading={loadingFb}
            loadingPosition="start"
            startIcon={<FaFacebook />}
            variant="outlined"
            className="!px-5 !bg-none !text-[16px] !capitalize !text-[rgba(0,0,0,0.7)]"
          >
            Login with Facebook
          </LoadingButton>
        </div>

        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
          <span className="text-[15px] font-[500]">Or, Sign in with your email</span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>

        <form className="w-full px-8 mt-3" onSubmit={register}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Name</h4>
            <input
              type="text"
              className="w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md outline-none px-4 text-[14px] font-[500] focus:border-[rgba(0,0,0,0.5)]"
              name="name"
              onChange={onChangeType}
              value={formFields.name}
            />
          </div>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              className="w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md outline-none px-4 text-[14px] font-[500] focus:border-[rgba(0,0,0,0.5)]"
              name="email"
              onChange={onChangeType}
              value={formFields.email}
            />
          </div>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Phone</h4>
            <input
              type="text"
              className="w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md outline-none px-4 text-[14px] font-[500] focus:border-[rgba(0,0,0,0.5)]"
              name="phoneNo" // Renamed from phone
              onChange={onChangeType}
              value={formFields.phoneNo} // Renamed from phone
            />
          </div>
          <div className="form-group mb-4 w-full relative">
            <h4 className="text-[14px] font-[500] mb-1">Password</h4>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md outline-none px-4 text-[14px] font-[500] focus:border-[rgba(0,0,0,0.5)]"
              name="password"
              onChange={onChangeType}
              value={formFields.password}
            />
            <Button
              className="!absolute !right-2 !top-[35px] !rounded-full !w-[35px] !h-[35px] !min-w-[35px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.8)]" /> : <FaRegEyeSlash className="text-[18px] text-[rgba(0,0,0,0.8)]" />}
            </Button>
          </div>

          <div className="w-full flex items-center justify-between mt-3">
            <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="I agree to the all Terms & Condiotions" />
          </div>

          <Button type="submit" className="!w-full !mt-5 !bg-[rgba(0,0,0,0.9)] !text-white !py-3 !rounded-md !text-[16px] !font-[500] !capitalize transition-all duration-300 hover:!bg-black">
            {isLoading ? <CircularProgress color="inherit" className="!w-[30px] !h-[30px]" /> : 'Sign Up'}
          </Button>

          <p className="text-center mt-3 text-[14px]">Already have an account? <Link to="/login" className="text-blue-500 font-bold hover:text-blue-700">Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default SignUp;