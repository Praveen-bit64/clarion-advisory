'use client'

import GlobalContainer from "./GlobalContainer";
import { MdArrowOutward } from "react-icons/md";
import properties from "@/app/data/propertyData.json"
import { RiFireLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { CiEdit, CiLocationOff } from "react-icons/ci";
import GlobalModal from "./GlobalModal";
import { useEffect, useMemo, useState } from "react";
import Switcher from "./Switcher";
import { useEditMode } from "../context/EditModeToggle";
import { useListedProperties } from "../context/ListedProperties";
import Link from "next/link";
import { IoBed, IoLocationOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { useUserDetails } from "../context/UserDetails";
import Featured_ListingsEdit from "./EditHomeComponents/Featured_ListingsEdit";
import { useHomeComponentDetails } from "../context/HomeComponentDetails";
import { useLikes } from "../context/LikeContext";


const Featured_Listings = () => {
    const { isEditMode } = useEditMode();
    const { userDetails } = useUserDetails()
    const [isOpen, setIsOpen] = useState(false)
    const { properties } = useListedProperties()
    const { isLiked, toggleLike } = useLikes()
    const [featureView, setFeatureView] = useState('rent')
    useEffect(() => {
        if (properties.length > 0) {
            setFeaturedProperties(properties.filter(item => item.featureTag === 'Featured' || item.featureTag === "Trending" || item.featureTag === 'New').filter(item => item.propertyType === featureView).slice(0, 6))
        }
    }, [properties, featureView])
    const [featuredProperties, setFeaturedProperties] = useState(properties)
    const { featured_listings } = useHomeComponentDetails()
    console.log(properties, featuredProperties, 654635);

    const memoModal = useMemo(() => (
        <Featured_ListingsEdit isOpen={isOpen} setIsOpen={setIsOpen} />
    ), [isOpen])

    return (
        <div className={`w-full h-auto bg-slate-200 flex justify-center items-center relative ${userDetails.role === 'admin' && isEditMode ? 'group' : ''}`}>
            {isOpen && memoModal}
            {isEditMode && <div className={`absolute w-full ${userDetails.role === 'admin' && isEditMode ? 'group-hover:flex' : ''} hidden min-h-full bg-primary/30 top-0 left-0 z-9999  justify-center items-start border-4 border-rose-500`}>
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>}
            <GlobalContainer>
                <div className="w-full h-auto min-h-[200px] py-5">
                    <h1 className="lg:text-3xl text-2xl text-slate-600 font-semibold mt-10">{featured_listings.title}</h1>
                    <div className="w-full flex flex-wrap lg:flex-row flex-col justify-between items-center gap-4">
                        <h3 className="text-md text-slate-500">{featured_listings.description}</h3>
                        <div className="w-full lg:w-auto flex justify-end items-center gap-3">
                            <button onClick={() => setFeatureView('rent')} className={`w-[80px] p-2 rounded-lg border-1 border-slate-50 ${featureView == 'rent' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-950'}  text-md cursor-pointer`}>For Rent</button>
                            <button onClick={() => setFeatureView('sale')} className={`w-[80px] p-2 rounded-lg border-1 border-slate-950 ${featureView == 'sale' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-950'} text-md cursor-pointer`}>For Sale</button>
                        </div>
                    </div>
                    <ul className="w-full flex justify-center items-center gap-10 flex-wrap mt-5">
                        {featuredProperties?.filter(item => item.propertyStatus.toLowerCase() === 'publish')?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="group lg:w-[30%] w-full lg:h-[480px] h-[420px] bg-white shadow-lg border-1 border-secondary/40 rounded-md hover:shadow-xl relative">
                                    <div className="w-full flex justify-start items-center gap-2 absolute z-99 top-3 left-2 group-hover:top-6 group-hover:opacity-0 duration-300">
                                        {item?.featureTag !== 'false' && <button className={`w-[100px] p-1 text-sm font-semibold  text-white flex justify-center items-center ${item?.featureTag == 'Featured' ? 'bg-secondary' : item?.featureTag == 'New' ? 'bg-primary' : item?.featureTag == 'Trending' ? 'bg-amber-600' : ''} border border-white`}><RiFireLine className="text-white mr-1 " />{item?.featureTag}</button>}
                                        <button className="w-[100px] p-1 text-sm font-semibold bg-teal-600 text-white border border-white">for {item?.propertyType == 'sale' ? 'Sale' : "Rent"}</button>
                                    </div>
                                    <div className="w-full relative overflow-hidden lg:h-[300px] h-[270px]">
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

                                    <div className=" w-full lg:h-[180px] h-[180px] bg-white flex justify-center items-start flex-col gap-2 px-5">
                                        <Link href={item.customSlug ? `/${item.customSlug}?pId=${item?.id}` : `/properties/propertyDetails?pId=${item?.id}`}> <h2 className="lg:text-lg text-md lg:h-[50px] h-[40px] font-semibold text-slate-700 cursor-pointer hover:underline overflow-hidden">{item?.title}</h2></Link>
                                        <h4 className="text-sm  text-slate-400 overflow-hidden"><IoLocationOutline className="inline text-xl" />{item?.propertyCity}</h4>
                                        <div className="w-full flex justify-between items-center">
                                            <div className="w-full flex justify-start items-center flex-wrap gap-1">
                                                {item.isBedroomAvailable === '1' && (
                                                    <>
                                                        <span><IoBed className="inline mr-1" />{item?.bedrooms}</span>
                                                        <span><FaBath className="inline mr-1" />{item?.bathrooms}</span>
                                                    </>
                                                )}
                                                <span><TbRulerMeasure className="inline mr-1" />{item?.propertySize} sqms</span>
                                            </div>

                                            <span className="lg:w-[210px] w-[250px] lg:h-[50px] h-[40px] border-2 border-slate-800 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary duration-500 flex justify-center items-center lg:text-md text-sm font-semibold"><span className="text-xs mr-1 font-thin">BHD</span>{` ${item?.propertyPrice} ${item?.propertyType == 'rent' ? '/Mon' : ''}`}</span>
                                        </div>
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                    <div className="w-full flex justify-center items-center lg:py-10 py-12 pb-4">
                        <Link href={'/properties'}> <button className="text-md  text-white duration-200 font-semibold bg-accent lg:p-4 p-2 hover:bg-primary cursor-pointer">See All Properties <MdArrowOutward className=" text-2xl inline-block" /></button></Link>
                    </div>
                </div>
            </GlobalContainer>
        </div>
    );
}

export default Featured_Listings;