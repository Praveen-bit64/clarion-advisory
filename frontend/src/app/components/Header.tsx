'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { VscListSelection } from "react-icons/vsc";
import { useEditMode } from "../context/EditModeToggle";
import { MdCancel, MdEditNote, MdOutlineEditOff } from "react-icons/md";
import { useSiteInfo } from "../context/SiteInfoContext";
import { useUserDetails } from "../context/UserDetails";
import { LuLogOut, LuOctagon } from "react-icons/lu";
import { BiCategoryAlt, BiHeart, BiLocationPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import properties from '@/app/data/propertyData.json'
import { FiLogOut } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { ImPriceTags } from "react-icons/im";
import { BsChevronDoubleRight, BsTypeH1 } from "react-icons/bs";
import { PiBuildingOffice } from "react-icons/pi";
const Header = () => {
    const [sidebar, setSidebar] = useState(false)
    const { isEditMode, toggle } = useEditMode();
    const { userDetails, setUserDetails, setStoredUserId } = useUserDetails()
    const [actionArea, setActionArea] = useState(false)
    const [favView, setFavView] = useState(false)
    const { siteInfo } = useSiteInfo()
    console.log(userDetails, 'siteinfofromheader');

    const logOut = () => {
        toast(
            ({ closeToast }) => (
                <div className="flex flex-col gap-4 p-1">
                    <div className="text-slate-800 font-semibold text-base">
                        Are you sure you want to logout?
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                localStorage.removeItem("userId");
                                setStoredUserId(null);
                                window.location.reload();
                                closeToast();
                            }}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                        >
                            <FiLogOut className="text-base" />
                            Logout
                        </button>

                        <button
                            onClick={closeToast}
                            className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-slate-800 px-4 py-2 rounded-md text-sm font-medium transition"
                        >
                            <MdCancel className="text-base" />
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                className: "rounded-md shadow-lg border border-gray-200 bg-white",
                position: "top-center",
            }
        );
    };

    return (
        <>
            <div className="w-full h-[90px] flex justify-between items-center bg-black border-b-1 border-b-white relative">
                {/* <img src="/hero-banner-home.jpg" className="w-full h-full object-cover object-top hidden lg:block" alt="" /> */}
                <div className="w-full h-full absolute bg-primary/20 top-0 left-0"></div>
                <div className="absolute w-full h-full flex justify-between items-center z-99">
                    <div className="lg:w-[30%] w-full px-10">
                        <div className="lg:w-[200px] w-[150px] h-[70px] overflow-hidden p-1">
                            <img src={`${siteInfo?.siteLogo}`} className="w-full h-full object-cover bg-slate-100 rounded-md" alt={siteInfo?.siteName} />
                        </div>
                    </div>
                    <div className="lg:w-[70%] lg:flex hidden justify-between items-center gap-1">
                        <ul className="w-full flex justify-center items-center gap-10 text-white text-sm font-semibold" >
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/about-us'}>About us</Link></li>
                            <li><Link href={'/properties'}>Properties</Link></li>
                            <li><Link href={'/contact'}>contact</Link></li>
                        </ul>
                        {false ?
                            <div
                                onClick={toggle}
                                className={`relative w-52 h-14 flex items-center rounded-full cursor-pointer transition-all duration-500 shadow-md overflow-hidden
    ${isEditMode ? 'bg-gradient-to-r from-pink-400 to-orange-400' : 'bg-gradient-to-r from-blue-500 to-indigo-700'}
  `}
                            >
                                {/* Text Container - Improved Alignment */}
                                <div className="relative w-full h-full flex items-center">
                                    {/* ON Text */}
                                    <span
                                        className={`absolute inset-0 flex items-center text-sm ml-[10px] justify-start px-2 text-white font-semibold transition-all duration-500
        ${isEditMode ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}
                                    >
                                        Edit Mode ON
                                    </span>

                                    {/* OFF Text */}
                                    <span
                                        className={`absolute inset-0 flex items-center text-sm mr-[10px] justify-end px-2 text-white font-semibold transition-all duration-500
        ${isEditMode ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}
      `}
                                    >
                                        Edit Mode OFF
                                    </span>
                                </div>

                                {/* Sliding Circle with Icon - Enhanced Visuals */}
                                <div
                                    className={`absolute w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-xl
      transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
      ${isEditMode ? 'left-[calc(100%-52px)]' : 'left-1'}
      ${isEditMode ? 'scale-110' : 'scale-100'}
    `}
                                >
                                    {isEditMode ? (
                                        <MdEditNote className="text-orange-500 transition-transform duration-300 hover:scale-125" />
                                    ) : (
                                        <MdOutlineEditOff className="text-blue-600 transition-transform duration-300 hover:scale-125" />
                                    )}
                                </div>

                                {/* Decorative Pulse Effect (Visible on Active State) */}
                                {isEditMode && (
                                    <div className="absolute inset-0 rounded-full bg-white opacity-0 animate-ping pointer-events-none"></div>
                                )}
                            </div>
                            :
                            !userDetails.userId ? <div className="w-[60%] flex justify-center items-end">
                                <Link href="/Login">
                                    <button className="w-[120px] p-2 text-md font-mono font-semibold bg-secondary/20 border border-slate-50 text-white cursor-pointer hover:shadow-md duration-200 shadow-white/50">Login</button>

                                </Link>
                            </div>
                                : <div className="w-[60%] flex justify-center items-center gap-1 relative z-999">
                                    {/**Action area */}
                                    <div className={`absolute bg-slate-200 w-[40%] h-[150px]  z-999 ${actionArea ? 'top-14 opacity-100' : 'top-12 opacity-0'} duration-200`}>
                                        <ul className={`${actionArea ? 'flex' : 'hidden'} w-full h-full  justify-start items-start px-3 py-5 gap-3 flex-col`}>
                                            <li
                                                onClick={() => {
                                                    setFavView(true),
                                                        setActionArea(false)
                                                }}
                                                className="w-full flex justify-start items-center text-md gap-2 cursor-pointer"><BiHeart className="inline text-2xl text-rose-400" />Favorites</li>
                                            <li className="w-full flex justify-start items-center text-md gap-2 cursor-pointer" onClick={logOut}><LuLogOut className="inline text-2xl text-primary " />Logout</li>
                                            <li className="w-full h-full flex justify-center items-center text-sm border border-red-400 bg-red-100 text-red-400 text-center cursor-pointer">Delete Accout</li>
                                        </ul>
                                    </div>
                                    <span className={`w-5 h-5 bg-slate-200 rotate-45 relative  left-1/4 ${actionArea ? 'top-9 opacity-100' : 'top-7 opacity-0'} duration-50`}></span>


                                    {/**user profile */}
                                    <span onClick={() => setActionArea(!actionArea)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary"><img className="w-full h-full object-cover" src={userDetails?.profile ?? '/user-profile-fallback.jpg'} /></span>
                                    <h5 onClick={() => setActionArea(!actionArea)} className="font-mono text-md text-slate-50 cursor-pointer">{userDetails.name}</h5><span className="w-2.5 h-2.5 bg-secondary rounded-full p-1"></span>
                                </div>

                        }
                    </div>
                    <VscListSelection onClick={() => setSidebar(true)} className="absolute right-6 top-6 text-4xl text-slate-50 lg:hidden" />
                </div>
                {/**favorite area */}
                <div className={`absolute  ${favView ? 'opacity-100 w-[30%] p-5' : 'w-0'} duration-200 bg-slate-800  border-slate-50 top-23 z-9999 right-0 min-h-screen  `}>
                    <div className={`w-full ${favView ? 'flex' : 'hidden'} justify-between items-center p-2 `}>
                        <BsChevronDoubleRight onClick={() => setFavView(false)} className="text-2xl  text-rose-600" />
                        <h4 className="text-xl text-white uppercase mr-3">Your Favorites</h4>
                    </div>
                    <ul className="w-full flex flex-col justify-start items-start gap-2 h-screen overflow-y-auto custom-scrollbar">
                        {properties.length > 0 ? properties.slice(0, 7).map((property, ndx) => {
                            return (
                                <li key={ndx} className="w-[99%] flex justify-start items-center gap-2 border border-slate-100 py-3 px-2 bg-slate-600 hover:bg-slate-500 duration-200 cursor-pointer"><img className="w-[30%] min-h-[80px] object-cover rounded-lg" src={property.image} alt={property.title} />
                                    <div className="w-[68%]  flex flex-col justify-start items-start gap-2">
                                        <h4 className="w-full text-md text-white">{property.title}</h4>
                                        <h4 className="w-full text-sm font-mono text-white"><CiLocationOn className="inline text-lg mr-1" />{property.location}</h4>
                                        <h4 className="w-full text-sm font-mono text-white"><ImPriceTags className="inline text-lg mr-1" />{property.price}</h4>
                                        <h4 className="w-full text-sm font-mono text-white"><PiBuildingOffice className="inline text-lg mr-1" />{property.propertyType} <span className="w-full p-1 bg-secondary text-xs font-mono">{property.saleType}</span></h4>
                                    </div>
                                </li>
                            )
                        }) : <p className="w-full h-full mt-6 text-center text-white font-mono">Nothing in you Wishlist</p>}
                    </ul>
                </div>
            </div>
            {<div className={` h-screen bg-secondary/95 z-999 border-r-2 border-b-2  top-0 left-0 rounded-br-full fixed ${sidebar ? 'w-3/4 border-white/70' : 'w-0'} duration-300`}>
                <GrClose onClick={() => setSidebar(false)} className="absolute right-5 top-5 text-2xl text-red-500 bg-white" />
                {<ul className={` h-full ${sidebar ? 'w-full opacity-100' : 'opacity-0'} duration-300 flex justify-start items-center gap-10 text-white text-xl  flex-col mt-20`} >
                    <li className="">Home</li>
                    <li className="">About us</li>
                    <li className="">Properties</li>
                    <li className="">contact</li>
                </ul>}
            </div>}
        </>
    );
}

export default Header;