'use client';

import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdCloseFullscreen, MdLogout, MdManageSearch, MdOpenInFull, MdOutlineDashboardCustomize } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import AddNewProperty from "./adminComponents/AddNewProperty";
import OverView from "./adminComponents/OverView";
import ManageListings from "./adminComponents/ManageListings";
import AdminSettings from "./adminComponents/AdminSettings";
import { PiUsersThreeBold } from "react-icons/pi";
import UserList from "./adminComponents/UserList";
import { toast } from "react-toastify";
import AdminEnquiryDashboard from "./adminComponents/AdminEnquiryDashboard";
import { TbMessage2Bolt } from "react-icons/tb";
import { useScreenSize } from "../context/ScreenSizeContext";
import { useRouter } from "next/navigation";
import { useUserDetails } from "../context/UserDetails";

const page = () => {
    const router = useRouter()
    const [sidebar, setSidebar] = useState(true)
    const [view, setView] = useState('overview')
    const { userDetails } = useUserDetails()
    const { isMobile, isTablet, isDesktop, screenSize } = useScreenSize();
    const [allusers, setAllusers] = useState([])
    const getViewCallback = (view: string) => {
        setView(view)
    }
    useEffect(() => {
        if (userDetails) {
            if (!userDetails.userId || userDetails.role !== "admin") {
                router.push("/");
            }
        }
    }, [userDetails]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/authentication/fetchalluser');
                const data = await res.json();
                if (!data.error) {
                    setAllusers(data.users);
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="w-full min-h-screen flex justify-start items-start bg-primary/10">

            {/**Sidebar area*/}
            <div className={` ${sidebar && !isMobile && !isTablet ? 'w-[20%] bg-slate-50' : 'w-[90px] bg-primary/90'}  border-r-[1px] border-slate-200 min-h-screen duration-300 rounded-b-lg pb-5`}>
                <ul className="w-full h-full flex flex-col justify-start items-center gap-5 pt-5">
                    <span onClick={() => setSidebar(!sidebar)} className="w-full flex justify-end items-center pr-3">{!sidebar ? <MdOpenInFull className="text-3xl cursor-pointer text-black" /> : <MdCloseFullscreen className="text-4xl text-slate-600 hover:bg-red-300 rounded-full duration-200 cursor-pointer p-[1px]" />}</span>
                    <h2 className={`text-md text-black font-semibold  w-[80%]`}>Main</h2>
                    <li onClick={() => setView('overview')} className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70 ${view === 'overview' ? '!bg-primary/80 border border-white text-white' : ''} text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><MdOutlineDashboardCustomize className="inline text-2xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>OverView</span></li>
                    <li onClick={() => setView('allusers')} className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70 ${view === 'allusers' ? '!bg-primary/80 border border-white text-white' : ''} text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><PiUsersThreeBold className="inline text-2xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>All Users</span></li>
                    <li onClick={() => setView('enquiries')} className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70 ${view === 'enquiries' ? '!bg-primary/80 border border-white text-white' : ''} text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><TbMessage2Bolt className="inline text-2xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>Enquries</span></li>
                    <h2 className="text-md text-black font-semibold text-start w-[80%]">Manage Listings</h2>
                    <li onClick={() => setView('newproperty')} className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70 ${view === 'newproperty' ? '!bg-primary/80 border border-white text-white' : ''}  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><RiPlayListAddFill className="inline text-2xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>Add New Property</span></li>
                    <li onClick={() => setView('managelistings')} className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70 ${view === 'managelistings' ? '!bg-primary/80 border border-white text-white' : ''} text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><MdManageSearch className="inline text-3xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>Manage Listings</span></li>
                    <h2 className="text-md text-black font-semibold text-start w-[80%]">General</h2>
                    <li onClick={() => setView('settings')} className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70 ${view === 'settings' ? '!bg-primary/80 border border-white text-white' : ''} text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><IoSettingsOutline className="inline text-2xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>Settings</span></li>
                    <li className={`w-[80%] p-4 rounded-md bg-slate-50 font-semibold border-primary/70  text-md text-slate-950 flex justify-start items-center gap-2 hover:bg-primary/80 duration-200 cursor-pointer hover:text-slate-50 hover:border-[1px] hover:border-slate-50`}><MdLogout className="inline text-2xl" /><span className={`${sidebar && !isMobile && !isTablet ? 'block' : 'hidden'}`}>Logout</span></li>
                </ul>
            </div>
            {/**Content Area */}
            <div className="w-[80%] min-h-screen lg:pl-10 pl-2 pb-10 overflow-x-auto custom-scrollbar">
                <div className="w-full flex flex-col justify-center items-start gap-1 pt-10">
                    <h2 className="text-3xl text-slate-800 font-semibold capitalize">Welcome back!</h2>
                    <p className="text-md text-slate-800">Happy to See you Again</p>
                </div>
                {/**Overview Area */}
                {view === 'overview' && <OverView getViewCallback={getViewCallback} />}

                {/**All users Area */}
                {view === 'allusers' && <UserList users={allusers} />}

                {/**Enquirt Area */}
                {view === 'enquiries' && <AdminEnquiryDashboard />}

                {/**Add property */}
                {view === 'newproperty' && <AddNewProperty getViewCallback={getViewCallback} />}

                {/**Manage Listings */}
                {view === 'managelistings' && <ManageListings getViewCallback={getViewCallback} />}

                {/**Settings */}
                {view === 'settings' && <AdminSettings />}

            </div>
        </div>
    );
}

export default page;