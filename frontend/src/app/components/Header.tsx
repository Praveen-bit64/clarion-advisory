'use client'
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { VscListSelection } from "react-icons/vsc";
const Header = () => {
    const [sidebar, setSidebar] = useState(false)
    return (
        <>
            <div className="w-full h-[90px] flex justify-between items-center bg-black border-b-1 border-b-white relative">
                {/* <img src="/hero-banner-home.jpg" className="w-full h-full object-cover object-top hidden lg:block" alt="" /> */}
                <div className="w-full h-full absolute bg-primary/20 top-0 left-0"></div>
                <div className="absolute w-full h-full flex justify-between items-center z-99">
                    <div className="lg:w-[30%] w-full px-10">
                        <img src="/clarion-logo.png" className="lg:w-[200px] w-[150px] bg-slate-100 rounded-md" alt="" />
                    </div>
                    <div className="lg:w-[70%] lg:block hidden">
                        <ul className="w-full flex justify-center items-center gap-10 text-white text-sm font-semibold" >
                            <li>Home</li>
                            <li>About us</li>
                            <li>Properties</li>
                            <li>contact</li>
                        </ul>
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