'use client'
import testimonials from '@/app/data/testimonials.json'
import SliderCenterMode from './SliderCenterMode'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";
import GlobalContainer from './GlobalContainer';
import { useMemo, useState } from 'react';
import Switcher from './Switcher';
import GlobalModal from './GlobalModal';
import { CiEdit } from 'react-icons/ci';
import { useEditMode } from '../context/EditModeToggle';
const Testimonials = () => {
    const { isEditMode } = useEditMode();
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
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label htmlFor="title" className="text-lg font-semibold">Title</label>
                        <input type="text" placeholder="Title" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label htmlFor="title" className="text-lg font-semibold">Description</label>
                        <input type="text" placeholder="Description" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                    </div>
                    <div className="w-full border border-slate-300 p-2 py-3 rounded-lg bg-primary/10">
                        <h4 className='w-full text-center text-md font-semibold'>Add New</h4>
                        <div className="w-full flex flex-wrap justify-center items-center gap-2">
                            <input type="text" placeholder='Name' className='w-[48%] outline-none p-2 border bg-white rounded-lg border-secondary/30' name="" id="" />
                            <input type="text" placeholder='Location' className='w-[48%] outline-none p-2 border bg-white rounded-lg border-secondary/30' name="" id="" />
                            <input type="text" placeholder='Comment' className='w-[98%] outline-none p-3 border bg-white  border-secondary/30' name="" id="" />
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h4 className='text-sm font-semibold'>Rating</h4>
                                <select name="" id="" className='w-full outline-none p-2.5 border bg-white rounded-lg border-secondary/30'>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h4 className='text-sm font-semibold'>Profile</h4>
                                <input type="file" name="" id="" className='w-[96%] outline-none p-2 bg-green-50 border-2 border-dashed rounded-lg border-secondary/30' />

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
    const RenderItem = (props: any) => {
        const { name, location, message, img, rating } = props.item
        return (
            <div className="w-full h-[280px] border-1 border-slate-200 rounded-lg p-3">
                <FaQuoteLeft />
                <div className="w-full h-[150px] relative">
                    <h2 className='text-md font-semibold '>{message}</h2>
                    <div className="w-full flex justify-start items-center gap-2 absolute z-9 bottom-1.5 left-0">

                        {Array.from({ length: rating }).map((_, ndx) => <FaStar key={ndx} className='text-amber-400' />)}
                        {Array.from({ length: 5 - rating }).map((_, ndx) => <FaRegStar key={ndx} className='stroke-amber-200' />)}
                    </div>
                </div>
                <div className="w-full h-[1px] bg-slate-300"></div>
                <div className="w-full flex justify-start items-center gap-4 pt-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
                        <img src={img} className='object-cover w-full h-full' alt="" />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                        <h2 className='text-md font-semibold text-slate-600'>{name}</h2>
                        <p className='text-md text-slate-400'>{location}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full min-h-[600px] flex justify-center items-center flex-col relative group   " >
            {isOpen && memoModal}
            {isEditMode && <div className="absolute w-full hidden min-h-full bg-primary/30 top-0 left-0 z-9999 group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>}
            <GlobalContainer className='py-10 pt-0'>
                <h1 className="text-3xl text-slate-600 font-semibold">People Love Living with Realton</h1>
                <h3 className="text-md text-slate-500">People Love Living with Realton – top-rated homes in the best locations!</h3>
            </GlobalContainer>
            <SliderCenterMode itemArray={testimonials} RenderItem={RenderItem} className='px-2 flex flex-wrap justify-center items-center' />
        </div>
    );
}

export default Testimonials;