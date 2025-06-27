'use client'

import { useMemo, useState } from "react"
import GlobalModal from "./GlobalModal"
import Switcher from "./Switcher"
import { CiEdit } from "react-icons/ci"

const Counter = () => {
    const [isEnabled, setIsEnabled] = useState(true)
    const enables = (value: boolean) => {
        setIsEnabled(value)
    }
    const [isOpen, setIsOpen] = useState(false)
    const EditComponent = (props: { isOpen: boolean, setIsOpen: any }) => {
        const { isOpen, setIsOpen } = props
        return (
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                    <div className="w-full flex justify-start items-start flex-col">
                        <label htmlFor="title" className="text-lg font-semibold">Section Visibility</label>
                        <Switcher enables={enables} />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-1">
                        <label htmlFor="title" className="text-md font-semibold">Title</label>
                        <input type="text" placeholder="Title" className="w-full p-1 outline-none border border-slate-300 bg-white" />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-1">
                        <label htmlFor="title" className="text-md font-semibold">Description</label>
                        <input type="text" placeholder="Description" className="w-full p-1 outline-none border border-slate-300 bg-white" />
                    </div>
                    {/**section A */}
                    <div className="w-full flex flex-col justify-center items-center gap-2 p-2 py-3 border border-slate-300">
                        <div className="w-full flex justify-start items-start gap-4 ">
                            <span className="inline p-1 px-2 text-white bg-accent">Section A</span><input type="file" className="p-1 bg-green-100 border-2 border-dashed text-sm" name="" id="" />
                        </div>
                        <div className="w-full flex justify-start items-start gap-2">
                            <div className="w-[48%] flex flex-col justify-center items-start gap-1.5">
                                <h4 className="text-xs font-semibold">Title</h4>
                                <input type="text" placeholder="Enter title" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="" id="" />
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h4 className="text-xs font-semibold">Count</h4>
                                <input type="number" placeholder="Enter Count" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="" id="" />
                            </div>
                        </div>
                    </div>
                    {/**section B */}
                    <div className="w-full flex flex-col justify-center items-center gap-2 p-2 py-3 border border-slate-300">
                        <div className="w-full flex justify-start items-start gap-4 ">
                            <span className="inline p-1 px-2 text-white bg-accent">Section B</span><input type="file" className="p-1 bg-green-100 border-2 border-dashed text-sm" name="" id="" />
                        </div>
                        <div className="w-full flex justify-start items-start gap-2">
                            <div className="w-[48%] flex flex-col justify-center items-start gap-1.5">
                                <h4 className="text-xs font-semibold">Title</h4>
                                <input type="text" placeholder="Enter title" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="" id="" />
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h4 className="text-xs font-semibold">Count</h4>
                                <input type="number" placeholder="Enter Count" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="" id="" />
                            </div>
                        </div>
                    </div>
                    {/**section C */}
                    <div className="w-full flex flex-col justify-center items-center gap-2 p-2 py-3 border border-slate-300">
                        <div className="w-full flex justify-start items-start gap-4 ">
                            <span className="inline p-1 px-2 text-white bg-accent">Section C</span><input type="file" className="p-1 bg-green-100 border-2 border-dashed text-sm" name="" id="" />
                        </div>
                        <div className="w-full flex justify-start items-start gap-2">
                            <div className="w-[48%] flex flex-col justify-center items-start gap-1.5">
                                <h4 className="text-xs font-semibold">Title</h4>
                                <input type="text" placeholder="Enter title" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="" id="" />
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h4 className="text-xs font-semibold">Count</h4>
                                <input type="number" placeholder="Enter Count" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="" id="" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end items-end pt-3 gap-2">
                        <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                        <button className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                    </div>
                </div>
            </GlobalModal>
        )
    }
    const memoModal = useMemo(() => (
        <EditComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    ), [isOpen])
    return (
        <div className="w-full h-auto py-10 pb-16 relative group">
            {isOpen && memoModal}
            <div className="absolute w-full min-h-full bg-primary/30 top-0 left-0 z-9999 hidden group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>
            <div className="w-full flex flex-col justify-center items-center py-6 pb-10">
                <h2 className="lg:text-3xl text-2xl text-slate-600 font-semibold text-center">Trusted by Thousands, Growing Every Day</h2>
                <p className="text-md text-slate-500 text-center">Showcasing premium properties, satisfied clients, and successful deals across every corner of the city.</p>
            </div>
            <ul className="w-full flex justify-center items-center gap-10 flex-wrap">
                <li className="lg:w-[20%] w-[90%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative overflow-hidden">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">1000+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">Listing for sale</p>
                    <img src="/apartment-1.webp" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
                <li className="lg:w-[20%] w-[90%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">2400+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">Property for sold</p>
                    <img src="/villa-1.jpg" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
                <li className="lg:w-[20%] w-[90%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">850+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">Listing for rent</p>
                    <img src="/villa-2.png" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
            </ul>
        </div>
    );
}

export default Counter;