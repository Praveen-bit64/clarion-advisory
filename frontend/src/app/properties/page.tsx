'use client'
import Link from "next/link";
import GlobalContainer from "../components/GlobalContainer";
import { RiArrowDownWideFill } from "react-icons/ri";
import Filter from "../icons/Filter";
import { JSX, useEffect, useRef, useState } from "react";
import GlobalModal from "../components/GlobalModal";
import FilterPopup from "../components/FilterPopup";
import propertyData from '@/app/data/propertyData.json';
import { FiExternalLink } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoImagesSharp } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
const page = () => {
    const [dropdown, setDropDown] = useState({
        status: false,
        place: '',
    })
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const place = e.currentTarget.dataset.place || '';

        setDropDown(prev => {
            // Only toggle if clicking the same place, otherwise open new one
            const shouldOpen = prev.place !== place || !prev.status;

            return {
                status: shouldOpen,
                place: shouldOpen ? place : ''
            };
        });
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropDown({ status: false, place: '' });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const DropDown = () => {
        const CompToRender = componentMap[dropdown?.place]
        return (
            <div ref={dropdownRef} className="absolute w-full min-h-[100px] bg-white top-11 left-0 z-99 shadow-lg shadow-secondary/10">
                {dropdown.place.trim() ? <CompToRender /> : null}
                <div className="py-2 border-t-[1px] border-slate-200 flex justify-end items-center">
                    <button className="p-1 text-sm text-white bg-secondary mr-2 rounded-sm">Done</button>
                </div>
            </div>
        )
    }
    const sType = () => {
        return (
            <ul className="w-full flex justify-center items-start flex-col">
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">All</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Rent</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Sale</li>
            </ul>
        )
    }
    const pType = () => {
        return (
            <ul className="w-full flex justify-center items-start flex-col">
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">All</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Houses</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Apartments</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Villas</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Office space</li>
            </ul>
        )
    }
    // const price = () => {
    //     return (
    //         <div className="w-full flex justify-between items-center gap-2 flex-wrap p-3">
    //             <input type="text" className="w-full p-2 outline-none border border-slate-300 rounded-md" />
    //             <input type="text" className="w-full p-2 outline-none border border-slate-300 rounded-md" />
    //         </div>
    //     )
    // }
    const bedrooms = () => {
        return (
            <ul className="w-full flex justify-center items-start flex-col">
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">All</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">1BH</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">2BHK</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">3BHK</li>
                <li className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">5BHK</li>
            </ul>
        )
    }
    const componentMap: Record<string, () => JSX.Element> = {
        sType,
        pType,
        // price,
        bedrooms
    };
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <FilterPopup isOpen={true} onClose={() => setIsOpen(false)} />
            </GlobalModal>
            <div className="w-full h-auto bg-slate-100 flex justify-center items-start">
                <GlobalContainer>
                    <div className="w-full flex justify-start items-start flex-col gap-2 mt-10 py-10">
                        <h2 className="text-3xl text-slate-700 font-semibold">New York Homes for Sale</h2>
                        <div className="flex justify-start items-center gap-1 text-sm text-slate-700"><Link href={'/'} className="hover:text-secondary duration-200">Home</Link>/<Link href={'#'} className="hover:text-secondary duration-200">properties</Link></div>
                    </div>
                    <div className="w-full h-12 flex justify-start items-center flex-col lg:flex-row gap-2">
                        <div className="lg:w-[70%] w-full flex justify-start gap-1 items-center">
                            <div
                                onClick={handleDropDown}
                                data-place='sType'
                                className="relative hidden lg:flex justify-start items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center"
                            >
                                <input type="text" value={'For Rent'} className=" outline-none cursor-pointer w-full text-center  select-none text-md" readOnly /><RiArrowDownWideFill className="text-2xl" />
                                {dropdown.status && dropdown.place == 'sType' && <DropDown />}
                            </div>
                            <div
                                onClick={handleDropDown}
                                data-place='pType'
                                className="hidden lg:flex justify-start items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center relative">
                                <input type="text" value={'Property Type'} className=" outline-none cursor-pointer w-full text-center  select-none text-md" readOnly /><RiArrowDownWideFill className="text-2xl" />
                                {dropdown.status && dropdown.place == 'pType' && <DropDown />}
                            </div>
                            {/* <div
                            onClick={handleDropDown}
                            data-place='price'
                            className="flex justify-start items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center relative">
                            <input type="text" value={'Price'} className=" outline-none cursor-pointer w-full text-center  select-none text-md" readOnly /><RiArrowDownWideFill className="text-2xl" />
                            {dropdown.status && dropdown.place == 'price' && <DropDown />}
                        </div> */}
                            <div
                                onClick={handleDropDown}
                                data-place='bedrooms'
                                className="hidden lg:flex justify-start items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center relative">
                                <input type="text" value={'Bedrooms'} className=" outline-none cursor-pointer w-full text-center  select-none text-md" readOnly /><RiArrowDownWideFill className="text-2xl" />
                                {dropdown.status && dropdown.place == 'bedrooms' && <DropDown />}
                            </div>
                            <div
                                onClick={() => setIsOpen(true)}
                                className="flex justify-center items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center">
                                <span className="outline-none cursor-pointer w-full text-center  select-none text-md"><Filter classname="inline-block mr-2" />More Filter</span>
                            </div>
                        </div>
                        <div className="lg:w-[40%] w-full flex justify-end items-center">
                            <span className="text-sm text-slate-500">Sort by</span>
                            <select name="" id="" className="p-1  outline-none">
                                <option value="">Newest</option>
                                <option value="">Price Low</option>
                                <option value="">Price High</option>
                            </select>
                            <button className="ml-2 w-[80px] text-md p-1 border-x-[1px] border-slate-400 text-secondary cursor-pointer">Grid</button><button className="w-[80px] text-md cursor-pointer">List</button>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-4 flex-wrap mt-10">
                        {propertyData.length > 0 && propertyData.map((item, ndx) => {
                            return (
                                <div key={ndx} className="group lg:w-[32%] w-full min-h-[400px]">
                                    <div className="w-full h-[250px] relative">
                                        <div className="overflow-hidden w-full h-full">
                                            <img src={item.image} alt={item.title} className="w-full cursor-pointer group-hover:scale-110 duration-300 group-hover:rotate-2 h-full object-cover" />
                                        </div>
                                        {(ndx === 4 || ndx === 7 || ndx === 2) && (
                                            <span className={`absolute group-hover:top-4 group-hover:opacity-0 duration-200 opacity-100 top-2 left-2 py-2 px-4 ${(ndx === 7 || ndx === 2) ? 'bg-amber-400' : 'bg-green-400'} text-md text-black`}>
                                                {(ndx === 7 || ndx === 2) ? 'Featured' : 'Newly Added'}
                                            </span>
                                        )}
                                        <div className="absolute bottom-0 right-0  flex justify-end items-center p-1 gap-1">
                                            <span className="text-white text-sm p-[4px] bg-black"> 8 <IoImagesSharp className="text-white text-2xl  inline-block" /></span> <IoMdVideocam className="text-white text-3xl bg-black p-[3px]" />
                                        </div>
                                        <span className="absolute bottom-2 left-2 rounded-sm bg-secondary p-2 font-mono font-semibold text-md text-white px-4 shadow-2xl">${item.price}/Mon</span>
                                    </div>
                                    <div className="w-full h-[140px] px-3 py-5 border-[1px] border-slate-300 border-t-none bg-white">
                                        <Link href={'/properties/propertyDetails'}><h2 className="text-md font-semibold hover:underline text-slate-900 cursor-pointer">{item.title}</h2></Link>
                                        <p className="text-sm text-slate-600">Los Angeles City, CA, USA</p>
                                        <span className="mt-3"> 1 bed 1 bath 1000 sqft</span>
                                        <div className="w-full my-2 border-t-[1px] border-slate-300 flex justify-between items-center">
                                            <h4 className="w-full py-3 flex justify-start items-center text-md text-slate-800 capitalize">for rent</h4>
                                            <div className="w-full flex justify-end items-center gap-4">
                                                <Link href={'/properties/propertyDetails'}><FiExternalLink className="text-2xl hover:scale-110 duration-200 cursor-pointer" /></Link> <IoMdHeartEmpty className="text-2xl hover:scale-110 duration-200 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </GlobalContainer>
            </div>
        </>
    );
}

export default page;