import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { RxDashboard } from "react-icons/rx";
import { IoImagesOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegCircleUser, FaAngleDown } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { CgShoppingBag } from "react-icons/cg";
import { Collapse } from "@mui/material";
import { useContext, useState } from "react";
import { MyContext } from "../../MyContext";


const SideBar = () => {

    const [subMenuIndex, setSubMenuIndex] = useState(null);
    const toggleSubMenu = (index) => {
        setSubMenuIndex(prev => (prev === index ? null : index));
    };

    const context = useContext(MyContext)
    return (
        <div className={`sidebar fixed top-0 left-0 bg-[#fff] h-full ${context.isSidebarOpen ? 'w-64' : 'w-0'
            } border-r border-[rgba(0,0,0,0.1)] px-4`}>
            <div className="py-2 w-full">
                <Link to="/">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg28TIT_nfkkO9IgbiA2ptw36x_-8OjSCrgA277IeGjDKFmwTOaMl1PNOBUQN00lRNFuM&usqp=CAU"
                        alt=""
                        className="w-[120px]"
                    />
                </Link>
            </div>

            <ul className="mt-4">
                <li>
                    <Link to="/">
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4">
                            <RxDashboard className="text-[18px]" />
                            <span>Dashboard</span>
                        </Button>
                    </Link>
                </li>

                {/* Home Slides Submenu */}
                <li>
                    <Button
                        onClick={() => toggleSubMenu(0)}
                        className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4"
                    >
                        <IoImagesOutline className="text-[18px]" />
                        <span>Home Slides</span>
                        <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                            <FaAngleDown className={`transition-all ${subMenuIndex === 0 ? 'rotate-180' : ''}`} />
                        </span>
                    </Button>
                    <Collapse in={subMenuIndex === 0}>
                        <ul>
                            <li>
                                <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start !text-[13px] !font-[400] flex gap-3" onClick={() => context.setIsOpenFullScreen({
                                    open: true,
                                    model: 'Add Home Slide'
                                })}>
                                    <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                    Add Home Banner Slide
                                </Button>
                            </li>
                            <li>
                                <Link to="/home-slides">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start !text-[13px] !font-[400] flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Home Slide List
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>

                <li>
                    <Link to="/Users">
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4">
                            <FaRegCircleUser className="text-[18px]" />
                            <span>Users</span>
                        </Button>
                    </Link>
                </li>

                {/* Products Submenu */}
                <li>
                    <Button
                        onClick={() => toggleSubMenu(1)}
                        className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4"
                    >
                        <RiProductHuntLine className="text-[18px]" />
                        <span>Products</span>
                        <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                            <FaAngleDown className={`transition-all ${subMenuIndex === 1 ? 'rotate-180' : ''}`} />
                        </span>
                    </Button>
                    <Collapse in={subMenuIndex === 1}>
                        <ul>
                            <li>
                                <Link to="/products">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Product List
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3" onClick={() => context.setIsOpenFullScreen({
                                    open: true,
                                    model: "Add Product"
                                })}>
                                    <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                    Product Upload
                                </Button>
                            </li>
                            <li>
                                <Link to="/products/ram">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Add Product RAMS
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/products/weight">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Add Product WEIGHT
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/products/size">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Add Product Size
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>

                {/* Category Submenu */}
                <li>
                    <Button
                        onClick={() => toggleSubMenu(2)}
                        className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4"
                    >
                        <BiCategory className="text-[18px]" />
                        <span>Category</span>
                        <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                            <FaAngleDown className={`transition-all ${subMenuIndex === 2 ? 'rotate-180' : ''}`} />
                        </span>
                    </Button>
                    <Collapse in={subMenuIndex === 2}>
                        <ul>
                            <li>
                                <Link to="/Category/list">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Category List
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3" onClick={() => context.setIsOpenFullScreen({
                                    open: true,
                                    model: 'Add New Category'
                                })}>
                                    <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                    Add a Category
                                </Button>
                            </li>
                            <li>
                                <Link to="/SubCategory/list">
                                    <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3">
                                        <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Sub Category List
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Button className="!pl-6 !w-full !text-[rgba(0,0,0,0.8)] !capitalize !justify-start flex gap-3" onClick={() => context.setIsOpenFullScreen({
                                    open: true,
                                    model: 'Add New Sub Category'
                                })}>
                                    <span className="block w-[7px] h-[7px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                    Add a Sub Category
                                </Button>
                            </li>
                        </ul>
                    </Collapse>
                </li>

                <li>
                    <Link to="/orders">
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4">
                            <CgShoppingBag className="text-[18px]" />
                            <span>Orders</span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/logout">
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] hover:!bg-[#f1f1f1] !font-[500] items-center py-2 px-4">
                            <MdOutlineLogout className="text-[18px]" />
                            <span>LogOut</span>
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
