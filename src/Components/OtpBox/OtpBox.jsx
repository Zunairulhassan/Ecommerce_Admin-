import { useState } from "react";

const QtyBox = ({ length, onChange }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));

    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(value)) return;

        // Updated otp
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));
        if (value && index < length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    }
    return (
        <>
            <div className="itpBox" style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                {
                    otp.map((data, index) => (
                        <input
                            type="text"
                            key={index}
                            id={`otp-input-${index}`}
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target, index)}
                            style={{
                                width: '45px',
                                height: '45px',
                                textAlign: 'center',
                                fontSize: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                    ))

                }
            </div>
        </>
    )
}
export default QtyBox;