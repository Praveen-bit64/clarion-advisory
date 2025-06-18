import { MdOutlineMyLocation } from "react-icons/md";
import Filter from "../icons/Filter";
const HeroBanner = () => {
    return (
        <div className="w-full h-[700px] relative">
            {/* Enter */}
            <div className="w-full h-full absolute bg-primary/20 top-0 left-0 z-10"></div>
            <img src="/hero-banner-home.jpg" className="w-full h-full object-cover" alt="hero-banner" />
            <div className="w-full absolute top-[100px] left-0  z-99 flex justify-center items-center flex-col gap-3">
                <p className="captilize text-xl text-white">Best Place to</p>
                <h1 className="text-5xl text-white font-bold">Find Your Dream Property</h1>
                <p className="text-xl text-white">We’ve more than 745,000 apartments, place & plot.</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center absolute top-10 z-99">
                <div className="w-[70%] h-[70px] bg-white rounded-2xl flex justify-start items-center px-3 relative rounded-tl-none gap-1.5">
                    <div className="w-[140px] h-[50px] bg-white absolute top-[-50px] left-0 rounded-lg rounded-b-none border-b-2 border-b-slate-100">
                        <ul className="w-full h-full flex justify-around items-center text-slate-500">
                            <li className="cursor-pointer font-semibold hover:text-slate-700 duration-200 border-b-0 p-2 border-b-primary hover:border-b-2">Rent</li>
                            <li className="cursor-pointer font-semibold hover:text-slate-700 duration-200 border-b-0 p-2 border-b-primary hover:border-b-2">Buy</li>
                        </ul>
                    </div>
                    <div className="w-[60%] h-[60%] rounded-md bg-slate-100 outline-none border-none px-2 flex justify-start items-center">
                        <MdOutlineMyLocation />
                        <input type="text" className="w-full outline-none border-none px-2 " placeholder="Enter Location to Search..." />
                    </div>
                    <select
                        className="w-full max-w-xs p-3 rounded-lg border-2 border-slate-100 bg-white text-gray-800 focus:outline-none focus:ring-0 cursor-pointer hover:bg-slate-100"
                    >
                        <option value="">Apartment</option>
                        <option value="">Flat</option>
                        <option value="">Warehouse</option>
                        <option value="">Office Space</option>
                    </select>
                    <div className="border-2 border-slate-100 p-2 flex justify-start items-center cursor-pointer bg-secondary rounded-md hover:bg-secondary/90">
                        <Filter fill="black" stroke="white" />
                        <button className="cursor-pointer text-white">Advanced</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;