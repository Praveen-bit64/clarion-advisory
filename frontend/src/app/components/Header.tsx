'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { VscListSelection } from "react-icons/vsc";
import { useEditMode } from "../context/EditModeToggle";
import { MdCancel, MdEditNote, MdManageAccounts, MdOutlineEditOff } from "react-icons/md";
import { useSiteInfo } from "../context/SiteInfoContext";
import { useUserDetails } from "../context/UserDetails";
import { LuLogOut, LuOctagon } from "react-icons/lu";
import { BiCategoryAlt, BiHeart, BiHeartCircle, BiLocationPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { ImPriceTags } from "react-icons/im";
import { BsChevronDoubleRight, BsTypeH1 } from "react-icons/bs";
import { PiBuildingOffice } from "react-icons/pi";
import { useListedProperties } from "../context/ListedProperties";
import { useLikes } from "../context/LikeContext";
import EditModeToggle from "./EditModeToggle";
const Header = () => {
    const [sidebar, setSidebar] = useState(false)
    const { isEditMode, toggle } = useEditMode();
    const { userDetails, setUserDetails, setStoredUserId } = useUserDetails()
    const [actionArea, setActionArea] = useState(false)
    const [favView, setFavView] = useState(false)
    const { siteInfo } = useSiteInfo()
    const { properties } = useListedProperties();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { likesArr, toggleLike } = useLikes();
    const [favoProps, setFavoProps] = useState<typeof properties>();

    console.log(userDetails, 'siteinfofromheader');

    useEffect(() => {
        if (likesArr && properties) {
            const numericLikesArr = likesArr.map(id => Number(id)); // Convert to numbers
            setFavoProps(properties.filter(prop => numericLikesArr.includes(Number(prop.id))));
        }
    }, [likesArr, properties]);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActionArea(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleDeleteUser = () => {
        if (userDetails.role === 'admin') return toast.info('Admin Account Not Deletable!');

        const handleDelete = async () => {
            try {
                const res = await fetch('/api/authentication/deleteuser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: userDetails.userId?.split('-')[2] }),
                });

                const data = await res.json();

                if (!data.error) {
                    toast.success(data.message || 'User deleted');
                    localStorage.removeItem("userId");
                    setStoredUserId(null);
                    window.location.reload();
                } else {
                    toast.error(data.message || 'There was an error');
                }
            } catch (err) {
                console.error('Delete error:', err);
                toast.error('Something went wrong');
            }
        };

        toast(({ closeToast }) => (
            <div className="flex flex-col items-start gap-3">
                <p className="text-base font-medium text-red-600">Are you sure?</p>
                <p className="text-sm text-gray-700">This action cannot be undone. Your account will be permanently deleted.</p>
                <div className="flex gap-2 mt-2 self-end">
                    <button
                        onClick={closeToast}
                        className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            closeToast?.();
                            handleDelete();
                        }}
                        className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        ), {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        });
    };

    return (
        <>
            <div className="w-full h-[90px] flex justify-between items-center bg-black border-b-1 border-b-white relative">
                {/* <img src="/hero-banner-home.jpg" className="w-full h-full object-cover object-top hidden lg:block" alt="" /> */}
                <div className="w-full h-full absolute bg-primary/20 top-0 left-0"></div>
                <div className="absolute w-full h-full flex justify-between items-center z-99">
                    <div className="lg:w-[30%] w-full px-10">
                        <div className="lg:w-[150px] w-[120px] h-[50px] overflow-hidden p-1">
                            <img src={`${siteInfo?.siteLogo}`} className="w-full h-full object-contain bg-slate-100 rounded-md" alt={siteInfo?.siteName} />
                        </div>
                    </div>
                    <div className="lg:w-[70%] lg:flex hidden justify-between items-center gap-1">
                        <ul className="w-full flex justify-center items-center gap-10 text-white text-sm font-semibold" >
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/about-us'}>About us</Link></li>
                            <li><Link href={'/properties'}>Properties</Link></li>
                            <li><Link href={'/contact'}>contact</Link></li>
                        </ul>

                        {
                            !userDetails.userId ? <div className="w-[60%] flex justify-center items-end gap-1.5">
                                <BiHeartCircle onClick={() => setFavView(!favView)} className="text-[44px] cursor-pointer" color="lightgoldenrodyellow" />
                                <Link href="/Login">
                                    <button className="w-[120px] p-2 text-md font-mono font-semibold bg-secondary/20 border border-slate-50 text-white cursor-pointer hover:shadow-md duration-200 shadow-white/50">Login</button>

                                </Link>
                            </div>
                                : <div ref={dropdownRef} className="w-[60%] flex justify-center items-center gap-1 relative z-999">
                                    {userDetails.role === 'admin' && <EditModeToggle toggle={toggle} isEditMode={isEditMode} />}
                                    {/**Action area */}
                                    <div className={`absolute bg-slate-200 w-[40%] h-[150px]  z-999 ${actionArea ? `top-14  ${userDetails.role === 'admin' ? 'right-2' : ''} opacity-100` : `top-12 ${userDetails.role === 'admin' ? 'right-2' : ''} opacity-0`} duration-200`}>
                                        <ul className={`${actionArea ? 'flex' : 'hidden'} w-full h-full  justify-start items-start px-3 py-5 gap-3 flex-col`}>
                                            {userDetails.role === 'user' ? <li
                                                onClick={() => {
                                                    setFavView(true),
                                                        setActionArea(false)
                                                }}
                                                className="w-full flex justify-start items-center text-md gap-2 cursor-pointer"><BiHeart className="inline text-2xl text-rose-400" />Favorites</li>
                                                : <Link href={'/Admin'}> <li className="w-full flex justify-start items-center text-md gap-2 cursor-pointer"><MdManageAccounts className="inline text-2xl text-rose-400" />Manage</li></Link>
                                            }
                                            <li className="w-full flex justify-start items-center text-md gap-2 cursor-pointer" onClick={logOut}><LuLogOut className="inline text-2xl text-primary " />Logout</li>
                                            <li onClick={handleDeleteUser} className="w-full h-full flex justify-center items-center text-sm border border-red-400 bg-red-100 text-red-400 text-center cursor-pointer">Delete Accout</li>
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
                <div className={`absolute  ${favView ? 'opacity-100 lg:w-[400px] w-[350px] p-5' : 'w-0'} duration-200 bg-slate-800  border-slate-50 top-23 z-999999 right-0 min-h-screen  `}>
                    <div className={`w-full ${favView ? 'flex' : 'hidden'} justify-between items-center p-2 `}>
                        <BsChevronDoubleRight onClick={() => setFavView(false)} className="text-2xl  text-rose-600" />
                        <h4 className="text-xl text-white uppercase mr-3">Your Favorites</h4>
                    </div>
                    <ul className="w-full flex flex-col justify-start items-start gap-2 h-screen overflow-y-auto custom-scrollbar">
                        {favoProps && favoProps?.length > 0 ? favoProps.map((property, ndx) => {
                            return (
                                <Link key={ndx} href={`/properties/propertyDetails?pId=${property?.id}`}><li className="w-[99%] flex justify-start items-center gap-2 border border-slate-100 py-3 px-2 bg-slate-600 hover:bg-slate-500 duration-200 cursor-pointer"><img className="w-[30%] min-h-[80px] object-cover rounded-lg" src={`${property?.thumbnailImage}`} alt={property.title} />
                                    <div className="w-[68%]  flex flex-col justify-start items-start gap-2">
                                        <h4 className="w-full text-md text-white">{property.title}</h4>
                                        <h4 className="w-full text-sm font-mono text-white"><CiLocationOn className="inline text-lg mr-1" />{property?.propertyCity}</h4>
                                        <h4 className="w-full text-sm font-mono text-white"><ImPriceTags className="inline text-lg mr-1" />{property.propertyPrice}</h4>
                                        <h4 className="w-full text-sm font-mono text-white"><PiBuildingOffice className="inline text-lg mr-1" />{property.propertyType} <span className="w-full p-1 bg-secondary text-xs font-mono">{property.propertyType}</span></h4>
                                    </div>
                                </li></Link>
                            )
                        }) : <p className="w-full h-full mt-6 text-center text-white font-mono">Nothing in you Wishlist</p>}
                    </ul>
                </div>
            </div>
            {<div className={` h-screen bg-secondary/95 z-999 border-r-2 border-b-2  top-0 left-0 fixed ${sidebar ? 'w-3/4 border-white/70' : 'w-0'} duration-300`}>
                <GrClose onClick={() => setSidebar(false)} className="absolute right-5 top-5 text-2xl text-red-500 bg-white" />
                {<ul className={` h-full ${sidebar ? 'w-full opacity-100' : 'opacity-0'} duration-300 flex justify-start items-center gap-10 text-white text-xl  flex-col mt-20`} >
                    <li onClick={() => setSidebar(false)}><Link href={'/'}>Home</Link></li>
                    <li onClick={() => setSidebar(false)}><Link href={'/about-us'}>About us</Link></li>
                    <li onClick={() => setSidebar(false)}><Link href={'/properties'}>Properties</Link></li>
                    <li onClick={() => setSidebar(false)}><Link href={'/contact'}>contact</Link></li>
                    {
                        !userDetails.userId ? <div className="w-[60%] flex justify-center items-end">
                            <Link href="/Login">
                                <button className="w-[120px] p-2 text-md font-mono font-semibold bg-secondary/20 border border-slate-50 text-white cursor-pointer hover:shadow-md duration-200 shadow-white/50">Login</button>

                            </Link>
                        </div>
                            : <div className="w-auto flex justify-center items-center gap-1 relative z-999">
                                {userDetails.role === 'admin' && <EditModeToggle toggle={toggle} isEditMode={isEditMode} />}
                                {/**Action area */}
                                <div className={`absolute bg-slate-200 w-auto h-[150px]  z-999 ${actionArea ? `top-14  ${userDetails.role === 'admin' ? 'right-2' : ''} opacity-100` : `top-12 ${userDetails.role === 'admin' ? 'right-2' : ''} opacity-0`} duration-200`}>
                                    <ul className={`${actionArea ? 'flex' : 'hidden'} w-full h-full  justify-start items-start px-3 py-5 gap-3 flex-col`}>
                                        {userDetails.role === 'user' ? <li
                                            onClick={() => {
                                                setFavView(true),
                                                    setSidebar(false),
                                                    setActionArea(false)
                                            }}
                                            className="w-full flex text-slate-800 justify-start items-center text-md gap-2 cursor-pointer"><BiHeart className="inline text-2xl text-rose-400" />Favorites</li>
                                            : <Link href={'/Admin'}> <li className="w-full flex justify-start items-center text-md gap-2 cursor-pointer"><MdManageAccounts className="inline text-2xl text-rose-400" />Manage</li></Link>
                                        }
                                        <li className="w-full flex text-slate-800 justify-start items-center text-md gap-2 cursor-pointer" onClick={logOut}><LuLogOut className="inline text-2xl text-primary " />Logout</li>
                                        <li onClick={handleDeleteUser} className="w-full h-full flex justify-center items-center text-sm border border-red-400 bg-red-100 text-red-400 text-center cursor-pointer">Delete Accout</li>
                                    </ul>
                                </div>
                                <span className={`w-5 h-5 bg-slate-200 rotate-45 relative  left-1/4 ${actionArea ? 'top-9 opacity-100' : 'top-7 opacity-0'} duration-50`}></span>


                                {/**user profile */}
                                <span onClick={() => setActionArea(!actionArea)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary"><img className="w-full h-full object-cover" src={userDetails?.profile ?? '/user-profile-fallback.jpg'} /></span>
                                <h5 onClick={() => setActionArea(!actionArea)} className="font-mono text-md text-slate-50 cursor-pointer">{userDetails.name}</h5><span className="w-2.5 h-2.5 bg-secondary rounded-full p-1"></span>
                            </div>

                    }
                </ul>}
            </div>}
        </>
    );
}

export default Header;