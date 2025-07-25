'use client'

import GlobalContainer from "@/app/components/GlobalContainer";
import { li, span } from "framer-motion/client";
import Link from "next/link";
import { it } from "node:test";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineClockCircle, AiOutlineMail } from "react-icons/ai";
import { BiHeart, BiShare, BiShareAlt } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCircleDot, FaUser } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { GiRapidshareArrow } from "react-icons/gi";
import { IoMdCall, IoMdHeart, IoMdHeartEmpty, IoMdVideocam } from "react-icons/io";
import { IoImagesSharp } from "react-icons/io5";
import { MdOutline1K, MdOutlineFactory } from "react-icons/md";
import { PiWindmill } from "react-icons/pi";
import { SiTicktick, SiWhatsapp } from "react-icons/si";
import propertyData from '@/app/data/propertyData.json'
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from 'date-fns';
import { useContact } from "@/app/context/ContactContext";
import { useListedProperties } from "@/app/context/ListedProperties";
import { useSearchParams } from "next/navigation";
import { useEnquiryForm } from "@/app/hooks/useEnquiryForm";
import { toast } from "react-toastify";
import { useLikes } from "@/app/context/LikeContext";
import Loader from "@/app/components/Loader";

const page = () => {
    const searchParams = useSearchParams();
    const pId = searchParams?.get("pId");
    const [loader, setLoader] = useState(true);
    const [propDetail, setPropDetail] = useState<any>({});
    const [heroImage, setHeroImage] = useState<{ img: string, title: string } | null>(null);
    const { properties } = useListedProperties();
    const { contactInfo } = useContact();
    const [showDescription, setShowDescription] = useState(false);
    const { enquiryInputs, enquiryInputErrs, isEnquirySubmitting, validateEnquiry, onChangeEnquiryInputs, onEnquirySubmit } = useEnquiryForm()
    const { likesArr, isLiked, toggleLike } = useLikes()
    console.log(likesArr, 345345);
    console.log(isLiked('10'), 'islikeddd');

    //  Format "listedAt" date
    const timeAgo = useMemo(() => {
        if (!propDetail?.listedAt) return "";
        try {
            const isoDate = propDetail?.listedAt.replace(" ", "T");
            return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
        } catch {
            return "";
        }
    }, [propDetail]);

    console.log(enquiryInputErrs, enquiryInputs, 8957345);

    //  Parse gallery images
    const galleryArr = useMemo(() => {
        try {
            const parsed = JSON.parse(propDetail?.galleryImage || '[]');
            return Array.isArray(parsed)
                ? parsed.map((img: string) => ({ title: 'Interior View', img }))
                : [];
        } catch (error) {
            console.error("Failed to parse galleryImage:", error);
            return [];
        }
    }, [propDetail]);

    //  Setup hero image when gallery changes
    useEffect(() => {
        if (galleryArr?.length) {
            setHeroImage({ img: propDetail?.thumbnailImage, title: 'Interior View' });
        }
    }, [galleryArr, propDetail?.thumbnailImage]);

    //  Compose property details object
    const details = useMemo(() => {
        const det: any = {
            propertyId: `CLR-STE-${propDetail?.id}`,
            price: `${propDetail?.propertyPrice} ${propDetail?.propertyType === 'rent' ? '/Mon' : ''}`,
            propertySize: propDetail?.propertySize,
            Furnished: propDetail?.furnished || 'Unfurnished',
            propertyType: propDetail?.propertyCategory,
            propertyStatus: `For ${propDetail?.propertyType}`,
        };
        if (propDetail?.bathrooms) det.bathrooms = propDetail.bathrooms;
        if (propDetail?.bedrooms) det.bedrooms = propDetail.bedrooms;
        return det;
    }, [propDetail]);

    //  Dynamic Google Map URL
    const mapURL = useMemo(() => {
        const fullAddress = `${propDetail?.propertyAddress}, ${propDetail?.propertyCity}, ${propDetail?.propertyState}, ${propDetail?.propertyCountry}`;
        return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
    }, [propDetail]);

    //  Fetch details on pId change
    useEffect(() => {
        if (!pId) return;

        const fetchDetails = async () => {
            setLoader(true);
            const res = await fetch('/api/properties/getsinglepropdetail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: pId }),
            });
            const data = await res.json();

            if (!data.error) {
                setPropDetail(data.propertyDetails);
            }
            setLoader(false);
        };

        fetchDetails();
    }, [pId]);

    //  Filter similar properties
    const similarProperties = useMemo(() => {
        return properties?.filter(item =>
            item.id !== propDetail?.id && (
                item.title?.toLowerCase().includes(propDetail?.title?.toLowerCase() || '') ||
                (
                    item.propertyType === propDetail?.propertyType &&
                    item.propertyCategory === propDetail?.propertyCategory
                )
            )
        );
    }, [properties, propDetail]);


    //  Optional: Memoize Hero Image Renderer
    const HeroImageView = useCallback(() => {
        if (!heroImage) return null;
        return (
            <div className="w-full lg:h-[600px] h-[250px] rounded-lg overflow-hidden">
                <img
                    src={heroImage.img}
                    className="w-full h-full object-cover"
                    alt={heroImage.title}
                />
            </div>
        );
    }, [heroImage]);
    const submitEnquiry = async (vals: typeof enquiryInputs) => {
        const formData = {
            name: vals.name,
            email: vals.email,
            phone: vals.phone,
            message: vals.message,
            propertyId: propDetail?.id,
            propertyTitle: propDetail?.title,
            company: vals?.company,
            to: contactInfo?.email,
        };

        const res = await fetch("/api/send-enquiry/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
            toast.success("Submitted!! We will contact you soon.")
        } else {
            toast.error("Failed to send Enquiry. Make Call or message to get response")
        }
    }

    return (
        <div className="w-full h-auto bg-slate-100 flex justify-center items-start">
            <GlobalContainer>
                {/**Breadcrumbs area */}
                <div className="w-full flex justify-between items-center flex-col lg:flex-row">
                    <div className="w-full flex justify-start items-start flex-col gap-2 lg:mt-10 mt-0 lg:py-10 py-1">
                        <h2 className="lg:text-3xl text-xl text-slate-700 font-semibold">{propDetail?.title}</h2>
                        <div className="w-full flex justify-start items-center gap-4 lg:text-[15px] text-[10px] text-slate-500"><span>{propDetail?.propertyAddress}</span><span className="flex border-x-[1px] border-slate-300 px-3 justify-center items-center gap-1.5 text-secondary"><FaCircleDot className="text-secondary capitalize" />For {propDetail?.propertyType}</span><span className="flex justify-center items-center gap-1.5"><AiOutlineClockCircle className="" />{timeAgo}</span></div>
                        <div className="flex justify-start items-center gap-1 lg:text-[15px] text-[12px] font-semibold text-slate-600"><Link href={'/'} className="hover:text-secondary duration-200">Home</Link>/<Link href={'/properties'} className="hover:text-secondary duration-200">properties</Link>/<Link href={'#'} className="hover:text-secondary duration-200">propertyDetails</Link></div>
                    </div>
                    <div className="w-full flex lg:flex-col flex-row-reverse justify-between lg:justify-center lg:items-end items-center gap-2 lg:mt-10 mt-0 lg:py-10 py-0">
                        <div className="flex gap-2 relative z-99999">
                            {!isLiked(`${propDetail.id}`) ? <IoMdHeartEmpty onClick={() => toggleLike(`${propDetail?.id}`)} className={`text-2xl hover:scale-110 duration-200 cursor-pointer`} /> :
                                <IoMdHeart onClick={() => toggleLike(`${propDetail?.id}`)} fill="red" className={`text-2xl hover:scale-110 duration-200 cursor-pointer`} />}
                            <BiShareAlt title="Share Property" className="!text-2xl cursor-pointer rounded-md" />
                        </div>
                        <h2 className="text-2xl text-slate-600 font-semibold block mt-2">{propDetail?.propertyPrice} BHD </h2>
                    </div>

                </div>
                {/**Property Details */}
                <div className="w-full">
                    {/**Gallery area */}
                    <div className="w-full lg:h-[700px] h-auto flex justify-start items-start gap-3 flex-col lg:flex-row">
                        <div className="lg:w-[70%] w-full lg:h-full h-auto ">
                            <HeroImageView />
                            <div className="w-full lg:h-[100px] h-[60px] flex justify-start items-center gap-3 overflow-x-auto">
                                {galleryArr?.map((item, ndx) => {
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
                            {galleryArr && galleryArr.length > 0 && (
                                <div className="w-full flex flex-col gap-2">
                                    {(() => {
                                        let sideImages: any = [];

                                        if (galleryArr.length === 1) {
                                            sideImages = [galleryArr[0], galleryArr[0]];
                                        } else if (galleryArr.length === 2) {
                                            sideImages = [galleryArr[0], galleryArr[1]];
                                        } else if (galleryArr.length >= 3) {
                                            sideImages = galleryArr.slice(1, 3);
                                        }

                                        return sideImages.map((item: any, index: string | number) => (
                                            <div
                                                key={`${item.img}-${index}`}
                                                onClick={() => {
                                                    if (heroImage?.img !== item.img) setHeroImage(item);
                                                }}
                                                className="w-full h-[190px] lg:block hidden rounded-lg overflow-hidden cursor-pointer"
                                            >
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ));
                                    })()}
                                </div>
                            )}


                            {/* Video */}
                            <div className="w-full lg:h-[290px] h-[170px] rounded-lg overflow-hidden bg-gray-100 flex justify-center items-center">
                                {propDetail?.propertyVideo ? (
                                    <video
                                        src={propDetail.propertyVideo}
                                        className="w-full h-full object-cover"
                                        controls
                                        muted
                                    />
                                ) : (
                                    <div className="text-gray-500 text-sm text-center p-4">
                                        <p className="mb-1">📹 No Property Video</p>
                                        <p>Check back later or explore the gallery</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    {/**Details area - main */}
                    <div className="w-full flex justify-start items-start gap-2 lg:flex-row flex-col">
                        <div className="lg:w-[70%] w-full lg:my-3 my-0 mt-3">
                            <div className="w-full bg-white rounded-xl p-5 relative shadow-xl">
                                <h3 className="text-lg font-semibold text-slate-700">Property Description</h3>
                                {propDetail?.description?.length > 200 ? <p className={`text-md text-slate-600 w-full ${!showDescription ? 'h-auto' : 'lg:h-[100px] h-[200px]'} overflow-hidden duration-200`}>{propDetail?.description}</p> : null}{propDetail?.description?.length > 200 ? <span onClick={() => setShowDescription(!showDescription)} className="text-sm font-semibold cursor-pointer underline">show {showDescription ? 'less' : 'more'}</span> : null}
                                <div className="w-full mt-10">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Property Details</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(details).map(([key, value]: any, ndx) => (
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
                                    {propDetail?.amenities && JSON.parse(propDetail.amenities)?.map((item: string, ndx: number) => (
                                        <li key={ndx} className="lg:w-[32%] w-[48%] py-2 text-md text-slate-800 ">
                                            <SiTicktick className="inline-block mr-2 !text-xl text-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="w-full bg-white rounded-xl p-5 relative shadow-xl my-3">
                                <h3 className="text-lg font-semibold text-slate-700">Address</h3>
                                <div className="w-full flex justify-start items-start gap-4 flex-col">
                                    <h4 className="text-md font-semibold text-slate-700">Address : <span className="text-slate-600 !text-sm font-thin">{propDetail?.propertyAddress}</span></h4>
                                    <h4 className="text-md font-semibold text-slate-700">City : <span className="text-slate-600 !text-sm font-thin">{propDetail?.propertyCity}</span></h4>
                                    <h4 className="text-md font-semibold text-slate-700">State/county : <span className="text-slate-600 !text-sm font-thin">{propDetail?.propertyState}</span></h4>
                                </div>
                                <div className="w-full lg:h-[340px] h-[180px] rounded-xl overflow-hidden mt-3">
                                    <iframe
                                        src={mapURL}
                                        width="100%"
                                        height="100%"
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>

                            </div>
                        </div>
                        <div className="lg:w-[28%] w-full my-3">
                            {/** call to action */}
                            <ul className="w-full flex justify-center items-center gap-2 bg-white p-3 rounded-md shadow-xl">
                                <Link className="w-full" href={`tel:${propDetail?.propertyPhone ? propDetail?.propertyPhone : contactInfo?.phone}`}> <li className="w-full h-10 text-center flex justify-center items-center bg-primary rounded-sm shadow gap-2 text-md font-semibold text-white hover:bg-primary/80 cursor-pointer duration-200"><IoMdCall className="text-xl" /> Call</li></Link>
                                <Link className="w-full" href={`https://wa.me/${propDetail?.propertyWapp ? propDetail?.propertyWapp : contactInfo?.phone}?text=Is%20this%20property%20still%20available%3F`}>
                                    <li className="w-full h-10 bg-secondary flex justify-center items-center rounded-sm shadow gap-2 text-md font-semibold text-white hover:bg-secondary/80 cursor-pointer duration-200"><SiWhatsapp className="text-xl" /> Whatsapp</li></Link>
                            </ul>
                            {/**Request form */}
                            <div className="w-full my-3 rounded-lg bg-white p-3 shadow-2xl">
                                <h4 className="text-md font-semibold text-slate-600 text-center">SCHEDULE A VIEWING</h4>
                                <form onSubmit={(e) => e.preventDefault()} className="w-full flex justify-start items-center flex-col gap-3 mt-3">
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <FaUser className="text-2xl" /></span>
                                        <input
                                            type="text"
                                            onChange={onChangeEnquiryInputs}
                                            name='name'
                                            value={enquiryInputs.name}
                                            className="w-full h-full outline-none border-none p-2"
                                            placeholder="Full Name" />
                                        {enquiryInputErrs?.name && <p className="text-xs text-red-500">{enquiryInputErrs.name}</p>}
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <FaPhoneAlt className="text-2xl" /></span>
                                        <input
                                            type="number"
                                            onChange={onChangeEnquiryInputs}
                                            name='phone'
                                            value={enquiryInputs.phone}
                                            className="w-full h-full outline-none border-none p-2"
                                            placeholder="Phone" />
                                        {enquiryInputErrs?.phone && <p className="text-xs text-red-500">{enquiryInputErrs.phone}</p>}
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <AiOutlineMail className="text-2xl" /></span>
                                        <input
                                            type="email"
                                            onChange={onChangeEnquiryInputs}
                                            name='email'
                                            value={enquiryInputs?.email || ''}
                                            className="w-full h-full outline-none border-none p-2"
                                            placeholder="Email" />
                                        {enquiryInputErrs?.email && <p className="text-xs text-red-500">{enquiryInputErrs.email}</p>}
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <span className="p-2 bg-primary"> <MdOutlineFactory className="text-2xl" /></span>
                                        <input
                                            type="text"
                                            onChange={onChangeEnquiryInputs}
                                            name='company'
                                            value={enquiryInputs?.company || ''}
                                            className="w-full h-full outline-none border-none p-2"
                                            placeholder="Company" />
                                        {enquiryInputErrs?.company && <p className="text-xs text-red-500">{enquiryInputErrs.company}</p>}
                                    </div>
                                    <div className="w-full border border-slate-400 flex justify-center items-center">
                                        <textarea
                                            onChange={onChangeEnquiryInputs}
                                            name='message'
                                            value={enquiryInputs?.message || ''}
                                            className="w-full h-full outline-none border-none p-2 min-h-[100px]"
                                            placeholder="Message" />
                                    </div>
                                    {!isEnquirySubmitting ? <button onClick={() => onEnquirySubmit(submitEnquiry)} className="w-full p-2 bg-primary rounded-lg text-md text-white font-semibold flex justify-center items-center gap-2 cursor-pointer hover:bg-primary/80 duration-200">Submit a Request <FiExternalLink className="inline-block text-xl" /></button> : <Loader type="rings" color="white" className="w-full p-2 bg-primary rounded-lg text-md text-white font-semibold flex justify-center items-center gap-2 cursor-pointer hover:bg-primary/80 duration-200" />}
                                </form>
                            </div>
                            {/**similar properties */}
                            <div className="w-full flex justify-start items-center bg-white flex-col flex-wrap mt-3 shadow-2xl rounded-xl p-3">
                                <h4 className="text-lg font-semibold text-slate-600 text-center uppercase mb-2">Similar Properties</h4>
                                {similarProperties.length > 0 && similarProperties.slice(0, 3).map((item, ndx) => {
                                    return (
                                        <div key={ndx} className="group w-full min-h-[300px]">
                                            <div className="w-full h-[140px] relative">
                                                <div className="overflow-hidden w-full h-full">
                                                    <img src={`${item?.thumbnailImage}`} alt={item.title} className="w-full cursor-pointer group-hover:scale-110 duration-300 group-hover:rotate-2 h-full object-cover" />
                                                </div>

                                                <div className="absolute bottom-0 right-0  flex justify-end items-center p-1 gap-1">
                                                    <span className="text-white text-sm p-[4px] bg-black"> {JSON.parse(`${item?.galleryImage || `[]`}`).length} <IoImagesSharp className="text-white text-2xl  inline-block" /></span>{item?.propertyVideo && <IoMdVideocam className="text-white text-3xl bg-black p-[3px]" />}
                                                </div>
                                                <span className="absolute bottom-2 left-2 rounded-sm bg-secondary p-2 font-mono font-semibold text-md text-white px-4 shadow-2xl">{item?.propertyPrice} BHD {item?.propertyType == 'rent' ? '/mon' : ''}</span>
                                            </div>
                                            <div className="w-full h-[180px] px-3 py-5 border-[1px] border-slate-300 border-t-none bg-white">
                                                <Link href={`/properties/propertyDetails?pId=${item?.id}`}><h2 className="text-md font-semibold hover:underline text-slate-900 cursor-pointer">{item.title}</h2></Link>
                                                <p className="text-sm text-slate-600">{item?.propertyCity}</p>
                                                <span className="mt-3">{item?.bedrooms ? `${item?.bathrooms} ${item?.bathrooms}` : item?.propertySize}</span>
                                                <div className="w-full hidden md:hidden lg:hidden my-2 border-t-[1px] border-slate-300 xl:flex justify-between items-center">
                                                    <h4 className="w-full py-3 flex justify-start items-center text-md text-slate-800 capitalize">for {item?.propertyType}</h4>
                                                    <div className="w-full flex justify-end items-center gap-4">
                                                        <Link href={`/properties/propertyDetails?pId=${item?.id}`}><FiExternalLink className="text-2xl hover:scale-110 duration-200 cursor-pointer" /></Link> {!isLiked(`${item.id}`) ? <IoMdHeartEmpty onClick={() => toggleLike(`${item?.id}`)} className={`text-2xl hover:scale-110 duration-200 cursor-pointer`} /> :
                                                            <IoMdHeart onClick={() => toggleLike(`${item?.id}`)} fill="red" className={`text-2xl hover:scale-110 duration-200 cursor-pointer`} />}
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