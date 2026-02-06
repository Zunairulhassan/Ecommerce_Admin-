import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { RxBarChart } from "react-icons/rx";
import { GoGift } from "react-icons/go";
import { IoStatsChartSharp } from "react-icons/io5";
import { PiChartPieSlice } from "react-icons/pi";
import { GiSpookyHouse } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
const DashBoardBoxes = () => {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <GoGift className="text-[40px] text-[#3872fa]"/>
                    <div className="info w-[60%]">
                        <h3 className='text-[15px]'>New Orders</h3>
                        <b>1,390</b>
                    </div>
                    <IoStatsChartSharp className="text-[50px] text-[#3872fa]"/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <PiChartPieSlice className="text-[40px] text-[#10b981]"/>
                    <div className="info w-[60%]">
                        <h3 className='text-[15px]'>Sales</h3>
                        <b>$57,890</b>
                    </div>
                    <RxBarChart className="text-[50px] text-[#10b981]"/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <GiSpookyHouse className="text-[40px] text-[#7928ca]"/>
                    <div className="info w-[60%]">
                        <h3 className='text-[15px]'>Revenue</h3>
                        <b>$12,390</b>
                    </div>
                    <IoStatsChartSharp className="text-[50px] text-[#7928ca]"/>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="box p-5 cursor-pointer bg-white  hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <MdOutlineProductionQuantityLimits className="text-[30px] text-[#244eb1]"/>
                    <div className="info w-[60%]">
                        <h3 className='text-[15px]'>Total Products</h3>
                        <b>1,390</b>
                    </div>
                    <IoStatsChartSharp className="text-[50px] text-[#244eb1]"/>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default DashBoardBoxes;
