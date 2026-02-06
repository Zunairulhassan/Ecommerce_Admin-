import Button from '@mui/material/Button';
import { RiMenu2Line } from 'react-icons/ri';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { FiUser } from "react-icons/fi";
import Devider from '@mui/material/Divider';
import { IoSettingsOutline } from "react-icons/io5";
import { TbWaveSine } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { MyContext } from '../../MyContext';
// Checking previous view_file of App.jsx (line 43): import { MyContext } from './MyContext';
// Header path: src/Components/Header/Header.jsx. So '../../MyContext' is correct.
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import { RiLoginCircleLine } from "react-icons/ri";
import { PiUserCirclePlus } from "react-icons/pi";
import { getData } from '../../utils/api'; // Added getData import

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const { toggleCartPanel, isLogin, setIsLogin, userData, setUserData, isSidebarOpen, setIsSidebarOpen } = useContext(MyContext); // Added specific destructuring
  const openMyAcc = Boolean(anchorMyAcc);
  const history = useNavigate();

  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };

  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const logout = () => {
    setAnchorMyAcc(null);
    getData(`/api/user/logout`)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        setIsLogin(false);
        setUserData(null);
        history("/login");
      })
      .catch((err) => {
        console.error("Logout error", err);
        // Force cleanup even on error
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        setIsLogin(false);
        setUserData(null);
        history("/login");
      });
  }

  return (
    <>
      <header className={`w-full h-[50px] ${isSidebarOpen ? 'pl-64' : 'pl-5'} pr-7 bg-[#fff] shadow-md flex items-center justify-between`}>
        <div className="part1">
          <Button
            className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <RiMenu2Line className="text-[18px]" />
          </Button>
        </div>

        <div className="part2 w-[40%] flex items-center justify-end gap-4">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell className="text-[20px]" />
            </StyledBadge>
          </IconButton>


          {
            isLogin === false ? (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className={({ isActive }) => isActive ? "isActive" : ""}>
                  <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 gap-1">
                    <RiLoginCircleLine className="text-[18px]" />Login
                  </Button>
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) => isActive ? "isActive" : ""}>
                  <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 gap-1">
                    <PiUserCirclePlus className="text-[18px]" />Sign Up
                  </Button>
                </NavLink>

              </div>
            ) : (
              <div className="relative">
                <div
                  className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
                  onClick={handleClickMyAcc}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <Menu
                  anchorEl={anchorMyAcc}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAcc}
                  onClick={handleCloseMyAcc}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="info">
                        <h3 className="text-[13px] font-[500] leading-5">
                          {userData?.name || localStorage.getItem("userName")}
                        </h3>
                        <p className="text-[12px] font-[400] opacity-70">
                          {userData?.email || localStorage.getItem("userEmail")}
                        </p>
                      </div>
                    </div>
                  </MenuItem>
                  <Devider />
                  <Link to="/profile"><MenuItem onClick={handleCloseMyAcc}><FiUser className='mr-2' /> Profile</MenuItem></Link>
                  <MenuItem onClick={handleCloseMyAcc}><IoSettingsOutline className='mr-2' /> Acoount Setting</MenuItem>
                  <MenuItem onClick={handleCloseMyAcc}><TbWaveSine className='mr-2' /> Activity Log</MenuItem>
                  <Devider />
                  <MenuItem onClick={logout}><MdLogout className='mr-2' /> LogOut</MenuItem>
                </Menu>
              </div>
            )
          }
        </div>
      </header>
    </>
  );
};

export default Header;
