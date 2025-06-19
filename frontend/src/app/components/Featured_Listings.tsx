import GlobalContainer from "./GlobalContainer";
import { MdArrowOutward } from "react-icons/md";
import properties from "@/app/data/propertyData.json"
import { RiFireLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";


const Featured_Listings = () => {
    console.log(properties);

    return (
        <div className="w-full h-auto bg-slate-100 flex justify-center items-center">
            <GlobalContainer>
                <div className="w-full h-auto min-h-[200px] py-5">
                    <h1 className="lg:text-3xl text-2xl text-slate-600 font-semibold mt-10">Discover Our Featured Listings</h1>
                    <div className="w-full flex flex-wrap lg:flex-row flex-col justify-between items-center gap-4">
                        <h3 className="text-md text-slate-500">Explore our handpicked properties – top-rated homes in the best locations!</h3>
                        <div className="w-full lg:w-auto flex justify-end items-center gap-3">
                            <button className="w-[80px] p-2 rounded-lg border-1 border-slate-50 bg-slate-800 text-white text-md cursor-pointer">For Rent</button>
                            <button className="w-[80px] p-2 rounded-lg border-1 border-slate-950 bg-slate-50 text-slate-950 text-md cursor-pointer">For Sale</button>
                        </div>
                    </div>
                    <ul className="w-full flex justify-center items-center gap-10 flex-wrap mt-5">
                        {properties?.slice(0, 6).map((item, ndx) => {
                            return (
                                <li key={ndx} className="group lg:w-[30%] w-full lg:h-[480px] h-[420px] bg-white shadow-lg border-1 border-secondary/40 rounded-md hover:shadow-xl relative">
                                    <div className="w-full flex justify-start items-center gap-2 absolute z-99 top-3 left-2 group-hover:top-6 group-hover:opacity-0 duration-300">
                                        <button className="w-[100px] p-1 text-sm font-semibold bg-secondary text-white flex justify-center items-center"><RiFireLine className="text-white mr-1" />Featured</button>
                                        <button className="w-[100px] p-1 text-sm font-semibold bg-slate-950 text-white">for Sale</button>
                                    </div>
                                    <div className="w-full relative overflow-hidden lg:h-[300px] h-[270px]">
                                        <img
                                            src={item?.image || '/fallback.jpg'}
                                            className="w-full group-hover:scale-110 h-full object-cover transition-all duration-500"
                                            alt="Property"
                                        />
                                        <div className="absolute w-full z-99 bottom-5 right-5 flex justify-end items-center gap-2 mb-[-20px] opacity-0 group-hover:mb-0 group-hover:opacity-100 duration-300">
                                            <button className="p-2 bg-slate-950 cursor-pointer"><FaRegHeart className="text-white text-xl" /></button>
                                            <button className="p-2 bg-slate-950 cursor-pointer"><IoMdOpen className="text-white text-xl" /></button>
                                        </div>
                                    </div>

                                    <div className=" w-full lg:h-[180px] h-[150px] bg-white flex justify-center items-start flex-col gap-2 px-5">
                                        <h2 className="lg:text-lg text-md lg:h-[50px] h-[40px] font-semibold text-slate-700 cursor-pointer hover:underline overflow-hidden">{item?.title}</h2>
                                        <h4 className="text-sm  text-slate-400 overflow-hidden">{item?.location}</h4>
                                        <div className="w-full flex justify-between items-center">
                                            <div className="">12</div>
                                            <span className="lg:w-[150px] w-[130px] lg:h-[50px] h-[40px] lg:p-4 p-1 border-2 border-slate-800 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary duration-500 flex justify-center items-center lg:text-lg text-md font-semibold"> $ 1900/mon</span>
                                        </div>
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                    <div className="w-full flex justify-center items-center lg:py-10 py-6 pb-4">
                        <button className="text-md  text-white duration-200 font-semibold bg-accent lg:p-4 p-2 hover:bg-primary cursor-pointer">See All Properties <MdArrowOutward className=" text-2xl inline-block" /></button>
                    </div>
                </div>
            </GlobalContainer>
        </div>
    );
}

export default Featured_Listings;