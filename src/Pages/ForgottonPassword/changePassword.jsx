import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';
import { MdLock } from "react-icons/md";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFiled, setFormField] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFiled.newPassword === "") {
      context.alertBox({ type: "error", msg: "Please enter new password" });
      setIsLoading(false);
      return;
    }
    if (formFiled.confirmPassword === "") {
      context.alertBox({ type: "error", msg: "Please confirm password" });
      setIsLoading(false);
      return;
    }
    if (formFiled.newPassword !== formFiled.confirmPassword) {
      context.alertBox({ type: "error", msg: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (!email) {
      context.alertBox({ type: "error", msg: "Email not found" });
      navigate('/forgottonPassword');
      setIsLoading(false);
      return;
    }

    try {
      const otp = localStorage.getItem("verificationOtp");
      const res = await postData('/api/user/reset-password', {
        email: email,
        otp: otp, // Send verified OTP if available
        password: formFiled.newPassword, // Backend might expect 'password' or 'newPassword', keeping both/aligning with controller logic. Controller expects 'newPassword'.
        // Wait, controller expects 'newPassword'. Previous edit used 'password'.
        // Let's check my controller edit in Step 421.
        // const { email, oldPassword, newPassword, confirmPassword, otp } = request.body;
        // It expects 'newPassword'.
        // But in `resetpassword` CLIENT function (Step 388), it sends:
        // password: formFiled.newPassword
        // I should stick to 'newPassword' if I can, OR send what backend expects.
        // My controller edit kept 'newPassword'. 
        // So payload should be:
        newPassword: formFiled.newPassword,
        confirmPassword: formFiled.confirmPassword
      });

      if (res.error !== true) {
        context.alertBox({ type: "success", msg: "Password changed successfully." });
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        context.alertBox({ type: "error", msg: res.message });
      }
    } catch (err) {
      console.error(err);
      context.alertBox({ type: "error", msg: "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="loginSection">
      <div className='loginBox'>
        <div className="text-center mt-10">
          <h1 className="text-center text-[30px] font-[500] mb-5 leading-10">Change Password</h1>
        </div>

        <div className="wrapper mt-5 card border !p-8">
          <form onSubmit={handleChangePassword}>
            <div className={`form-group relative mb-6 ${formFiled.newPassword !== "" && 'focus'}`}>
              <span className='icon !top-[15px]'><MdLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                className='form-control !pl-10 !h-[50px] !pr-10'
                placeholder='New Password'
                name="newPassword"
                onChange={changeInput}
                value={formFiled.newPassword}
              />
              <Button className="!absolute !right-2 !top-[10px] !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-[rgba(0,0,0,0.5)]" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEye className="text-[20px]" /> : <FaEyeSlash className="text-[20px]" />}
              </Button>
            </div>

            <div className={`form-group relative mb-6 ${formFiled.confirmPassword !== "" && 'focus'}`}>
              <span className='icon !top-[15px]'><MdLock /></span>
              <input
                type={showConfirm ? "text" : "password"}
                className='form-control !pl-10 !h-[50px] !pr-10'
                placeholder='Confirm Password'
                name="confirmPassword"
                onChange={changeInput}
                value={formFiled.confirmPassword}
              />
              <Button className="!absolute !right-2 !top-[10px] !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-[rgba(0,0,0,0.5)]" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <IoEye className="text-[20px]" /> : <FaEyeSlash className="text-[20px]" />}
              </Button>
            </div>

            <div className='form-group'>
              <Button type="submit" className="w-full btn-blue btn-lg btn-big !bg-[rgba(0,0,0,0.9)] !text-white hover:!bg-black">
                {isLoading ? <CircularProgress className="!w-[30px] !h-[30px] !text-white" /> : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
