import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdHeartEmpty, IoIosLogOut } from "react-icons/io";
import { MyContext } from '../../MyContext';
import { uploadData } from "../../utils/api";
import { useEffect } from "react";
import { getData } from "../../utils/api";
import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { postData } from "../../utils/api";
import { editData } from "../../utils/api";
import { Collapse } from '@mui/material';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const ProfilePageComponent = () => {
  // ================= CONTEXT & NAVIGATION =================
  const context = useContext(MyContext);
  const { setIsLogin, userData, setUserData } = context;

  const navigate = useNavigate();
  const history = useNavigate();


  // ================= STATES =================
  const [previous, setPrevoius] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);
  const [isAddressFormShow, setIsAddressFormShow] = useState(false);

  const [userId, setUserId] = useState("");

  // ================= FORM STATES =================
  const [formFiled, setFormField] = useState({
    name: "",
    email: "",
    phoneNo: ""
  });

  const [ChangePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [address, setAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true,
    userId: ""
  });

  // ================= AUTH GUARD =================
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history("/");
    }
  }, []);

  // ================= USER DATA → FORM =================
  useEffect(() => {
    if (!userData) return;
    console.log("Profile Data: userData ->", userData);

    setUserId(userData._id || "");

    // Normalize phone number for PhoneInput
    let rawPhone = userData.phoneNo || userData.mobile || "";
    let normalizedPhone = rawPhone;

    if (rawPhone) {
      // Remove any non-numeric characters for comparison
      const cleanPhone = String(rawPhone).replace(/\D/g, "");

      if (cleanPhone.startsWith("0")) {
        normalizedPhone = "+92" + cleanPhone.substring(1);
      } else if (!String(rawPhone).startsWith("+") && cleanPhone.length > 0) {
        normalizedPhone = "+" + cleanPhone;
      }
    }

    console.log("Profile Data: Normalized Phone ->", normalizedPhone);

    setFormField({
      name: userData.name || "",
      email: userData.email || "",
      phoneNo: normalizedPhone
    });
    setChangePassword((prev) => ({
      ...prev,
      name: userData.name || "",
      email: userData.email || "",
      phoneNo: normalizedPhone
    }));
  }, [userData]); // <-- use userData, not userData._id


  // ================= AVATAR PREVIEW =================
  useEffect(() => {
    const avatar = userData?.avatar;

    if (avatar !== "" && avatar !== undefined) {
      if (Array.isArray(avatar)) {
        setPrevoius(avatar);
      } else {
        setPrevoius([avatar]);
      }
    }
  }, [userData]);

  // ================= INPUT HANDLER =================
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({ ...prev, [name]: value }));
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeInputAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // ================= VALIDATION =================
  const valideValue = Object.values(formFiled).every(
    (el) => el !== null && el !== undefined && String(el).trim() !== ""
  );

  const valideValue2 = Object.values(ChangePassword).every(
    (el) => el !== null && el !== undefined && String(el).trim() !== ""
  );

  const valideValueAddress = Object.values(address).every(
    (el) => el !== null && el !== undefined && String(el).trim() !== ""
  );

  // ================= IMAGE UPLOAD =================
  let selectedImages = [];

  const onChangeFile = async (e, apiEndPoint) => {
    const formData = new FormData();

    try {
      setPrevoius([]);
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(files[i].type)
        ) {
          selectedImages.push(files[i]);
          formData.append("avatar", files[i]);
        } else {
          context.alertBox(
            "error",
            "Please select a valid image file jpg, png, jpeg, webp"
          );
          setUploading(false);
          return;
        }
      }

      await uploadData(apiEndPoint, formData).then((res) => {
        setUploading(false);
        if (res?.avatar) {
          setPrevoius([res.avatar]);
          const updatedUser = { ...userData, avatar: res.avatar };
          setUserData(updatedUser);
          localStorage.setItem("userData", JSON.stringify(updatedUser));
          context.alertBox({ type: "success", msg: "Avatar updated successfully!" });
        }
      });


    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  // ================= PROFILE UPDATE =================
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFiled.name === '') {
      context.alertBox({
        type: "error",
        msg: "please add the full name"
      });
      return false;
    }
    if (formFiled.phoneNo === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the full phoneNo"
      });
      return false;
    }
    if (formFiled.email === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the full email"
      });
      return false;
    }


    editData(`/api/user/${userId}`, formFiled).then((res) => {
      setIsLoading(false);
      if (res?.data?.success || res?.success || res?.data) {
        const updatedData = res?.data?.data || res?.data || res;
        context.alertBox({
          type: "success",
          msg: res.message || "Profile updated successfully!"
        });

        // Update context and localStorage
        const newUser = { ...userData, ...formFiled };
        setUserData(newUser);
        localStorage.setItem("userData", JSON.stringify(newUser));
        localStorage.setItem("userEmail", formFiled.email);

        // If the backend indicates verification is needed due to email change
        if (res?.shouldVerify || res?.data?.shouldVerify) {
          history("/verify");
        }
      } else {
        context.alertBox({
          type: "error",
          msg: res?.message || "Update failed. Please try again."
        });
      }
    }).catch((err) => {
      console.error("Update error:", err);
      context.alertBox({
        type: "error",
        msg: "Network error. Please try again."
      });
    });
  };

  // ================= PROFILE UPDATE =================
  const handleSubmitAddress = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (address.address_line === '') {
      context.alertBox({
        type: "error",
        msg: "please add the Address"
      });
      return false;
    }
    if (address.city === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the city"
      });
      return false;
    }
    if (address.state === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the state"
      });
      return false;
    }
    if (address.pincode === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the pincode"
      });
      return false;
    }
    if (address.country === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the country"
      });
      return false;
    }
    if (address.mobile === '') {
      context.alertBox({
        type: "error",
        msg: "please enter the mobile number"
      });
      return false;
    }


    postData(`/api/adress/add-adress`, address).then((res) => {
      setIsLoading(false);
      if (res?.success) {
        context.alertBox({
          type: "success",
          msg: res?.message || "Address added successfully"
        });
        setIsAddressFormShow(false);
        setAddress({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
          status: true,
          userId: userId
        });
      } else {
        context.alertBox({
          type: "error",
          msg: res?.message || "Update failed. Please try again."
        });
      }
    }).catch((err) => {
      console.error("Update error:", err);
      context.alertBox({
        type: "error",
        msg: "Network error. Please try again."
      });
    });
  };
  // ================= CHANGE PASSWORD =================
  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (!ChangePassword.oldPassword) {
      context.alertBox({ type: "error", msg: "please add the old Password" });
      return;
    }

    if (!ChangePassword.newPassword) {
      context.alertBox({ type: "error", msg: "please enter the New Password" });
      return;
    }

    if (!ChangePassword.confirmPassword) {
      context.alertBox({ type: "error", msg: "please enter the Confirm Password" });
      return;
    }

    if (ChangePassword.confirmPassword !== ChangePassword.newPassword) {
      context.alertBox({
        type: "error",
        msg: "New Password not equal to Confirm Password"
      });
      return;
    }

    postData(`/api/user/reset-password`, ChangePassword)
      .then((res) => {
        setIsLoading2(false);

        if (res?.success) {
          context.alertBox({
            type: "success",
            msg: res.message || "Password updated successfully"
          });
          setChangePassword({
            email: ChangePassword.email,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
        } else {
          context.alertBox({
            type: "error",
            msg: res?.message || "Password change failed"
          });
        }
      })
      .catch(() => {
        context.alertBox({ type: "error", msg: "Network error" });
      });
  };

  // ================= LOGOUT =================
  const logout = () => {
    const cleanup = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      setIsLogin(false);
      setUserData(null);
      navigate("/Login");
    };

    getData(`/api/user/logout?token=${localStorage.getItem("accessToken")}`)
      .then(() => cleanup())
      .catch(() => cleanup());
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-[700] text-[20px]">Profile</h1>
      </div>


      <br />
      <div className="w-[95%] rounded-md mx-auto flex p-5 card bg-white pt-4 mt-4 shadow-md">
        <div className="w-[20%] ">
          <div className="bg-white rounded-md sticky top-[10px]">
            <div className="relative w-full p-5 flex items-center justify-center flex-col">
              <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden mb-4 group flex items-center justify-center bg-gray-200">
                {
                  uploading === true ? <CircularProgress color="inherit" /> :
                    <>
                      {
                        previous?.length !== 0 ? previous?.map((img, index) => {
                          return (
                            <img
                              src={img}
                              key={index}
                              alt="profile"
                              className="w-full h-full object-cover"
                            />
                          )
                        }) :
                          <img
                            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                      }
                    </>

                }
                <div className="overlay absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100">
                  <FaCloudUploadAlt className="text-white text-[25px]" />
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => {
                      onChangeFile(e, 'api/user/user-avatar')
                    }}
                    name="avatar"
                  />
                </div>
              </div>
              <h3 className="mt-3 text-[16px] font-medium text-center">{userData?.name || localStorage.getItem("userName")}</h3>
              <h6 className="text-[13px] font-[500] text-[rgba(35, 82, 236, 0.8)]">{userData?.email || localStorage.getItem("userEmail")}</h6>
            </div>

            <ul className="list-none pb-5 myAccountTabs">
              <li className="w-full">
                <NavLink to="/MyAccount" className={({ isActive }) => isActive ? "active" : ""}>
                  <Button className="w-full !capitalize !text-left !px-5 !py-2 !justify-start !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                    <FaRegUser className="text-[18px]" /> My Profile
                  </Button>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>
                  <Button className="w-full !capitalize !text-left !px-5 !py-2 !justify-start !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                    <IoBagCheckOutline className="text-[18px]" /> My Orders
                  </Button>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink to="/myList" className={({ isActive }) => isActive ? "active" : ""}>
                  <Button className="w-full !capitalize !text-left !px-5 !py-2 !justify-start !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                    <IoMdHeartEmpty className="text-[18px]" /> Wishlist
                  </Button>
                </NavLink>
              </li>

              <li className="w-full">
                <Button className="w-full !capitalize !text-left !px-5 !py-2 !justify-start !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2" onClick={logout}>
                  <IoIosLogOut className="text-[18px]" /> Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[80%] ">
          <section className="py-10 w-full">
            <div className="card bg-white p-5 mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">
                  My Profile
                </h2>
                <Button className="!ml-auto" onClick={() => setIsChangePasswordFormShow(prev => !prev)}>
                  Change Password
                </Button>

              </div>

              <hr />

              <form action="" className="mt-8" onSubmit={handleSubmit}>
                <div className="items-center gap-5 flex ">
                  <div className="w-[100%] flex gap-5">
                    <TextField
                      // type="text"
                      label="Full Name *"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name='name' onChange={onChangeInput} value={formFiled.name} disabled={isLoading === true ? true : false}
                    />
                    <TextField
                      type="email"
                      label="Email *"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name='email' onChange={onChangeInput} value={formFiled.email} disabled={isLoading === true ? true : false}
                    />
                  </div>
                </div>
                <div className="flex mt-4 items-center gap-5">
                  <div className="w-[48%]">
                    <PhoneInput
                      defaultCountry="pk"
                      value={formFiled.phoneNo}
                      onChange={(phone) => {
                        setFormField((prev) => ({ ...prev, phoneNo: phone }));
                        setChangePassword((prev) => ({ ...prev, phoneNo: phone }));
                      }}
                      forceDialCode={true}
                      className="w-full h-[40px]"
                      inputStyle={{ width: '100%', height: '40px', fontSize: '14px' }}
                      disabled={isLoading === true}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.1)] bg-[#f1faff] hover:bg[#e7f3f9] cursor-pointer mt-5" onClick={() => setIsAddressFormShow(prev => !prev)}>
                  <span className="text-[14px] font-[500]">Upload Address</span>
                </div>
                <br />
                <div className="flex items-center gap-4">
                  <Button className="btn-org btn-lg w-[200px] cursor-pointer" type='submit' disabled={!valideValue}>
                    {
                      isLoading ? <CircularProgress color="inherit" /> : 'Profile Update'
                    }
                  </Button>
                </div>


              </form>
            </div>

            <Collapse in={isChangePasswordFormShow}>
              <div className="card bg-white p-5 rounded-md mb-5">
                <div className="flex items-center pb-3">
                  <h2 className="pb-0">
                    Change Password
                  </h2>
                </div>

                <hr />

                <form action="" className="mt-8" onSubmit={handleSubmitChangePassword}>
                  <div className="items-center gap-5 flex ">
                    <div className="w-[100%] flex gap-5">
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Old Password *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="oldPassword"
                          value={ChangePassword.oldPassword}
                          onChange={onChangeInput}
                          disabled={isLoading2 === true ? true : false}
                        />
                        <span
                          className="absolute right-4 top-[50%] transform -translate-y-1/2 cursor-pointer text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <IoEye />}
                        </span>
                      </div>
                      <div className="mb-4 relative w-full">
                        <TextField
                          type="text"
                          label="New Password *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="newPassword"
                          value={ChangePassword.newPassword}
                          onChange={onChangeInput}
                          disabled={isLoading2 === true ? true : false}
                        />
                        <span
                          className="absolute right-4 top-[50%] transform -translate-y-1/2 cursor-pointer text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <IoEye />}
                        </span>
                      </div>

                    </div>
                  </div>
                  <div className="flex mt-4 items-center gap-5">
                    <div className="w-[48%]">
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Confurm Password *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="confirmPassword"
                          value={ChangePassword.confirmPassword}
                          onChange={onChangeInput}
                          disabled={isLoading2 === true ? true : false}
                        />
                        <span
                          className="absolute right-4 top-[50%] transform -translate-y-1/2 cursor-pointer text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <IoEye />}
                        </span>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="flex items-center gap-4">
                    <Button className="btn-org btn-lg w-[200px] cursor-pointer" type='submit' disabled={!valideValue2}>
                      {
                        isLoading2 ? <CircularProgress color="inherit" /> : 'Change Password'
                      }
                    </Button>
                  </div>
                </form>
              </div>
            </Collapse>

            <Collapse in={isAddressFormShow}>
              <div className="card bg-white p-5 rounded-md mb-5">
                <div className="flex items-center pb-3">
                  <h2 className="pb-0">
                    Add Address Details
                  </h2>
                </div>

                <hr />

                <form action="" className="mt-8" onSubmit={handleSubmitAddress}>
                  <div className="items-center gap-5 flex ">
                    <div className="w-[100%] flex gap-5">
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Add Address Line1 *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="address_line"
                          value={address.address_line}
                          onChange={onChangeInputAddress}
                          disabled={isLoading2 === true ? true : false}
                        />
                      </div>
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Add City *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="city"
                          value={address.city}
                          onChange={onChangeInputAddress}
                          disabled={isLoading2 === true ? true : false}
                        />
                      </div>

                    </div>
                  </div>
                  <div className="items-center gap-5 flex ">
                    <div className="w-[100%] flex gap-5">
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Add State *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="state"
                          value={address.state}
                          onChange={onChangeInputAddress}
                          disabled={isLoading2 === true ? true : false}
                        />
                      </div>
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Add Pin Code *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="pincode"
                          value={address.pincode}
                          onChange={onChangeInputAddress}
                          disabled={isLoading2 === true ? true : false}
                        />
                      </div>

                    </div>
                  </div>
                  <div className="items-center gap-5 flex ">
                    <div className="w-[100%] flex gap-5">
                      <div className="mb-4 relative w-full">
                        <TextField
                          label="Add Country *"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="country"
                          value={address.country}
                          onChange={onChangeInputAddress}
                          disabled={isLoading2 === true ? true : false}
                        />
                      </div>
                      <div className="mb-4 relative w-full">
                        <PhoneInput
                          defaultCountry="pk"
                          value={address.mobile}
                          onChange={(phone) => {
                            setAddress((prev) => ({ ...prev, mobile: phone }));
                          }}
                          forceDialCode={true}
                          className="w-full h-[40px]"
                          inputStyle={{ width: '100%', height: '40px', fontSize: '14px' }}
                          disabled={isLoading === true}
                        />
                      </div>

                    </div>
                  </div>

                  <br />
                  <div className="flex items-center gap-4">
                    <Button className="btn-org btn-lg w-[200px] cursor-pointer" type='submit' disabled={!valideValue2}>
                      {
                        isLoading2 ? <CircularProgress color="inherit" /> : 'Change Password'
                      }
                    </Button>
                  </div>
                </form>
              </div>
            </Collapse>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ProfilePageComponent;