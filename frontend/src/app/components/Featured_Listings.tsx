'use client'

import GlobalContainer from "./GlobalContainer";
import { MdArrowOutward } from "react-icons/md";
import properties from "@/app/data/propertyData.json"
import { RiFireLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import GlobalModal from "./GlobalModal";
import { useMemo, useState } from "react";
import Switcher from "./Switcher";


const Featured_Listings = () => {
    const [isEnabled, setIsEnabled] = useState(true)
    const enables = (value: boolean) => {
        setIsEnabled(value)
    }
    console.log(properties);
    const [isOpen, setIsOpen] = useState(false)
    const EditComponent = (props: { isOpen: boolean, setIsOpen: any }) => {
        const { isOpen, setIsOpen } = props
        return (
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                    <div className="w-full flex justify-start items-start flex-col">
                        <label htmlFor="title" className="text-lg font-semibold">Section Visibility</label>
                        <Switcher enables={enables} />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label htmlFor="title" className="text-lg font-semibold">Title</label>
                        <input type="text" placeholder="Title" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label htmlFor="title" className="text-lg font-semibold">Description</label>
                        <input type="text" placeholder="Description" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                    </div>
                    <div className="w-full flex justify-end items-end pt-3 gap-2">
                        <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                        <button className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                    </div>
                </div>
            </GlobalModal>
        )
    }
    const memoModal = useMemo(() => (
        <EditComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    ), [isOpen])
    return (
        <div className="w-full h-auto bg-slate-200 flex justify-center items-center relative group">
            {isOpen && memoModal}
            <div className="absolute w-full hidden min-h-full bg-primary/30 top-0 left-0 z-9999 group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>
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