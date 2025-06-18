import GlobalContainer from "./GlobalContainer";
import { RiFireLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { BsPatchPlus } from "react-icons/bs";
import properties from "@/app/data/propertyData.json"
import { MdArrowOutward } from "react-icons/md";

const RecentlyAdded = () => {
    return (
        <div className="w-full h-auto bg-primary flex justify-center items-center">
            <GlobalContainer className="py-10 pb-16">
                <h1 className="text-3xl text-slate-50 font-semibold mt-10">Explore Our Recent Listings</h1>
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-md text-slate-100">Explore our recently added properties – Trending at the moment!</h3>
                    <div className="flex justify-end items-center gap-3">
                        <button className="w-[80px] p-2 rounded-lg border-1 border-slate-50 bg-slate-50 text-slate-800 text-md cursor-pointer">For Rent</button>
                        <button className="w-[80px] p-2 rounded-lg border-1 border-slate-50 bg-primary text-slate-50 text-md cursor-pointer">For Sale</button>
                    </div>
                </div>
                <ul className="w-full flex justify-center items-center gap-10 flex-wrap mt-5">
                    {properties?.slice(0, 8).map((item, ndx) => {
                        return (
                            <li key={ndx} className="group w-[22%] h-[380px] bg-white shadow-lg border-1 border-secondary/40 rounded-md hover:shadow-xl relative">
                                <div className="w-full flex justify-start items-center gap-2 absolute z-99 top-3 left-2 group-hover:top-6 group-hover:opacity-0 duration-300">
                                    <button className="w-[130px] p-1 text-sm font-semibold bg-secondary text-white flex justify-center items-center"><BsPatchPlus className="text-white mr-1" />Newly Added</button>
                                    <button className="w-[100px] p-1 text-sm font-semibold bg-slate-950 text-white">for Sale</button>
                                </div>
                                <div className="w-full relative overflow-hidden h-[230px] rounded-md">
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

                                <div className=" w-full h-[150px] bg-white flex justify-center items-start flex-col gap-2 px-5">
                                    <h2 className="text-md h-[50px] font-semibold text-slate-700 cursor-pointer hover:underline overflow-hidden">{item?.title}</h2>
                                    <h4 className="text-sm  text-slate-400 overflow-hidden">{item?.location}</h4>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-sm">12</div>
                                        <span className="w-[150px] h-[40px] p-4 border-2 border-slate-800 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary duration-500 flex justify-center items-center text-md font-semibold"> $ 1900/mon</span>
                                    </div>
                                </div>

                            </li>
                        )
                    })}
                </ul>
                <div className="w-full flex justify-center items-center py-10 pb-4">
                    <button className="text-md border-2 border-slate-50 text-white duration-200 font-semibold bg-primary p-4 hover:bg-accent cursor-pointer">See All Properties <MdArrowOutward className=" text-2xl inline-block" /></button>
                </div>
            </GlobalContainer>
        </div>
    );
}

export default RecentlyAdded;