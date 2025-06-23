'use client';
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { MdCloseFullscreen, MdDeleteOutline, MdLogout, MdManageSearch, MdOpenInFull, MdOutlineDashboardCustomize } from "react-icons/md";
import { RiEdit2Line, RiPlayListAddFill } from "react-icons/ri";
import { TbHomeStar } from "react-icons/tb";
import OverView from "./adminComponents/OverView";
import { BiSearch } from "react-icons/bi";
import propertyData from '@/app/data/propertyData.json'
import ManageListings from "./adminComponents/ManageListings";


const page = () => {
    const [sidebar, setSidebar] = useState(true)
    const [formNav, setFormNav] = useState(0)
    return (
        <div className="w-full min-h-screen flex justify-start items-start bg-primary/10">
            {/**Sidebar area*/}
            <div className={` ${sidebar ? 'w-[400px] bg-slate-50' : 'w-[90px] bg-primary/90'}  border-r-[1px] border-slate-200 min-h-screen duration-300 overflow-y-auto custom-scrollbar rounded-b-lg pb-5`}>
                <ul className="w-full h-full flex flex-col justify-start items-center gap-5 pt-5">
                    <span onClick={() => setSidebar(!sidebar)} className="w-full flex justify-end items-center pr-3">{!sidebar ? <MdOpenInFull className="text-3xl cursor-pointer text-black" /> : <MdCloseFullscreen className="text-4xl text-slate-600 hover:bg-red-300 rounded-full duration-200 cursor-pointer p-[1px]" />}</span>
                    <h2 className={`text-md text-black font-semibold  w-[80%]`}>Main</h2>
                    <li className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><MdOutlineDashboardCustomize className="inline text-2xl" /><span className={`${sidebar ? 'block' : 'hidden'}`}>OverView</span></li>
                    <h2 className="text-md text-black font-semibold text-start w-[80%]">Manage Listings</h2>
                    <li className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><RiPlayListAddFill className="inline text-2xl" /><span className={`${sidebar ? 'block' : 'hidden'}`}>Add New Property</span></li>
                    <li className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><MdManageSearch className="inline text-3xl" /><span className={`${sidebar ? 'block' : 'hidden'}`}>Manage Listings</span></li>
                    <h2 className="text-md text-black font-semibold text-start w-[80%]">General</h2>
                    <li className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><IoSettingsOutline className="inline text-2xl" /><span className={`${sidebar ? 'block' : 'hidden'}`}>Settings</span></li>
                    <li className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><MdLogout className="inline text-2xl" /><span className={`${sidebar ? 'block' : 'hidden'}`}>Logout</span></li>
                </ul>
            </div>
            {/**Content Area */}
            <div className="w-full min-h-screen pl-10 pb-10">
                <div className="w-full flex flex-col justify-center items-start gap-1 pt-10">
                    <h2 className="text-3xl text-slate-800 font-semibold capitalize">Welcome back, Praveen!</h2>
                    <p className="text-md text-slate-800">Happy to See you Again</p>
                </div>
                {/**Overview Area */}
                {/* <OverView /> */}

                {/**Add property */}
                <div className=" w-full flex justify-center items-center flex-col">
                    {/**Navigation */}
                    <div className="w-[500px] flex justify-center items-center my-3 mb-10 relative duration-200 transition-all ease-linear">
                        <span className="w-[30px] h-[30px] p-2 rounded-full bg-green-600 text-xl text-white flex justify-center items-center font-semibold">1</span>
                        <span className={`w-[140px] h-[4px] ${formNav > 0 ? 'bg-green-600' : 'bg-slate-400'} duration-200 transition-all ease-linear`}></span><span className="absolute top-10 left-[-20px] font-mono">Description</span>
                        <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 0 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>2</span>
                        <span className={`w-[140px] h-[4px] ${formNav > 1 ? 'bg-green-600' : 'bg-slate-400'} duration-200 transition-all ease-linear`}></span><span className="absolute top-10 left-[110px] font-mono">Media</span>
                        <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 1 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>3</span>
                        <span className={`w-[140px] h-[4px] ${formNav > 2 ? 'bg-green-600' : 'bg-slate-400'}`}></span><span className="absolute top-10 left-[220px] font-mono">Location</span>
                        <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 2 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>4</span>
                        <span className={`w-[140px] h-[4px] ${formNav > 3 ? 'bg-green-600' : 'bg-slate-400'}`}></span><span className="absolute top-10 left-[345px]  font-mono">Detail</span>
                        <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 3 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>5</span><span className="absolute top-10 left-[455px] font-mono">Amenities</span>
                    </div>
                    {/**Form area */}
                    <div className="bg-white rounded-xl  w-[60%] p-5 py-10">

                        {/**4th section */}
                        <div className="w-full"></div>

                        {/**button options */}
                        <div className="w-full flex justify-between items-center mt-3">
                            <button onClick={() => setFormNav(formNav - 1)} className="w-[100px] p-2 bg-primary text-white cursor-pointer hover:bg-primary/80 duration-200">Back </button>
                            <button onClick={() => setFormNav(formNav + 1)} className="w-[100px] p-2 bg-green-800 text-white cursor-pointer hover:bg-green-700 duration-200">Next </button>
                        </div>
                    </div>
                </div>

                {/**Manage Listings */}
                {/* <ManageListings /> */}

            </div>
        </div>
    );
}

export default page;