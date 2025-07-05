'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { VscListSelection } from "react-icons/vsc";
import { useEditMode } from "../context/EditModeToggle";
import { MdEditNote, MdOutlineEditOff } from "react-icons/md";
import { useSiteInfo } from "../context/SiteInfoContext";
const Header = () => {
    const [sidebar, setSidebar] = useState(false)
    const { isEditMode, toggle } = useEditMode();

    const { siteInfo } = useSiteInfo()
    console.log(siteInfo, 'siteinfofromheader');

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
                    </div>
                    <VscListSelection onClick={() => setSidebar(true)} className="absolute right-6 top-6 text-4xl text-slate-50 lg:hidden" />
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