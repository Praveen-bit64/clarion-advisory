'use client'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import Switcher from "./Switcher";
import GlobalModal from "./GlobalModal";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useEditMode } from "../context/EditModeToggle";
import Link from "next/link";
import { useContact } from "../context/ContactContext";
import { useSiteInfo } from "../context/SiteInfoContext";
import { useSocialData } from "../context/SocialLinksContext";
import FooterEdit from "./EditHomeComponents/FooterEdit";
import { useHomeComponentDetails } from "../context/HomeComponentDetails";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface getcontact {
    phone?: string,
    email?: string,
    address?: string
}

const Footer = () => {
    const router = useRouter()
    const { isEditMode } = useEditMode();
    const [isEnabled, setIsEnabled] = useState(true);
    const { contactInfo } = useContact();
    const { siteInfo } = useSiteInfo()
    const { socialData } = useSocialData()
    const [subscribe, setSubscribe] = useState('')
    const [isSubscribing, setIsSubscribing] = useState(false)
    const { footer } = useHomeComponentDetails()
    console.log(footer, "footerfooter");
    const [popularSearches, setPopularSearches] = useState<string[]>([]);
    const [discoverLocations, setDiscoverLocations] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'searches' | 'locations'>('searches');
    console.log(popularSearches, "popularSearches");

    useEffect(() => {
        setPopularSearches(footer.popularsearch)
        setDiscoverLocations(footer.discover)
    }, [footer])
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

    const handleSubscribe = async () => {
        setIsSubscribing(true)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegex.test(subscribe)) {
            toast.info('Enter a valid Email!!')
            setIsSubscribing(false)
            return
        }

        try {
            const res = await fetch('/api/subscribtion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: subscribe })
            })

            const data = await res.json()
            if (!data.error) {
                toast.success(data?.message || 'Subscribed')
                setSubscribe('')
            } else {
                toast.error(data?.message || 'Try again')
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
            console.error(error)
        } finally {
            setIsSubscribing(false)
        }
    }


    const memoModal = useMemo(() => (
        <FooterEdit
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
        { icon: FaXTwitter, link: socialData?.twitter || '#', colorCode: 'rgb(206,210,205)' },
        { icon: FaFacebookF, link: socialData?.facebook || '#', colorCode: 'rgb(24,119,242)' },
        { icon: FaInstagram, link: socialData?.insta || '#', colorCode: 'rgb(228,64,95)' },
        { icon: FaLinkedin, link: socialData?.linkedin || '#', colorCode: 'rgb(0,119,181)' },
    ];

    const handleNavigate = (value: string) => {
        const queryParams = new URLSearchParams();
        queryParams.append('search', value);
        router.push(`/property?${queryParams.toString()}`);
    }

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
                    <div className="lg:w-[200px] w-[150px] h-[70px] overflow-hidden p-1">
                        <img src={`${siteInfo?.siteLogo}`} className="w-full h-full object-contain bg-slate-100 rounded-md" alt={siteInfo?.siteName} />
                    </div>

                    <div className="w-full flex justify-start items-center gap-3 lg:flex-row flex-col flex-wrap">
                        <div className="rounded-lg p-5 bg-white/10 w-full">
                            <p className="text-sm text-slate-300">Toll Free Customer Care</p>
                            {/* <h4 className="text-md text-slate-50 font-semibold">11</h4> */}
                            <h4 className="text-md text-slate-50 font-semibold">{contactInfo?.phone}</h4>
                        </div>
                        <div className="rounded-lg p-5 bg-white/10 w-full">
                            <p className="text-sm text-slate-300">Need Support?</p>
                            <h4 className="text-md text-slate-50 font-semibold w-full flex-wrap break-words">{contactInfo?.email}</h4>
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
                                type="email"
                                onChange={(e) => setSubscribe(e.target.value)}
                                value={subscribe}
                                placeholder="Enter Email"
                                className="w-full h-full p-3 text-slate-300 outline-none bg-transparent"
                                required
                            />
                            <button onClick={handleSubscribe} className="text-md font-semibold cursor-pointer text-secondary inline">{isSubscribing ? 'Sending..' : 'Subscribe'}</button>
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-start gap-4 flex-wrap">
                        <div className="min-w-[150px]">
                            <h2 className="text-md text-slate-100 font-semibold">Popular Search</h2>
                            <ul>
                                {popularSearches.length > 0 && popularSearches?.map((search, index) => (
                                    <li
                                        onClick={() => handleNavigate(search)}
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
                                        onClick={() => handleNavigate(location)}
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
                <p className="capitalize text-slate-100">©{footer?.copyright || ''}</p>
            </div>
        </div>
    );
};

export default Footer;