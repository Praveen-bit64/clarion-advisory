'use client'
import { MdOutlineMyLocation } from "react-icons/md";
import Filter from "../icons/Filter";
import SliderCenterMode from "./SliderCenterMode";
// import locations from "@/app/data/locations.json"
import { useEffect, useMemo, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import GlobalModal from "./GlobalModal";
import FilterPopup from "./FilterPopup";
import { CiEdit } from "react-icons/ci";
import { useEditMode } from "../context/EditModeToggle";
import { useListedProperties } from "../context/ListedProperties";
import { useHomeComponentDetails } from "../context/HomeComponentDetails";
import { useUserDetails } from "../context/UserDetails";
import HeroBannerEdit from "./EditHomeComponents/HeroBannerEdit";
import { usePropertySchema } from "../context/PropertySchema";
import { useRouter } from "next/navigation";

interface editHomeComp {
    title: string,
    description: string,
    isvisible: boolean,
    galleryImg: any
}
const HeroBanner = () => {
    const router = useRouter()
    const { isEditMode } = useEditMode();
    const [locations, setLocations] = useState([{ name: '', type: '' }])
    const [suggestLocation, setSuggestLocation] = useState(locations)
    const [suggestion, setSuggestion] = useState(false)
    const [suggestionAddMore, setSuggestionAddMore] = useState<boolean>(false)
    const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
    const suggestionAddMoreRef = useRef<HTMLDivElement>(null)
    const [isAdavancedFilter, setIsAdvancedFilter] = useState(true)
    const [localSearch, setLocalSearch] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { heroBanner, featured_listings, footer } = useHomeComponentDetails()
    const { properties, setProperties } = useListedProperties()
    const { userDetails } = useUserDetails()
    const [input, setInput] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { propertySchema } = usePropertySchema()
    console.log(propertySchema, 23423);

    useEffect(() => {
        const locations = []

        if (Array.isArray(propertySchema?.cities)) {
            const cityLocations = propertySchema.cities.map(item => ({ name: item, type: 'city' }))
            locations.push(...cityLocations)
        }

        if (Array.isArray(propertySchema?.states)) {
            const stateLocations = propertySchema.states.map(item => ({ name: item, type: 'state' }))
            locations.push(...stateLocations)
        }

        if (Array.isArray(propertySchema?.countries)) {
            const countryLocations = propertySchema.countries.map(item => ({ name: item, type: 'country' }))
            locations.push(...countryLocations)
        }

        setLocations(locations)
    }, [propertySchema])



    const memoModal = useMemo(() => (
        <HeroBannerEdit isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    ), [isModalOpen])

    useEffect(() => {
        const stored = localStorage.getItem('localsearch');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setLocalSearch(parsed);
                } else {
                    setLocalSearch([]);
                }
            } catch {
                setLocalSearch([]);
            }
        }
    }, []);


    const bgImage = [
        { img: '/hero-banner-home.jpg', place: 'home' },
        { img: '/hero-bg-villa.jpg', place: 'villa' },
        { img: '/hero-bg-office.jpg', place: 'office' },
        { img: '/hero-bg-apartment.jpg', place: 'apartment' },
        { img: '/hero-bg-apartment-2.jpg', place: 'apartment' }
    ]
    const RenderItem = (props: { item: any }) => {
        const { img, place } = props.item
        return (
            <div className="w-full lg:h-[780px] h-[500px]">
                <img src={img} className="w-full h-full object-cover" alt={place} />
            </div>
        )
    }
    const handleSuggestLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSuggestionAddMore(false)
        if (value.trim()) {
            setSuggestion(true)
        } else {
            setSuggestion(false)
        }
        setInput(value);

        const filtered = locations.filter(item =>
            item.name.toLowerCase().includes(value)
        );
        setSuggestLocation(filtered);

    };
    const handleLocation = (value: string) => {
        // 1. Update selected locations
        setSelectedLocation(prev => {
            if (!prev.includes(value)) {
                return [...prev, value];
            }
            return prev;
        });

        // 2. Update local search history (limit to 5 recent)
        let updatedHistory = [value, ...localSearch.filter(item => item !== value)];
        updatedHistory = updatedHistory.slice(0, 5); // limit to 5

        localStorage.setItem("localsearch", JSON.stringify(updatedHistory));
        setLocalSearch(updatedHistory);

        // 3. Reset input and suggestions
        setSuggestion(false);
        setInput('');
    };

    const handleRemoveSelected = (value: string) => {
        const removeSelected = selectedLocation.filter(item => item !== value)
        setSelectedLocation(removeSelected)
    }
    const handleAddMore = () => {
        setSuggestionAddMore(true)
        setSuggestion(false)
    }
    useEffect(() => {
        const handleSuggestionCloseOutside = (e: MouseEvent) => {
            if (
                suggestionAddMoreRef.current &&
                !suggestionAddMoreRef.current.contains(e.target as Node)
            ) {
                setSuggestionAddMore(false);
            }
        };

        document.addEventListener("mousedown", handleSuggestionCloseOutside);

        return () => {
            document.removeEventListener("mousedown", handleSuggestionCloseOutside);
        };
    }, []);


    const memoizedSlider = useMemo(() => {
        return (
            <SliderCenterMode
                itemArray={bgImage}
                itemPerView={1}
                centerMode={false}
                RenderItem={RenderItem}
                dots={false}
            />
        );
    }, []);


    //Basic filter from herobanner
    const [basicFil, setBasicFil] = useState({
        pType: '',
        sType: '',
        location: [{}]
    })
    const handlePtype = (e: any) => {
        const { name, value } = e.target
        setBasicFil((prev) => ({
            ...prev,
            [name]: value
        }))
        setIsOpen(true)
    }
    useEffect(() => {
        setBasicFil((prev) => ({
            ...prev,
            location: selectedLocation
        }))
    }, [selectedLocation])
    console.log(basicFil, selectedLocation, "basicFill");

    const getIsAdvandedFilterCb = (value: boolean) => {
        setIsAdvancedFilter(value)
    }
    const handleNavigate = (value: string) => {
        const queryParams = new URLSearchParams();
        queryParams.append('search', value);
        router.push(`/property?${queryParams.toString()}`);
    }
    return (
        <>
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <FilterPopup getIsAdvandedFilterCb={getIsAdvandedFilterCb} basicFil={basicFil} locationss={locations} isOpen={true} onClose={() => setIsOpen(false)} />
            </GlobalModal>
            {<div className="w-full lg:h-[780px] h-[500px] relative z-1 group">
                {isModalOpen && memoModal}
                {isEditMode && <div className="absolute w-full hidden min-h-full bg-primary/30 top-0 left-0 z-9999 group-hover:flex justify-center items-start border-4 border-rose-500">
                    <CiEdit onClick={() => setIsModalOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
                </div>}
                <div className="w-full h-full absolute bg-primary/40 top-0 left-0 z-10"></div>
                <div className="bg-gradient-to-b from-black/70 to-transparent h-[300px] w-full absolute z-11"></div>
                {memoizedSlider}
                <div className="w-full absolute lg:top-[100px] top-[50px] left-0  z-99 flex justify-center items-center flex-col gap-3">
                    {/* <p className="captilize lg:text-xl text-md text-white">{heroBanner.title.split('').slice(0,)}</p> */}
                    <h1 className="lg:text-5xl text-2xl text-white font-bold">{heroBanner.title}</h1>
                    <p className="lg:text-xl w-[90%] text-md flex justify-center items-center text-center text-white">{heroBanner.description}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center absolute lg:top-10 top-24 z-99">
                    <div className="lg:w-[70%] w-[90%] lg:h-[70px] h-[170px] bg-white rounded-2xl flex flex-col lg:flex-row lg:justify-start justify-center lg:pt-0 pt-5 items-center px-3 relative rounded-tl-none gap-0 lg:gap-1.5">
                        <div className="w-[140px] h-[50px] bg-white absolute top-[-50px] left-0 rounded-lg rounded-b-none border-b-2 border-b-slate-100">
                            <ul className="w-full h-full flex justify-around items-center text-slate-500">
                                <li onClick={() => setBasicFil((prev) => ({ ...prev, sType: 'rent' }))} className={` ${basicFil.sType === 'rent' ? '!text-secondary border-b-2' : ''} cursor-pointer font-semibold hover:text-slate-700 duration-200 border-b-0 p-2 border-b-primary hover:border-b-2`}>Rent</li>
                                <li onClick={() => setBasicFil((prev) => ({ ...prev, sType: 'sale' }))} className={`${basicFil.sType === 'sale' ? '!text-secondary border-b-2' : ''} cursor-pointer font-semibold hover:text-slate-700 duration-200 border-b-0 p-2 border-b-primary hover:border-b-2`}>Buy</li>
                            </ul>
                        </div>
                        <div className="lg:w-[60%] w-full h-[60%] rounded-md bg-slate-100 outline-none border-none px-2 flex lg:justify-start justify-center items-center relative">
                            <MdOutlineMyLocation className="w-auto flex justify-start items-start" />
                            {selectedLocation.length > 0 ? selectedLocation.slice(0, 1).map((loc, ndx) => {
                                return (
                                    <span key={ndx} onClick={() => handleRemoveSelected(loc)} className="w-[200px] p-1 bg-secondary/60 text-slate-800 m-1 rounded-md flex justify-between items-center">{loc.slice(0.25)}<GrClose className="text-red-400 cursor-pointer" /></span>
                                )
                            }) : null}
                            {selectedLocation.length > 1 ? <button onClick={handleAddMore} className="w-[50px] h-8 rounded-full bg-secondary/45 text-sm font-semibold text-slate-950 flex justify-center items-center cursor-pointer hover:bg-secondary/65 duration-200">+{selectedLocation.length - 1}</button> : null}
                            {<input type="text" value={input} onChange={handleSuggestLocation} className="w-full outline-none border-none px-2 " placeholder={`${selectedLocation.length > 0 ? 'Add More+' : 'Enter Location to Search...'}`} />}
                            {suggestion && <div className="absolute w-[70%] bg-white z-99 top-10 left-0 shadow-md ">
                                <ul className="w-full max-h-[250px] custom-scrollbar overflow-y-auto px-5 py-1">
                                    {suggestLocation.map((loc, ndx) => {
                                        return (
                                            <li key={ndx} onClick={() => handleLocation(loc.name)} className="text-md text-slate-500 py-2 hover:bg-slate-200 hover:border-b-2 border-secondary pl-2 hover:scale-105 cursor-pointer duration-100">{loc.name} <span className={`w-full text-end text-xs ${loc.type === 'city' ? 'text-secondary' : loc.type === 'state' ? 'text-primary' : loc.type === 'country' ? 'text-orange-600' : ''}`}>{loc.type}</span></li>
                                        )
                                    })}
                                </ul>
                            </div>}
                            {suggestionAddMore && selectedLocation.length > 0 &&
                                <div ref={suggestionAddMoreRef} className="absolute lg:w-[80%] w-full bg-white  z-99 top-12 left-0 shadow-md ">
                                    <div className="w-full lg:max-h-[280px] px-4 border-t-2 border-slate-400 mt-2 pb-2">
                                        <div className="w-full max-h-[100px] overflow-y-auto custom-scrollbar flex justify-start items-center] flex-wrap">
                                            {selectedLocation.map((loc, ndx) => {
                                                return (

                                                    <span key={ndx} onClick={() => handleRemoveSelected(loc)} className="w-[120px] p-1 bg-secondary/60 min-h-[35px] text-slate-800 m-1 rounded-md flex justify-between items-center">{loc.slice(0, 25)}<GrClose className="text-red-400 cursor-pointer" /></span>
                                                )
                                            })}
                                        </div>
                                        {localSearch.length > 0 && <div className="w-full h-[90px] mb-6">
                                            <h2 className="text-md text-slate-950 font-semibold">Recent Search</h2>
                                            <ul className="w-full h-[85px] overflow-y-auto custom-scrollbar flex justify-start items-center flex-wrap gap-2">
                                                {localSearch.map((item, ndx) => (
                                                    <li
                                                        key={ndx}

                                                        onClick={() => handleLocation(item)}
                                                        className="w-[100px] p-1 bg-slate-100 border-2 border-slate-300 rounded-md cursor-pointer hover:bg-slate-200"
                                                    >
                                                        {item.slice(0, 9)}
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>}
                                        <div className="w-full lg:h-[70px] h-auto">
                                            <h2 className="text-md text-slate-950 font-semibold">Discover</h2>
                                            <ul className="w-full flex justify-start items-center gap-2 flex-wrap">
                                                {footer.discover.map((loc, ndx) => {
                                                    return (
                                                        <li onClick={() => handleNavigate(loc)} key={ndx} className="w-[100px] p-1 bg-slate-100 border-2 border-slate-300 rounded-md">{loc}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="lg:w-[40%] w-full h-full flex justify-start items-center">
                            <select
                                onChange={handlePtype}
                                name="pType"
                                className="w-full max-w-xs p-3 rounded-lg border-2 border-slate-100 bg-white text-gray-800 focus:outline-none focus:ring-0 cursor-pointer hover:bg-slate-100"
                            >
                                {propertySchema?.propertyType?.map((type, ndx) => {
                                    return (
                                        <option key={ndx} value={type}>{type}</option>

                                    )
                                })}

                            </select>
                            <div className="border-2 border-slate-100 p-2 flex justify-start items-center cursor-pointer bg-secondary rounded-md hover:bg-secondary/90">
                                <Filter fill="black" stroke="white" />
                                <button className="cursor-pointer text-white" onClick={() => setIsOpen(true)}>Advanced</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default HeroBanner;