import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import { MyContext } from "../../MyContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const history = useNavigate();

    const forgotPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        postData('/api/user/forgot-password', { email }).then((res) => {
            setIsLoading(false);
            if (res.error !== true) { // Updated logic check
                localStorage.setItem("userEmail", email);
                localStorage.setItem("actionType", "forgot-password"); // Ensure actionType is set
                context.alertBox({
                    type: "success",
                    msg: "OTP sent successfully!"
                });
                setTimeout(() => {
                    history('/verify');
                }, 1000);
            } else {
                context.alertBox({
                    type: "error",
                    msg: res.message
                });
            }
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
            context.alertBox({
                type: "error",
                msg: "Network error"
            });
        })
    }


    return (
        <section className="loginSection">
            <div className='loginBox'>
                {/* <div className='logo text-center'>
                    <img src="" alt="" width="60px" />
                    <h5 className='font-bold text-[24px]'>Forgot Password</h5>
                </div> */}
                <div className="text-center mt-10">
                    {/* Placeholder for logo if needed or just title */}
                    <h1 className="text-center text-[30px] font-[500] mb-5 leading-10">Forgot Password</h1>
                </div>

                <div className="wrapper mt-5 card border !p-8"> {/* Adjusted visual classes to match old style roughly */}
                    <form onSubmit={forgotPassword}>
                        <div className={`form-group relative mb-6 ${email !== "" && 'focus'}`}>
                            <span className='icon !top-[15px]'><MdEmail /></span>
                            <input
                                type="text"
                                className='form-control !pl-10 !h-[50px]'
                                placeholder='Enter your email'
                                onFocus={() => context.setIsOpenFullScreen(true)}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            {/* <span className='label'>Email</span> */}
                        </div>

                        <div className='form-group'>
                            <Button type="submit" className="w-full btn-blue btn-lg btn-big !bg-[rgba(0,0,0,0.9)] !text-white hover:!bg-black">
                                {isLoading ? <CircularProgress className="!w-[30px] !h-[30px] !text-white" /> : 'Send OTP'}
                            </Button>
                        </div>
                        <span className='text-center block mt-3'>
                            Remember It?
                            <Link to={'/login'} className='text-primary link font-weight-bold'> Login</Link>
                        </span>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;