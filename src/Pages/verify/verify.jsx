import { useContext, useEffect, useState } from "react";
import OtpBox from "../../Components/OtpBox/OtpBox";
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../utils/api";
import { MyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState("");

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const type = localStorage.getItem("actionType");
        setActionType(type);
    }, []);

    const handleChangeOtp = (value) => {
        setOtp(value);
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const email = localStorage.getItem("userEmail");
        if (!email) {
            context.alertBox({ type: "error", msg: "Email not found" });
            setIsLoading(false);
            return;
        }

        try {
            let url = "";
            let payload = {};

            if (actionType !== "forgot-password") {
                url = "/api/user/verify-email";
                payload = { email: email.trim(), code: otp };
            } else {
                url = "/api/user/verify-forgot-password-otp";
                payload = { email: email.trim(), otp: otp };
            }

            console.log("Verify Payload:", payload); // Debug log

            const res = await postData(url, payload);
            console.log("Verify Response:", res); // Debug log

            if (res.error !== true) {
                context.alertBox({ type: "success", msg: res.message });
                if (actionType !== "forgot-password") {
                    localStorage.removeItem("userEmail");
                    history("/login");
                } else {
                    localStorage.setItem("verificationOtp", otp); // Store OTP for reset password step
                    history("/changePassword");
                }
            } else {
                context.alertBox({ type: "error", msg: res.message });
            }

        } catch (error) {
            console.error(error);
            context.alertBox({ type: "error", msg: "Network error" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="loginSection">
            <div className='loginBox'>
                <div className="text-center mt-10">
                    <h1 className="text-center text-[30px] font-[500] mb-5 leading-10">Verify OTP</h1>
                </div>

                <div className="wrapper mt-5 card border !p-8">
                    <p className="text-center text-sm mb-5 text-gray-500">
                        OTP sent to <span className="text-primary font-bold">{localStorage.getItem("userEmail")}</span>
                    </p>

                    <form onSubmit={verifyOTP}>
                        <div className="flex justify-center mb-6">
                            <OtpBox length={6} onChange={handleChangeOtp} />
                        </div>

                        <div className='form-group'>
                            <Button type="submit" className="w-full btn-blue btn-lg btn-big !bg-[rgba(0,0,0,0.9)] !text-white hover:!bg-black">
                                {isLoading ? <CircularProgress className="!w-[30px] !h-[30px] !text-white" /> : 'Verify OTP'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default VerifyPage;
