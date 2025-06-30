'use client'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useMemo, useState } from "react";
import Switcher from "./Switcher";
import GlobalModal from "./GlobalModal";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useEditMode } from "../context/EditModeToggle";
import Link from "next/link";

const Footer = () => {
    const { isEditMode } = useEditMode();
    const [isEnabled, setIsEnabled] = useState(true);
    const [popularSearches, setPopularSearches] = useState<string[]>([
        "Apartment for Rent",
        "Apartment Low to Hide",
        "Offices for Buy",
        "Offices for Rent",
        "Villas for Rent in Bahrain"
    ]);
    const [discoverLocations, setDiscoverLocations] = useState<string[]>([
        "Bahrain",
        "Adliya",
        "Barbar",
        "Janabia"
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'searches' | 'locations'>('searches');

    // Handlers for popular searches
    const handleAddSearch = (newSearch: string) => {
        if (!newSearch.trim() || popularSearches.includes(newSearch)) return;
        setPopularSearches(prev => [...prev, newSearch]);
    };

    const handleSearchRemove = (value: string) => {
        setPopularSearches(popularSearches.filter(item => item !== value));
    };

    // Handlers for discover locations
    const handleAddLocation = (newLocation: string) => {
        if (!newLocation.trim() || discoverLocations.includes(newLocation)) return;
        setDiscoverLocations(prev => [...prev, newLocation]);
    };

    const handleLocationRemove = (value: string) => {
        setDiscoverLocations(discoverLocations.filter(item => item !== value));
    };

    const enables = (value: boolean) => {
        setIsEnabled(value);
    };

    const EditComponent = ({
        isOpen,
        setIsOpen,
        popularSearches,
        discoverLocations,
        onAddSearch,
        onRemoveSearch,
        onAddLocation,
        onRemoveLocation,
        activeTab,
        setActiveTab
    }: {
        isOpen: boolean;
        setIsOpen: (value: boolean) => void;
        popularSearches: string[];
        discoverLocations: string[];
        onAddSearch: (search: string) => void;
        onRemoveSearch: (search: string) => void;
        onAddLocation: (location: string) => void;
        onRemoveLocation: (location: string) => void;
        activeTab: 'searches' | 'locations';
        setActiveTab: (tab: 'searches' | 'locations') => void;
    }) => {
        const [inputValue, setInputValue] = useState('');

        const handleAdd = () => {
            if (activeTab === 'searches') {
                onAddSearch(inputValue);
            } else {
                onAddLocation(inputValue);
            }
            setInputValue('');
        };

        return (
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                    <div className="w-full flex justify-center items-center gap-2">
                        <div className="w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                            {/* Tab Selector */}
                            <div className="flex border-b border-gray-300 mb-4">
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === 'searches' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('searches')}
                                >
                                    Popular Searches
                                </button>
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === 'locations' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('locations')}
                                >
                                    Discover Locations
                                </button>
                            </div>

                            {/* Content based on active tab */}
                            {activeTab === 'searches' ? (
                                <>
                                    <div className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1">
                                        <input
                                            type="text"
                                            name="newsearch"
                                            placeholder="Add New Search"
                                            onChange={(e) => setInputValue(e.target.value)}
                                            value={inputValue}
                                            className="w-full p-2 outline-none"
                                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                        />
                                        <MdOutlineAdd
                                            onClick={handleAdd}
                                            className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200"
                                        />
                                    </div>

                                    {popularSearches.map((item, ndx) => (
                                        <div key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1">
                                            <IoClose
                                                onClick={() => onRemoveSearch(item)}
                                                className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1">
                                        <input
                                            type="text"
                                            name="newlocation"
                                            placeholder="Add New Location"
                                            onChange={(e) => setInputValue(e.target.value)}
                                            value={inputValue}
                                            className="w-full p-2 outline-none"
                                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                        />
                                        <MdOutlineAdd
                                            onClick={handleAdd}
                                            className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200"
                                        />
                                    </div>

                                    {discoverLocations.map((item, ndx) => (
                                        <div key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1">
                                            <IoClose
                                                onClick={() => onRemoveLocation(item)}
                                                className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-full p-3">
                        <h4>Edit Copyright Content</h4>
                        <input type="text" placeholder="Enter Copyright" className="w-full p-2 outline-none border-2 border-slate-100" name="" id="" />
                    </div>
                    <div className="w-full flex justify-end items-end pt-3 gap-2">
                        <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                        <button onClick={() => setIsOpen(false)} className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                    </div>
                </div>
            </GlobalModal>
        );
    };

    const memoModal = useMemo(() => (
        <EditComponent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            popularSearches={popularSearches}
            discoverLocations={discoverLocations}
            onAddSearch={handleAddSearch}
            onRemoveSearch={handleSearchRemove}
            onAddLocation={handleAddLocation}
            onRemoveLocation={handleLocationRemove}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
    ), [isOpen, popularSearches, discoverLocations, activeTab]);

    const socials = [
        { icon: FaXTwitter, link: '#', colorCode: 'rgb(206,210,205)' },
        { icon: FaFacebookF, link: '#', colorCode: 'rgb(24,119,242)' },
        { icon: FaInstagram, link: '#', colorCode: 'rgb(228,64,95)' },
        { icon: FaLinkedin, link: '#', colorCode: 'rgb(0,119,181)' },
    ];

    return (
        <div className="w-full bg-slate-950 flex justify-center items-start p-5 gap-1 flex-wrap relative group">
            {memoModal}
            {isEditMode && <div className="absolute w-full hidden min-h-full bg-primary/30 top-0 left-0 z-9999 group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit
                    onClick={() => {
                        setActiveTab('searches');
                        setIsOpen(true);
                    }}
                    className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer"
                />
            </div>}

            <div className="w-full h-full flex justify-center items-center lg:flex-row flex-col">
                <div className="lg:w-[33%] w-full min-h-[250px] flex justify-start items-start gap-10 flex-col p-4 lg:pl-16 pl-1">
                    <img
                        src="/clarion-logo.png"
                        className="lg:w-[150px] w-[220px] bg-slate-100 rounded-sm"
                        alt="clarion advisory logo"
                    />

                    <div className="w-full flex justify-start items-center gap-3 lg:flex-row flex-col">
                        <div className="rounded-lg p-5 bg-white/10 w-full">
                            <p className="text-sm text-slate-300">Toll Free Customer Care</p>
                            <h4 className="text-md text-slate-50 font-semibold">+(0) 123 050 945 02</h4>
                        </div>
                        <div className="rounded-lg p-5 bg-white/10 w-full">
                            <p className="text-sm text-slate-300">Need Support?</p>
                            <h4 className="text-md text-slate-50 font-semibold">hi@homez.com</h4>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-bold text-slate-200 mb-2">Follow us on social media</p>
                        <ul className="flex gap-3">
                            {socials.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <li key={idx}>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex justify-center items-center rounded-md hover:scale-105 transition-all duration-300"
                                        >
                                            <Icon
                                                className="text-2xl"
                                                style={{
                                                    transition: 'all 0.3s ease-in-out',
                                                    color: item.colorCode
                                                }}
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="lg:w-[63%] w-full min-h-[250px] flex justify-start items-start gap-10 flex-col lg:p-4 p-0 lg:pr-16 pr-1">
                    <div className="w-full">
                        <h3 className="text-md mb-2 text-slate-100 font-semibold">Keep Yourself Up to Date</h3>
                        <div className="w-full flex justify-start items-center gap-1 bg-white/10 p-3 rounded-lg">
                            <input
                                type="text"
                                placeholder="Enter Email"
                                className="w-full h-full p-3 text-slate-300 outline-none bg-transparent"
                            />
                            <button className="text-md font-semibold cursor-pointer text-secondary inline">Subscribe</button>
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-start gap-4 flex-wrap">
                        <div className="min-w-[150px]">
                            <h2 className="text-md text-slate-100 font-semibold">Popular Search</h2>
                            <ul>
                                {popularSearches.map((search, index) => (
                                    <li
                                        key={index}
                                        className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200"
                                    >
                                        {search}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="min-w-[150px]">
                            <h2 className="text-md text-slate-100 font-semibold">Quick Links</h2>
                            <ul>
                                <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Terms of Use</li>
                                <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Privacy Policy</li>
                                <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200"><Link href={'/contact'}>Contact Support</Link></li>
                                <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200"><Link href={'/about-us'}>About Us</Link></li>
                                <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200"><Link href={'/'}>Home</Link></li>
                                <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200"><Link href={'/faq'}>FAQs</Link></li>
                            </ul>
                        </div>

                        <div className="min-w-[150px]">
                            <h2 className="text-md text-slate-100 font-semibold">Discover</h2>
                            <ul>
                                {discoverLocations.map((location, index) => (
                                    <li
                                        key={index}
                                        className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200"
                                    >
                                        {location}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[90%] h-[1px] bg-slate-600"></div>

            <div className="py-4 flex justify-between items-center w-full">
                <p className="capitalize text-slate-100">©Clarion Advisory WLL - All rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;