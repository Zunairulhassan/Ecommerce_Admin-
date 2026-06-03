import './App.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './Pages/DashBoard/dashBoard';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import { useState, useEffect } from 'react';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import ForgotPassword from './Pages/ForgottonPassword/ForgottonPassword';
import Products from './Pages/Products/Products';
import AddProducts from './Pages/Products/AddProducts/AddProducts';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AddBannerSlider from './Pages/HomeSliderBanner/AddSliderBanner';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import Slide from '@mui/material/Slide';
import * as React from 'react';
import HomeSliderBanner from './Pages/HomeSliderBanner/HomeSliderBanner';
import CategoryList from './Pages/Category/CategoryList';
import AddCategory from './Pages/Category/AddCategory';
import SubCategoryList from './Pages/Category/SubCategoryList';
import AddSubCategory from './Pages/Category/AddSubCategory';
import Users from './Pages/User/User';
import Order from './Pages/Orders/Order';
import VerifyPage from './Pages/verify/verify';
import ChangePassword from './Pages/ForgottonPassword/changePassword';
import ProfilePageComponent from './Pages/Profile/profilePage';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { Toaster, toast } from 'react-hot-toast'; // Assuming react-hot-toast based on usage, or verify package.json first.
// If it's react-toastify: import { ToastContainer, toast } from 'react-toastify'; import 'react-toastify/dist/ReactToastify.css';

import { MyContext } from './MyContext';


import { getData } from './utils/api'; // Ensure correct import path

const alertBox = ({ type, msg }) => {
  if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
  else toast(msg);
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpenFullScreen, setIsOpenFullScreen] = useState({
    open: false,
    model: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
      const userDataFromStorage = localStorage.getItem("userData");
      if (userDataFromStorage && userDataFromStorage !== "undefined") {
        try {
          setUserData(JSON.parse(userDataFromStorage));
        } catch (error) {
          console.error("Error parsing userData from localStorage:", error);
          setUserData(null);
        }
      }
      else {
        window.location.href = "/login";
      }

      // Fetch fresh details to ensure data is up to date
      getData('/api/user/user-details').then((res) => {
        if (res?.success) {
          setUserData(res.data);
          localStorage.setItem("userData", JSON.stringify(res.data));
          if (res?.response?.data?.error === true) {
            if (res?.response?.data?.message === "you have not login") {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
            }
          }
        }
      }).catch(err => console.error("Initial fetch error:", err));

    } else {
      setIsLogin(false);
    }
  }, []);


  const openAlertBox = async (status, msg) => {
    if (status === "success") {
      toast.success(msg);
      try {
        const res = await getData('/api/user/user-details');
        console.log("User Details Fetched:", res);
        if (res?.success) {
          setUserData(res.data);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    }
    else if (status === "error") {
      toast.error(msg);
    } else {
      toast(status);
    }
  }

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    isOpenFullScreen,
    setIsOpenFullScreen,
    openAlertBox,
    alertBox
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <DashBoard />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/changePassword",
      element: <ChangePassword />
    },
    {
      path: "/verify",
      element: <VerifyPage />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/forgottonPassword",
      element: <ForgotPassword />
    },
    {
      path: "/products",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <Products />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/products/upload",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <AddProducts />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/HomeSlider/list",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <HomeSliderBanner />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/Category/list",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <CategoryList />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/SubCategory/list",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <SubCategoryList />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/Users",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <Users />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/orders",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <Order />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/profile",
      element: (
        <section className="main">
          <Header />
          <div className="flex transition-all duration-300">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
            >
              <SideBar />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-600 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'
                }`}
            >
              <ProfilePageComponent />
            </div>
          </div>
        </section>
      )
    },
  ]);

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

      <Dialog
        fullScreen
        open={isOpenFullScreen.open}
        onClose={() => setIsOpenFullScreen({
          open: false
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenFullScreen({ open: false })}
              aria-label="close"
            >
              <IoMdClose className='text-gray-800' />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">{isOpenFullScreen?.model}</span>
            </Typography>
          </Toolbar>
        </AppBar>
        {
          isOpenFullScreen?.model === 'Add Product' && <AddProducts />
        }
        {
          isOpenFullScreen?.model === 'Add Home Slide' && <AddBannerSlider />
        }
        {
          isOpenFullScreen?.model === 'Add New Category' && <AddCategory />
        }
        {
          isOpenFullScreen?.model === 'Add New Sub Category' && <AddSubCategory />
        }
      </Dialog>
    </MyContext.Provider>
  );
}

export default App;

