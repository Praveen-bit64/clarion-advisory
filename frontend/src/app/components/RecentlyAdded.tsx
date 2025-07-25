'use client'
import GlobalContainer from "./GlobalContainer";
import { RiFireLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { BsPatchPlus } from "react-icons/bs";
import properties from "@/app/data/propertyData.json"
import { MdArrowOutward } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import Switcher from "./Switcher";
import GlobalModal from "./GlobalModal";
import { CiEdit } from "react-icons/ci";
import { useEditMode } from "../context/EditModeToggle";
import RecentlyAddedEdit from "./EditHomeComponents/RecentlyAddedEdit";
import { useHomeComponentDetails } from "../context/HomeComponentDetails";
import { useListedProperties } from "../context/ListedProperties";
import { TbRulerMeasure } from "react-icons/tb";
import { FaBath, FaHeart } from "react-icons/fa6";
import { IoBed, IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { useLikes } from "../context/LikeContext";

const RecentlyAdded = () => {
    const { isEditMode } = useEditMode();
    const { recentlyadded } = useHomeComponentDetails()
    const { properties } = useListedProperties()
    const { isLiked, toggleLike } = useLikes()
    const [recentProperties, setRecentProperties] = useState(properties)
    const [view, setView] = useState('rent')
    useEffect(() => {
        if (Array.isArray(properties)) {
            const filtered = properties.filter(item => item.propertyType === view)
            const recent = [...filtered].reverse().slice(0, 6)
            setRecentProperties(recent)
        }
    }, [properties, view])

    console.log(properties, 'propertiessd');
    const [isOpen, setIsOpen] = useState(false)

    const memoModal = useMemo(() => (
        <RecentlyAddedEdit isOpen={isOpen} setIsOpen={setIsOpen} />
    ), [isOpen])
    return (
        <div className={`w-full h-auto bg-primary flex justify-center items-center relative ${isEditMode ? 'group' : ''}`}>
            {isOpen && memoModal}
            {isEditMode && <div className="absolute w-full hidden min-h-full bg-primary/30 top-0 left-0 z-9999 group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>}
            <GlobalContainer className=" pb-16">
                <h1 className="lg:text-3xl text-2xl text-slate-50 font-semibold mt-10">{recentlyadded.title}</h1>
                <div className="w-full flex flex-col lg:flex-row justify-between items-center">
                    <h3 className="text-md text-slate-100">{recentlyadded.description}</h3>
                    <div className="flex justify-end items-center gap-3 w-full lg:w-auto py-3 lg:py-0">
                        <button onClick={() => setView('rent')} className={`w-[80px] p-2 rounded-lg border-1 border-slate-50 ${view == 'rent' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-950'}  text-md cursor-pointer`}>For Rent</button>
                        <button onClick={() => setView('sale')} className={`w-[80px] p-2 rounded-lg border-1 border-slate-950 ${view == 'sale' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-950'} text-md cursor-pointer`}>For Sale</button>
                    </div>
                </div>
                <ul className="w-full flex justify-center items-center lg:gap-10 gap-1 flex-wrap mt-5">
                    {recentProperties?.filter(item => item.propertyStatus.toLowerCase() === 'publish')?.map((item, ndx) => {
                        return (
                            <li key={ndx} className="group w-[98%] md:w-[49%] xl:w-[30%] lg:w-[49%] lg:h-[380px] h-[270px] bg-white shadow-lg border-1 border-secondary/40 hover:shadow-xl relative">
                                <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-2 absolute z-99 top-3 left-2 group-hover:top-6 group-hover:opacity-0 duration-300">
                                    <button className="lg:w-[130px] w-[100px] p-1 text-[12px] lg:font-semibold bg-secondary text-white flex justify-center items-center"><BsPatchPlus className="text-white mr-1" />Newly Added</button>
                                    <button className="lg:w-[100px] w-[70px] lg:p-1 p-0 text-[12px] lg:font-semibold bg-slate-950 text-white capitalize">for {item.propertyType}</button>
                                </div>
                                <div className="w-full relative overflow-hidden lg:h-[230px] h-[170px]">
                                    <img
                                        src={item?.thumbnailImage || '/fallback.jpg'}
                                        className="w-full group-hover:scale-110 h-full object-cover transition-all duration-500"
                                        alt="Property"
                                    />
                                    <div className="absolute w-full z-99 bottom-5 right-5 flex justify-end items-center gap-2 mb-[-20px] opacity-0 group-hover:mb-0 group-hover:opacity-100 duration-300">
                                        <button onClick={() => toggleLike(String(item.id))} className="p-2 bg-slate-950 cursor-pointer">{isLiked(String(item.id)) ? <FaHeart fill="red" className="text-rose-500  text-xl" /> : <FaRegHeart className="text-white text-xl" />}</button>
                                        <Link href={item.customSlug ? `/${item.customSlug}?pId=${item?.id}` : `/properties/propertyDetails?pId=${item?.id}`}><button className="p-2 bg-slate-950 cursor-pointer"><IoMdOpen className="text-white text-xl" /></button></Link>
                                    </div>
                                </div>

                                <div className=" w-full lg:h-[150px] h-[100px] bg-white flex justify-center items-start flex-col lg:gap-2 gap-0 lg:px-5 px-1">
                                    <Link href={item.customSlug ? `/${item.customSlug}?pId=${item?.id}` : `/properties/propertyDetails?pId=${item?.id}`}><h2 className="xl:text-lg lg:text-md text-sm xl:h-[50px] lg:h-[40px] h-[50px] font-semibold text-slate-700 cursor-pointer hover:underline overflow-hidden">{item?.title}</h2></Link>
                                    <h4 className="lg:text-sm text-[10px]  text-slate-400 overflow-hidden"><IoLocationOutline className="inline text-xl" />{item?.propertyCity}</h4>
                                    <div className="w-full flex justify-between items-center gap-1.5">
                                        <div className="lg:text-sm text-[10px]">   {item.isBedroomAvailable === '1' && (
                                            <>
                                                <span className="mr-1"><IoBed className="inline mr-1" />{item?.bedrooms}</span>
                                                <span className="mr-1"><FaBath className="inline mr-1" />{item?.bathrooms}</span>
                                            </>
                                        )}
                                            <span><TbRulerMeasure className="inline mr-1" />{item?.propertySize} sqms</span></div>
                                        <span className="lg:w-[150px] w-[100px] lg:h-[40px] h-[25px]  border-1 lg:border-2 border-slate-800 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary duration-500 flex justify-center items-center xl:text-md lg:text-sm text-xs font-semibold"><span className="text-xs mr-1 font-thin">BHD</span>{` ${item?.propertyPrice} ${item?.propertyType == 'rent' ? '/Mon' : ''}`}</span>
                                    </div>
                                </div>

                            </li>
                        )
                    })}
                </ul>
                <div className="w-full flex justify-center items-center py-10 pb-4">
                    <Link href={'/properties'}><button className="lg:text-md text-sm border-2 border-slate-50 text-white duration-200 font-semibold bg-primary p-2 lg:p-4 hover:bg-accent cursor-pointer">See All Properties <MdArrowOutward className=" text-2xl inline-block" /></button></Link>
                </div>
            </GlobalContainer>
        </div>
    );
}

export default RecentlyAdded;