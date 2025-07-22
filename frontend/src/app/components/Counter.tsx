'use client'

import { useMemo, useState } from "react"
import GlobalModal from "./GlobalModal"
import Switcher from "./Switcher"
import { CiEdit } from "react-icons/ci"
import { useEditMode } from "../context/EditModeToggle"
import CounterEdit from "./EditHomeComponents/CounterEdit"
import { useHomeComponentDetails } from "../context/HomeComponentDetails"

const Counter = () => {
    const { isEditMode } = useEditMode();
    const { counter } = useHomeComponentDetails()
    const [isOpen, setIsOpen] = useState(false)

    const memoModal = useMemo(() => (
        <CounterEdit isOpen={isOpen} setIsOpen={setIsOpen} />
    ), [isOpen])
    return (
        <div className="w-full h-auto py-10 pb-16 relative group">
            {isOpen && memoModal}
            {isEditMode && <div className="absolute w-full min-h-full bg-primary/30 top-0 left-0 z-9999 hidden group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>}
            <div className="w-full flex flex-col justify-center items-center py-6 pb-10">
                <h2 className="lg:text-3xl text-2xl text-slate-600 font-semibold text-center">{counter.title}</h2>
                <p className="text-md text-slate-500 text-center">{counter.description}</p>
            </div>
            <ul className="w-full flex justify-center items-center gap-10 flex-wrap">
                <li className="lg:w-[20%] w-[90%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative overflow-hidden">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">{counter.sec1Count}+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">{counter.sec1Title}</p>
                    <img src="/apartment-3.jpeg" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
                <li className="lg:w-[20%] w-[90%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">{counter.sec2Count}+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">{counter.sec2Title}</p>
                    <img src="/villa-1.jpg" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
                <li className="lg:w-[20%] w-[90%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">{counter.sec3Count}+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">{counter.sec3Title}</p>
                    <img src="/villa-2.png" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
            </ul>
        </div>
    );
}

export default Counter;