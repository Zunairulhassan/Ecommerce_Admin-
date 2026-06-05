import DashBoardBoxes from "../../Components/DashBoardBoxes/DashBoardBoxes";
import Checkbox from '@mui/material/Checkbox';
import { FaPlus } from "react-icons/fa";
import Process from '../../Components/ProgressBar/Progress'
import Button from "@mui/material/Button";
import Shop from '../../images/shop.png';
import Bedge from '../../Components/Bedge/Bedge'
import { FaAngleDown } from "react-icons/fa6";
import React, { useState, PureComponent, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import Pagination from '@mui/material/Pagination';
// import Tooltip from "@mui/material/Tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from "../../MyContext";

import { useContext } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const DashBoard = () => {
    const [isOpenOrderProducts, setIsOpenOrderProducts] = useState(false);
    const [chart1Data, setChart1Data] = useState([
        {
            name: 'JAN',
            Total_Users: 4000,
            Total_Sales: 2400,
            amt: 2400,
        },
        {
            name: 'FEB',
            Total_Users: 3000,
            Total_Sales: 1398,
            amt: 2210,
        },
        {
            name: 'MARC',
            Total_Users: 2000,
            Total_Sales: 9800,
            amt: 2290,
        },
        {
            name: 'APRIL',
            Total_Users: 2780,
            Total_Sales: 3908,
            amt: 2000,
        },
        {
            name: 'JUN',
            Total_Users: 1890,
            Total_Sales: 4800,
            amt: 2181,
        },
        {
            name: 'JUL',
            Total_Users: 3490,
            Total_Sales: 4300,
            amt: 2100,
        },
        {
            name: 'AUG',
            Total_Users: 2390,
            Total_Sales: 3800,
            amt: 2500,
        },
        {
            name: 'SEP',
            Total_Users: 3490,
            Total_Sales: 5200,
            amt: 2100,
        },
        {
            name: 'OCT',
            Total_Users: 3490,
            Total_Sales: 4100,
            amt: 2100,
        },
        {
            name: 'NOV',
            Total_Users: 3490,
            Total_Sales: 3900,
            amt: 2100,
        },
        {
            name: 'DEC',
            Total_Users: 3490,
            Total_Sales: 3500,
            amt: 2100,
        },
    ])
    const context = useContext(MyContext);

    const isShowOrderProducts = (index) => {
        if (isOpenOrderProducts === index) {
            setIsOpenOrderProducts(null);
        } else {
            setIsOpenOrderProducts(index);
        }
    }
    const date = new Date();
    const hour = date.getHours();

    return (
        <>
            <div className="w-full px-5 py-2 bg-[#fff] border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
                <div className="info">
                    <h1 className="font-bold text-[35px] leading-10 mb-3">{hour >= 12 ? hour >= 16 ? "Good Morning" : "Good AfterNoon" : "Good Night"} Cameron</h1>
                    <p>Here's What happening on your store today. See the statistics at once</p>
                    <br />
                    <Button className="btn-blue !capitalize" onClick={() => context.setIsOpenFullScreen({
                        open: true,
                        model: "Add Product"
                    })}><FaPlus /> Add Products</Button>
                </div>
                <img src={Shop} alt="" className="w-[300]" />
            </div>
            <DashBoardBoxes />
            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className="text-[18px] font-[600]">Products</h2>
                </div>
                <div className="overflow-x-auto mt-4 relative pb-5">
                    <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></th>
                                <th className="px-2 py-3 whitespace-nowrap">PRODUCTS</th>
                                <th className="px-6 py-3 whitespace-nowrap">CATEGORY</th>
                                <th className="px-6 py-3 whitespace-nowrap">SUB CATEGORY</th>
                                <th className="px-6 py-3 whitespace-nowrap">PRICE</th>
                                <th className="px-6 py-3 whitespace-nowrap">SALES</th>
                                <th className="px-6 py-3 whitespace-nowrap">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-2"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></td>
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/products/fashion-103">
                                                <img src="https://api.spicezgold.com/download/file_1734528437173_conbre-multiplexr2-pro-upgraded-hd-smart-wifi-wireless-ip-cctv-security-camera-night-vision-2-way-audio-support-64-gb-micro-sd-card-slot-product-images-orvnkptvicq-p594015290-0-202304040248.webp" alt="" className="w-full group-hover:scale-105 transition-all" />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] leading-4 text-[12px] hover:text-primary"><Link to="/products/fashion-103">Join our email subscription now to get updates on promotions and coupons.</Link></h3>
                                            <span>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    Clothes
                                </td>
                                <td className="py-6 px-2">
                                    Women
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="oldPrice text-primary text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>sale</p>
                                    <Process value={100} type="success" />
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="View Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="Detail Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></td>
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/products/fashion-103">
                                                <img src="https://api.spicezgold.com/download/file_1734529876638_buynewtrend-women-maroon-cotton-blend-top-product-images-rvb22aqlk7-1-202201130044.jpg" alt="" className="w-full group-hover:scale-105 transition-all" />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] leading-4 text-[12px] hover:text-primary"><Link to="/products/fashion-103">Join our email subscription now to get updates on promotions and coupons.</Link></h3>
                                            <span>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    Clothes
                                </td>
                                <td className="py-6 px-2">
                                    Women
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="oldPrice text-primary text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>sale</p>
                                    <Process value={40} type="warning" />
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="View Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="Detail Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}

                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="px-6 py-2"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></td>
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/products/fashion-103">
                                                <img src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp" alt="" className="w-full group-hover:scale-105 transition-all" />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] leading-4 text-[12px] hover:text-primary"><Link to="/products/fashion-103">Join our email subscription now to get updates on promotions and coupons.</Link></h3>
                                            <span>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    Clothes
                                </td>
                                <td className="py-6 px-2">
                                    Women
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="oldPrice text-primary text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>sale</p>
                                    <Process value={80} type="success" />
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="View Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="Detail Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></td>
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/products/fashion-103">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtlKH59974RIwxIptfvdE0lS0OyIka5A55aLueC_CqtBoLf2t_hRDVCHJ44Vq7xbuK5o&usqp=CAU" alt="" className="w-full group-hover:scale-105 transition-all" />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] leading-4 text-[12px] hover:text-primary"><Link to="/products/fashion-103">Join our email subscription now to get updates on promotions and coupons.</Link></h3>
                                            <span>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    Clothes
                                </td>
                                <td className="py-6 px-2">
                                    Women
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="oldPrice text-primary text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>sale</p>
                                    <Process value={60} type="error" />
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="View Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="Detail Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}

                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td className="px-6 py-2"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></td>
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/products/fashion-103">
                                                <img src="https://api.spicezgold.com/download/file_1734526702391_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-2-202304131033.webp" alt="" className="w-full group-hover:scale-105 transition-all" />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] leading-4 text-[12px] hover:text-primary"><Link to="/products/fashion-103">Join our email subscription now to get updates on promotions and coupons.</Link></h3>
                                            <span>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    Clothes
                                </td>
                                <td className="py-6 px-2">
                                    Women
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="oldPrice text-primary text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>sale</p>
                                    <Process value={40} type="warning" />
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="View Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="Detail Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-2"><div className="W-[60px]"><Checkbox {...label} size="small" /></div></td>
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-4 w-[300px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/products/fashion-103">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjpE-NjZhV8FK7kVj9q8nm7uqA9TYybYO4Ccd_glgMFWSzXiHmEYYZTFEicdS2lBHj660&usqp=CAU" alt="" className="w-full group-hover:scale-105 transition-all" />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] leading-4 text-[12px] hover:text-primary"><Link to="/products/fashion-103">Join our email subscription now to get updates on promotions and coupons.</Link></h3>
                                            <span>Books</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    Clothes
                                </td>
                                <td className="py-6 px-2">
                                    Women
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1 flex-col">
                                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                        <span className="oldPrice text-primary text-[15px] font-[500]">
                                            $58.00
                                        </span>
                                    </div>
                                </td>
                                <td className="py-6 px-2">
                                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234</span>sale</p>
                                    <Process value={80} type="success" />
                                </td>
                                <td className="py-6 px-2">
                                    <div className="flex items-center gap-1">
                                        {/* <Tooltip title="Edit Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="View Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <FaEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}
                                        {/* <Tooltip title="Detail Product" placement="top-start"> */}
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1f] !border !border-[rgba(0,0,0,0.4)] !min-w-[25px] !rounded-full hover:!bg-[#f1f1f1]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                                        </Button>
                                        {/* </Tooltip> */}

                                    </div>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-end mt-4 mb-4 mr-1">
                    <Pagination count={10} color="primary" className="pb-3" />
                </div>
            </div>


            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className="text-[18px] font-[600]">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto mt-4 relative pb-5">
                    <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3">&nbsp;</th>
                                <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
                                <th className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                                <th className="px-6 py-3 whitespace-nowrap">Products</th>
                                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                                <th className="px-6 py-3 whitespace-nowrap">Phone No</th>
                                <th className="px-6 py-3 whitespace-nowrap">Address</th>
                                <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                                <th className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                                <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                                <th className="px-6 py-3 whitespace-nowrap">Order status</th>
                                <th className="px-6 py-3 whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4"><Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]' onClick={() => isShowOrderProducts(0)}>
                                    {
                                        isOpenOrderProducts === 0 ? <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)] rotate-180' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                    }
                                </Button></td>
                                <td className="px-6 py-4 text-primary font-[500]">PAY98765</td>
                                <td className="px-6 py-4 text-primary font-[500]">Wheelchair</td>
                                <td className="px-6 py-4">John Doe</td>
                                <td className="px-6 py-4">+123456789</td>
                                <td className="px-6 py-4">123 Main St, NY</td>
                                <td className="px-6 py-4">10001</td>
                                <td className="px-6 py-4">$250</td>
                                <td className="px-6 py-4">john@example.com</td>
                                <td className="px-6 py-4 text-primary font-[500]">USR123</td>
                                <td className="px-6 py-4"><Bedge status="pending" /></td>
                                <td className="px-6 py-4">2025-08-05</td>
                            </tr>
                            {
                                isOpenOrderProducts === 0 && (
                                    <>
                                        <tr>
                                            <td className='pl-24' colSpan="6">
                                                <div className="overflow-x-auto mt-4">
                                                    <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
                                                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                            <tr>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Id</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Tittle</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Image</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Quantity</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="bg-white border-b">
                                                                <td className="px-6 py-4">123458808089</td>
                                                                <td className="px-6 py-4">akakfjakfjklasnxm,vnzxm,kjdsfklal</td>
                                                                <td className="px-6 py-4"><img src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp" alt="" className='w-[40px] h-[40px]  rounded-md object-cover' /></td>
                                                                <td className="px-6 py-4">1</td>
                                                                <td className="px-6 py-4">1300</td>
                                                                <td className="px-6 py-4">1300</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='bg-[#f1f1f1]' colSpan="12"></td>
                                                            </tr>
                                                            {/* Add more <tr> entries as needed */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='pl-24' colSpan="6">
                                                <div className="overflow-x-auto mt-4">
                                                    <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
                                                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                            <tr>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Id</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Tittle</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Image</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Quantity</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="bg-white border-b">
                                                                <td className="px-6 py-4">123458808089</td>
                                                                <td className="px-6 py-4">akakfjakfjklasnxm,vnzxm,kjdsfklal</td>
                                                                <td className="px-6 py-4"><img src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp" alt="" className='w-[40px] h-[40px]  rounded-md object-cover' /></td>
                                                                <td className="px-6 py-4">1</td>
                                                                <td className="px-6 py-4">1300</td>
                                                                <td className="px-6 py-4">1300</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='bg-[#f1f1f1]' colSpan="12"></td>
                                                            </tr>
                                                            {/* Add more <tr> entries as needed */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            {/* Add more <tr> entries as needed */}
                        </tbody>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4"><Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]' onClick={() => isShowOrderProducts(1)}>
                                    {
                                        isOpenOrderProducts === 1 ? <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)] rotate-180' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                    }
                                </Button></td>
                                <td className="px-6 py-4 text-primary font-[500]">PAY98765</td>
                                <td className="px-6 py-4 text-primary font-[500]">Wheelchair</td>
                                <td className="px-6 py-4">John Doe</td>
                                <td className="px-6 py-4">+123456789</td>
                                <td className="px-6 py-4">123 Main St, NY</td>
                                <td className="px-6 py-4">10001</td>
                                <td className="px-6 py-4">$250</td>
                                <td className="px-6 py-4">john@example.com</td>
                                <td className="px-6 py-4 text-primary font-[500]f">USR123</td>
                                <td className="px-6 py-4"><Bedge status="pending" /></td>
                                <td className="px-6 py-4">2025-08-05</td>
                            </tr>
                            {
                                isOpenOrderProducts === 1 && (
                                    <>
                                        <tr>
                                            <td className='pl-24' colSpan="6">
                                                <div className="overflow-x-auto mt-4">
                                                    <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
                                                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                            <tr>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Id</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Tittle</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Image</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Quantity</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="bg-white border-b">
                                                                <td className="px-6 py-4">123458808089</td>
                                                                <td className="px-6 py-4">akakfjakfjklasnxm,vnzxm,kjdsfklal</td>
                                                                <td className="px-6 py-4"><img src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp" alt="" className='w-[40px] h-[40px]  rounded-md object-cover' /></td>
                                                                <td className="px-6 py-4">1</td>
                                                                <td className="px-6 py-4">1300</td>
                                                                <td className="px-6 py-4">1300</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='bg-[#f1f1f1]' colSpan="12"></td>
                                                            </tr>
                                                            {/* Add more <tr> entries as needed */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='pl-24' colSpan="6">
                                                <div className="overflow-x-auto mt-4">
                                                    <table className="w-full min-w-[1000px] text-sm text-left text-gray-500">
                                                        <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                            <tr>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Id</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Product Tittle</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Image</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Quantity</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                <th className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="bg-white border-b">
                                                                <td className="px-6 py-4">123458808089</td>
                                                                <td className="px-6 py-4">akakfjakfjklasnxm,vnzxm,kjdsfklal</td>
                                                                <td className="px-6 py-4"><img src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp" alt="" className='w-[40px] h-[40px]  rounded-md object-cover' /></td>
                                                                <td className="px-6 py-4">1</td>
                                                                <td className="px-6 py-4">1300</td>
                                                                <td className="px-6 py-4">1300</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='bg-[#f1f1f1]' colSpan="12"></td>
                                                            </tr>
                                                            {/* Add more <tr> entries as needed */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            {/* Add more <tr> entries as needed */}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card my-3 shadow-md sm:rounded-lg p-3 py-6 bg-white h-[500px]">
                <div className="flex items-center justify-between px-5 pb-0">
                    <h2 className="text-[18px] font-[600]">Total User & Total Sales</h2>
                </div>
                <div className="flex items-center gap-5 px-5 py-5 pt-0">
                    <span className="flex items-center gap-2">
                        <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
                        Total Users
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="block w-[8px] h-[8px] rounded-full bg-primary"></span>
                        Total Sales
                    </span>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                        data={chart1Data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="none" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" strokeWidth={2} dataKey="Total_Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Total_Users" strokeWidth={2} stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>


        </>
    )
}
export default DashBoard;