'use client'
import testimonials from '@/app/data/testimonials.json'
import SliderCenterMode from './SliderCenterMode'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";
import GlobalContainer from './GlobalContainer';
const Testimonials = () => {
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
        <div className="w-full min-h-[600px] flex justify-center items-center flex-col" >
            <GlobalContainer className='py-10 pt-0'>
                <h1 className="text-3xl text-slate-600 font-semibold">People Love Living with Realton</h1>
                <h3 className="text-md text-slate-500">People Love Living with Realton – top-rated homes in the best locations!</h3>
            </GlobalContainer>
            <SliderCenterMode itemArray={testimonials} RenderItem={RenderItem} />
        </div>
    );
}

export default Testimonials;