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
import TestimonialsEdit from './EditHomeComponents/TestimonialsEdit';
import { useHomeComponentDetails } from '../context/HomeComponentDetails';
const Testimonials = () => {
    const { isEditMode } = useEditMode();
    const { testimonials, reviews } = useHomeComponentDetails()
    const [isOpen, setIsOpen] = useState(false)

    const memoModal = useMemo(() => (
        <TestimonialsEdit isOpen={isOpen} setIsOpen={setIsOpen} />
    ), [isOpen])
    const RenderItem = (props: any) => {
        const { name, location, comment, profile, rating } = props.item
        return (
            <div className="w-full h-[280px] border-1 border-slate-200 rounded-lg p-3">
                <FaQuoteLeft />
                <div className="w-full h-[150px] relative">
                    <h2 className='text-md font-semibold '>{comment}</h2>
                    <div className="w-full flex justify-start items-center gap-2 absolute z-9 bottom-1.5 left-0">

                        {Array.from({ length: rating }).map((_, ndx) => <FaStar key={ndx} className='text-amber-400' />)}
                        {Array.from({ length: 5 - rating }).map((_, ndx) => <FaRegStar key={ndx} className='stroke-amber-200' />)}
                    </div>
                </div>
                <div className="w-full h-[1px] bg-slate-300"></div>
                <div className="w-full flex justify-start items-center gap-4 pt-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
                        <img src={profile} className='object-cover w-full h-full' alt="" />
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
                <h1 className="text-3xl text-slate-600 font-semibold">{testimonials.title}</h1>
                <h3 className="text-md text-slate-500">{testimonials.description}</h3>
            </GlobalContainer>
            <SliderCenterMode itemArray={reviews} RenderItem={RenderItem} className='px-2 flex flex-wrap justify-center items-center' />
        </div>
    );
}

export default Testimonials;