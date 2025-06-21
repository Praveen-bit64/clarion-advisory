'use client'
import GlobalContainer from "@/app/components/GlobalContainer";
import { li, span } from "framer-motion/client";
import Link from "next/link";
import { it } from "node:test";
import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineMail } from "react-icons/ai";
import { BiHeart, BiShare, BiShareAlt } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCircleDot, FaUser } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { GiRapidshareArrow } from "react-icons/gi";
import { IoMdCall, IoMdHeartEmpty, IoMdVideocam } from "react-icons/io";
import { IoImagesSharp } from "react-icons/io5";
import { MdOutline1K, MdOutlineFactory } from "react-icons/md";
import { PiWindmill } from "react-icons/pi";
import { SiTicktick, SiWhatsapp } from "react-icons/si";
import propertyData from '@/app/data/propertyData.json'

const page = () => {
    const galleryArr = [{ img: '/view-6.jpg', title: 'interior View' }, { img: '/view-7.webp', title: 'interior View' },
    { img: '/view-2.jpg', title: 'interior View' }, { img: '/view-3.jpg', title: 'interior View' },
    { img: '/view-4.jpg', title: 'interior View' }, { img: '/view-5.jpg', title: 'interior View' },
    { img: '/view-1.jpg', title: 'interior View' }, { img: '/view-8.jpeg', title: 'interior View' }
    ]
    const details = {
        propertyId: "RT48",
        price: "$252,000",
        propertySize: "1500 Sq Ft",
        bathrooms: 3,
        bedrooms: 2,
        garage: 2,
        garageSize: "200 SqFt",
        yearBuilt: 2022,
        propertyType: "Apartment",
        propertyStatus: "For Sale"
    }
    const amenities = [
        "Air Conditioning",
        "Barbeque",
        "Dryer",
        "Gym",
        "Lawn",
        "Microwave",
        "Outdoor Shower",
        "Refrigerator",
        "Swimming Pool",
        "TV Cable",
        "Washer",
        "WiFi6"
    ];

    const [heroImage, setHeroImage] = useState(galleryArr[0])
    const [showDescription, setShowDescription] = useState(false)
    const description = `Nestled in a serene and well-connected neighborhood, this beautifully designed 4-bedroom villa offers the perfect blend of elegance, comfort, and convenience. Spread across 4,500 square feet, the property features high ceilings, expansive living areas, and a modern open-concept layout perfect for both entertaining and family living.

                                    Upon entry, you’re greeted by a grand foyer that flows into the spacious living and dining areas, complete with large windows that flood the home with natural light. The gourmet kitchen comes fully equipped with top-of-the-line stainless steel appliances, granite countertops, and a central island that doubles as a breakfast bar.

                                    All four bedrooms are generously sized, with built-in wardrobes and en-suite bathrooms. The master suite is a true retreat, featuring a walk-in closet, a luxurious bathroom with a soaking tub, and a private balcony overlooking the landscaped backyard.

                                    Outside, the villa boasts a private swimming pool, a shaded patio area ideal for BBQs, and a meticulously maintained garden — perfect for enjoying warm evenings or hosting guests. Additional features include a maid’s room, covered parking for two cars, central air conditioning, and 24/7 security.`
    return (
        <div className="w-full h-auto bg-slate-100 flex justify-center items-start">
            <GlobalContainer>
                {/**Breadcrumbs area */}
                <div className="w-full flex justify-between items-center flex-col lg:flex-row">
                    <div className="w-full flex justify-start items-start flex-col gap-2 lg:mt-10 mt-0 lg:py-10 py-1">
                        <h2 className="lg:text-3xl text-xl text-slate-700 font-semibold">Equestrian Family Home</h2>
                        <div className="w-full flex justify-start items-center gap-4 lg:text-[15px] text-[10px] text-slate-500"><span>New York City, CA, USA</span><span className="flex border-x-[1px] border-slate-300 px-3 justify-center items-center gap-1.5 text-secondary"><FaCircleDot className="text-secondary" />For Sale</span><span className="flex justify-center items-center gap-1.5"><AiOutlineClockCircle className="" />2 Year Ago</span></div>
                        <div className="flex justify-start items-center gap-1 lg:text-[15px] text-[12px] font-semibold text-slate-600"><Link href={'/'} className="hover:text-secondary duration-200">Home</Link>/<Link href={'#'} className="hover:text-secondary duration-200">properties</Link>/<Link href={'#'} className="hover:text-secondary duration-200">propertyDetails</Link></div>
                    </div>
                    <div className="w-full flex lg:flex-col flex-row-reverse justify-between lg:justify-center lg:items-end items-center gap-2 lg:mt-10 mt-0 lg:py-10 py-0">
                        <div className="flex gap-2">
                            <BiHeart title="Save Property" className="text-3xl p-1 border border-slate-300 hover:bg-secondary duration-200 hover:rounded-full cursor-pointer hover:text-white rounded-md" />
                            <BiShareAlt title="Share Property" className="text-3xl p-1 border border-slate-300 hover:bg-secondary duration-200 hover:rounded-full cursor-pointer hover:text-white rounded-md" />
                        </div>
                        <h2 className="text-2xl text-slate-600 font-semibold block mt-2">$14,000</h2>
                    </div>

                </div>
                {/**Property Details */}
                <div className="w-full">
                    {/**Gallery area */}
                    <div className="w-full lg:h-[700px] h-auto flex justify-start items-start gap-3 flex-col lg:flex-row">
                        <div className="lg:w-[70%] w-full lg:h-full h-auto ">
                            <div className="w-full lg:h-[600px] h-[250px] rounded-lg overflow-hidden">
                                <img
                                    src={heroImage.img}
                                    className="w-full h-full object-cover"
                                    alt={heroImage.title}
                                />
                            </div>
                            <div className="w-full lg:h-[100px] h-[60px] flex justify-start items-center gap-3 overflow-x-auto">
                                {galleryArr.map((item, ndx) => {
                                    return (
                                        <div onClick={() => setHeroImage(galleryArr[ndx])} key={ndx} className="w-full cursor-pointer min-w-[100px]  max-w-3xl h-[90%] rounded-md overflow-hidden">
                                            <img src={item.img} alt={item.title} className="w-full hover:border-3 hover:border-secondary h-full object-center" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="lg:w-[27%] w-full flex lg:flex-col flex-row justify-start items-start gap-2">
                            {/* Images */}
                            {galleryArr.slice(1, 3).map((item, ndx) => (
                                <div
                                    key={ndx}
                                    onClick={() => setHeroImage(galleryArr[ndx + 1])}
                                    className="w-full h-[190px] lg:block hidden rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}

                            {/* Video */}
                            <div className="w-full lg:h-[290px] h-[170px] rounded-lg overflow-hidden">
                                <video
                                    src="/view-1.mp4"
                                    className="w-full h-full object-cover"
                                    controls
                                    muted
                                />
                            </div>
                        </div>
                    </div>
                    {/**Details area - main */}
                    <div className="w-full flex justify-start items-start gap-2 lg:flex-row flex-col">
                        <div className="lg:w-[70%] w-full lg:my-3 my-0 mt-3">
                            <div className="w-full bg-white rounded-xl p-5 relative shadow-xl">
                                <h3 className="text-lg font-semibold text-slate-700">Property Description</h3>
                                {description.length > 200 ? <p className={`text-md text-slate-600 w-full ${showDescription ? 'h-auto' : 'lg:h-[100px] h-[200px]'} overflow-hidden duration-200`}>{description}</p> : null}{description.length > 200 ? <span onClick={() => setShowDescription(!showDescription)} className="text-sm font-semibold cursor-pointer underline">show More</span> : null}
                                <div className="w-full mt-10">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Property Details</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(details).map(([key, value], ndx) => (
                                            <div key={ndx} className="w-full sm:w-[48%] flex justify-between items-start bg-white p-3 border-b-[1px] border-secondary/20">
                                                <h4 className="text-md font-semibold text-slate-700 capitalize">
                                                    {key.replace(/([A-Z])/g, " $1")}
                                                </h4>
                                                <p className="text-md text-slate-600 text-right">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="w-full bg-white rounded-xl p-5 relative shadow-xl my-3">
                                <h3 className="text-lg font-semibold text-slate-700">Features & Amenities</h3>
                                <ul className="w-full flex justify-start items-center flex-wrap gap-2">
                                    {amenities.map((item, ndx) => {
                                        return (
                                            <li key={ndx} className="lg:w-[32%] w-[48%] py-2 text-md text-slate-800 "><SiTicktick className="inline-block mr-2 !text-xl text-secondary" />{item}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="w-full bg-white rounded-xl p-5 relative shadow-xl my-3">
                                <h3 className="text-lg font-semibold text-slate-700">Address</h3>
                                <div className="w-full flex justify-start items-start gap-4 flex-col">
                                    <h4 className="text-md font-semibold text-slate-700">Address : <span className="text-slate-600 !text-sm font-thin">10425 Tabor St</span></h4>
                                    <h4 className="text-md font-semibold text-slate-700">City : <span className="text-slate-600 !text-sm font-thin">Los Angeles</span></h4>
                                    <h4 className="text-md font-semibold text-slate-700">State/county : <span className="text-slate-600 !text-sm font-thin">New York City</span></h4>
                                </div>
                                <div className="w-full lg:h-[340px] h-[180px] rounded-xl overflow-hidden mt-3">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.88307334034!2d-118.74138533738686!3d34.02003918266803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1750504654594!5m2!1sen!2sin" width="100%" height="100%" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[28%] w-full my-3">
                            {/** call to action */}
                            <ul className="w-full flex justify-center items-center gap-2 bg-white p-3 rounded-md shadow-xl">
                                <li className="w-full h-10 text-center flex justify-center items-center bg-primary rounded-sm shadow gap-2 text-md font-semibold text-white hover:bg-primary/80 cursor-pointer duration-200"><IoMdCall className="text-xl" /> Call</li>
                                <li className="w-full h-10 bg-secondary flex justify-center items-center rounded-sm shadow gap-2 text-md font-semibold text-white hover:bg-secondary/80 cursor-pointer duration-200"><SiWhatsapp className="text-xl" /> Whatsapp</li>
                            </ul>
                            {/**Request form */}
                            <div className="w-full my-3 rounded-lg bg-white p-3 shadow-2xl">
                                <h4 className="text-md font-semibold text-slate-600 text-center">SCHEDULE A VIEWING</h4>
                                <form action="" className="w-full flex justify-start items-center flex-col gap-3 mt-3">
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <FaUser className="text-2xl" /></span><input type="text" className="w-full h-full outline-none border-none p-2" placeholder="Full Name" />
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <FaPhoneAlt className="text-2xl" /></span><input type="text" className="w-full h-full outline-none border-none p-2" placeholder="Phone" />
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <AiOutlineMail className="text-2xl" /></span><input type="email" className="w-full h-full outline-none border-none p-2" placeholder="Email" />
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <MdOutlineFactory className="text-2xl" /></span><input type="email" className="w-full h-full outline-none border-none p-2" placeholder="Company" />
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <textarea className="w-full h-full outline-none border-none p-2 min-h-[100px]" placeholder="Message" />
                                    </div>
                                    <button className="w-full p-2 bg-primary rounded-lg text-md text-white font-semibold flex justify-center items-center gap-2 cursor-pointer hover:bg-primary/80 duration-200">Submit a Request <FiExternalLink className="inline-block text-xl" /></button>
                                </form>
                            </div>
                            {/**similar properties */}
                            <div className="w-full flex justify-start items-center bg-white flex-col flex-wrap mt-3 shadow-2xl rounded-xl p-3">
                                <h4 className="text-lg font-semibold text-slate-600 text-center uppercase mb-2">Similar Properties</h4>
                                {propertyData.length > 0 && propertyData.slice(0, 3).map((item, ndx) => {
                                    return (
                                        <div key={ndx} className="group w-full min-h-[300px]">
                                            <div className="w-full h-[150px] relative">
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
                                                <div className="w-full hidden md:hidden lg:hidden my-2 border-t-[1px] border-slate-300 xl:flex justify-between items-center">
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
                        </div>
                    </div>
                </div>
            </GlobalContainer>
        </div>
    );
}

export default page;