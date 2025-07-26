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
                            <li
                                key={ndx}
                                className="group w-full sm:w-[48%] xl:w-[30%] bg-white shadow-md border border-secondary/20 rounded-lg hover:shadow-xl transition duration-300 overflow-hidden"
                            >
                                <div className="relative w-full h-[200px] sm:h-[240px] xl:h-[200px]">
                                    <img
                                        src={item?.thumbnailImage || '/fallback.jpg'}
                                        alt="Property"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Overlay Buttons */}
                                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                                        <span className="px-2 py-1 text-xs bg-secondary text-white font-medium rounded-md flex items-center">
                                            <BsPatchPlus className="mr-1" /> New
                                        </span>
                                        <span className="px-2 py-1 text-xs bg-slate-800 text-white font-medium rounded-md capitalize">
                                            For {item.propertyType}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <button onClick={() => toggleLike(String(item.id))} className="p-2 bg-white rounded-full shadow">
                                            {isLiked(String(item.id)) ? (
                                                <FaHeart className="text-rose-500 text-lg" />
                                            ) : (
                                                <FaRegHeart className="text-slate-600 text-lg" />
                                            )}
                                        </button>
                                        <Link
                                            href={item.customSlug ? `/${item.customSlug}?pId=${item?.id}` : `/properties/propertyDetails?pId=${item?.id}`}
                                        >
                                            <button className="p-2 bg-white rounded-full shadow">
                                                <IoMdOpen className="text-slate-600 text-lg" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-4 space-y-2">
                                    <Link href={item.customSlug ? `/${item.customSlug}?pId=${item?.id}` : `/properties/propertyDetails?pId=${item?.id}`}>
                                        <h2 className="text-md font-semibold text-slate-800 line-clamp-2 hover:underline">{item.title}</h2>
                                    </Link>
                                    <p className="text-xs text-slate-500 flex items-center">
                                        <IoLocationOutline className="mr-1" /> {item.propertyCity}
                                    </p>
                                    <div className="flex justify-between items-center text-xs text-slate-600">
                                        <div className="flex gap-2 flex-wrap items-center">
                                            {item.isBedroomAvailable === '1' && (
                                                <>
                                                    <span><IoBed className="inline mr-1" />{item.bedrooms}</span>
                                                    <span><FaBath className="inline mr-1" />{item.bathrooms}</span>
                                                </>
                                            )}
                                            <span><TbRulerMeasure className="inline mr-1" />{item.propertySize} sqm</span>
                                        </div>
                                        <span className="bg-secondary text-white text-xs px-3 py-1 rounded-sm font-semibold whitespace-nowrap">
                                            BHD {item.propertyPrice} {item.propertyType === 'rent' ? '/Mon' : ''}
                                        </span>
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