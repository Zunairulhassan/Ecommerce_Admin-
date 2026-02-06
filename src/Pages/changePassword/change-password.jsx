import { Link, NavLink } from "react-router-dom";
import { Button, Checkbox } from "@mui/material";
import { RiLoginCircleLine } from "react-icons/ri";
import { PiUserCirclePlus } from "react-icons/pi";
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { postData } from "../../utils/api";
import { MyContext } from "../../MyContext";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const context = useContext(MyContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    if (!email) {
      context.alertBox({ type: "error", msg: "Email not found. Please try again from start." });
      history("/login");
      return;
    }
    if (!newPassword || !confirmPassword) {
      context.alertBox({ type: "error", msg: "Please fill all fields" });
      return;
    }
    if (newPassword !== confirmPassword) {
      context.alertBox({ type: "error", msg: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const res = await postData("/api/user/reset-password", {
        email,
        newPassword,
        confirmPassword
      });
      if (res?.success) {
        context.alertBox({ type: "success", msg: "Password changed successfully" });
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        history("/login");
      } else {
        context.alertBox({ type: "error", msg: res?.message || "Something went wrong" });
      }
    } catch (error) {
      console.error(error);
      context.alertBox({ type: "error", msg: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-white">
        <header className="w-full bg-white fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
          <Link to="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg28TIT_nfkkO9IgbiA2ptw36x_-8OjSCrgA277IeGjDKFmwTOaMl1PNOBUQN00lRNFuM&usqp=CAU" alt="iamge" className="w-[100px]" />
          </Link>
          <div className="flex items-center gap-2">
            <NavLink to="/login" exact={true} activeClassName="isActive">
              <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 gap-1">
                <RiLoginCircleLine className="text-[18px]" />Login
              </Button>
            </NavLink>
            <NavLink to="/signup" exact={true} activeClassName="isActive">
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

          <h1 className="text-center text-[35px] font-[500] mb-10 leading-10">Wellcome Back!<br /><span className="text-primary">Reset your password</span></h1>

          <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
            <div className="form-group mb-4 w-full">
              <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  className="!absolute top-[5px] right-[5px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-[rgba(0,0,0,0.5)] !p-0 hover:!bg-[rgba(0,0,0,0.1)] hover:text-[rgba(0,0,0,0.7)]"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
            </div> <div className="form-group mb-4 w-full">
              <h4 className="text-[14px] font-[500] mb-1">Confirm Password</h4>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="!absolute top-[5px] right-[5px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-[rgba(0,0,0,0.5)] !p-0 hover:!bg-[rgba(0,0,0,0.1)] hover:text-[rgba(0,0,0,0.7)]"
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
            </div>
            <Button className="btn-lg btn-blue w-full" type="submit" disabled={loading}>
              {loading ? <CircularProgress color="inherit" size={24} /> : "Change Password"}
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
          </form>
        </div>

      </section>
    </>
  )
}

export default ChangePassword;