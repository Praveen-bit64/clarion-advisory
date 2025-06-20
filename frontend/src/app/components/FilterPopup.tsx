"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import getPropertyTypes from "@/app/data/propertyTypes.json";
import getLocation from "@/app/data/locationss.json";
import getBedrooms from "@/app/data/bedrooms.json";
import getSize from "@/app/data/size.json";
import { useRouter } from "next/navigation";
import { GrClose } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";


type PropertyType = {
    name: string;
    // Add other properties if they exist in your JSON
};

type FilterPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

type FilterProps = {
    filterType: string;
    property: string;
    furnished: string[];
    size: {
        minSize: string | number;
        maxSize: string | number;
    };
    budget: {
        min: number;
        max: number;
        err: boolean;
    };
    location?: string[]; // Added as it's used but not in initial state
};

const FilterPopup = ({ isOpen, onClose }: FilterPopupProps) => {
    const router = useRouter();
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>(getPropertyTypes);
    const [bedrooms, setBedrooms] = useState<string[]>([]);
    const [filtertypes] = useState<string[]>(["Buy", "Rent"]);
    const [locations, setLocations] = useState<string[]>([]);
    const [sizeOptions, setSizeOptions] = useState<number[]>([]);
    const [maxSizeOptions, setMaxSizeOptions] = useState<number[]>([]);
    const furnishingOptions = ["Furnished", "Semi Furnished", "Unfurnished"];
    const [selected, setSelected] = useState("rent");
    const locationInputRef = useRef<HTMLInputElement>(null);

    //for filter 
    const [filterprops, setFilterProps] = useState<FilterProps>({
        filterType: "Rent",
        property: "Apartment",
        furnished: [],
        size: { minSize: 0, maxSize: 0 },
        budget: { min: 0, max: 0, err: false }
    });

    // useEffect(() => {
    //     const sugges
    // } ,[])

    const [suggLocation, setSuggLocation] = useState(false);
    const [locationDropDown, setLocationDropDown] = useState<string[]>([]);
    const [showMoreProp, setShowMoreProp] = useState(false);
    const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);

    const handleResetFilter = () => {
        setFilterProps((prev) => ({
            ...prev,
            property: "Apartment",
            furnished: [],
            size: { minSize: 0, maxSize: 0 },
            budget: { min: 0, max: 0, err: false }
        }));
        setLocations([]);
        setSelectedBedrooms([]);
    };

    useEffect(() => {
        const bedroomsData = getBedrooms[filterprops.property as keyof typeof getBedrooms] || [];
        const sizeData = getSize[filterprops.property as keyof typeof getSize] || [];
        setBedrooms(bedroomsData && bedroomsData.length > 0 ? bedroomsData : []);
        setSizeOptions(sizeData && sizeData.length > 0 ? sizeData : []);
        setMaxSizeOptions(sizeData && sizeData.length > 0 ? sizeData : []);
    }, [filterprops.property]);

    if (!isOpen) return null;

    const handleFilterType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilterProps((prev) => ({
            ...prev,
            filterType: value
        }));
    };

    const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSuggLocation(true);
        setLocationDropDown(getLocation.filter(item => item.toLowerCase().includes(value.toLowerCase())));
    };

    const handleRemoveTag = (val: string) => {
        setLocations((prev) => prev.filter(item => item.toLowerCase() !== val.toLowerCase()));
    };

    const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const size = e.target.value;
        const name = e.target.name as "minSize" | "maxSize";

        const sizeIdx = sizeOptions.findIndex((s) => s === Number(size));

        if (sizeIdx !== -1 && name !== "maxSize") {
            const filtered = sizeOptions.slice(sizeIdx);
            setMaxSizeOptions(filtered);
        }

        if (size && name) {
            setFilterProps((prev) => ({
                ...prev,
                size: { ...prev.size, [name]: size }
            }));
        }
    };

    const handleFurnished = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isAlreadyHad = filterprops.furnished.includes(value);

        setFilterProps(prev => ({
            ...prev,
            furnished: isAlreadyHad
                ? prev.furnished.filter(item => item !== value)
                : [...prev.furnished, value]
        }));
    };

    const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as "minBudget" | "maxBudget";
        const value = Number(e.target.value);

        if (isNaN(value)) return;

        if (name === 'maxBudget' && value < filterprops.budget.min) {
            setFilterProps((prev) => ({
                ...prev,
                budget: {
                    ...prev.budget,
                    err: true
                }
            }));
        } else {
            setFilterProps((prev) => ({
                ...prev,
                budget: {
                    ...prev.budget,
                    err: false
                }
            }));
        }

        setFilterProps((prev) => ({
            ...prev,
            budget: {
                ...prev.budget,
                [name === 'minBudget' ? 'min' : 'max']: value
            }
        }));
    };

    const handleRedirect = () => {
        const {
            property,
            filterType,
            size: { minSize, maxSize },
            furnished,
            budget: { min, max }
        } = filterprops;

        const queryParams = new URLSearchParams();

        queryParams.append('pType', property);
        queryParams.append('sType', filterType);

        if (locations.length > 0) {
            queryParams.append('pLocation', locations.join(','));
        }

        if (selectedBedrooms.length > 0) {
            queryParams.append('beds', selectedBedrooms.join(','));
        } else {
            queryParams.append('mnsize', minSize.toString());
            if (maxSize !== 0) queryParams.append('mxsize', maxSize.toString());
        }

        if (furnished.length > 0) {
            queryParams.append('frnsh', furnished.join(','));
        }

        if (min !== 0) queryParams.append('mnbug', min.toString());
        if (max !== 0) queryParams.append('mxbug', max.toString());

        router.push(`/properties?${queryParams.toString()}`);
    };

    return (
        <div className="flex items-center justify-center backdrop-blur-sm px-2 overflow-y-auto">
            {/* <div className="w-full flex justify-center items-center pb-[100px]"> */}
            <div
                className="bg-white w-full max-w-3xl rounded-2xl p-8 pb-2 shadow-2xl absolute top-5"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold rounded-full hover:bg-red-200 duration-200 p-2 cursor-pointer"
                >
                    <GrClose />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex justify-start items-center gap-2"><RiListSettingsFill className="inline-block text-3xl" /> Advanced Property Search</h2>
                <div className="w-full h-[1px] bg-slate-300 mb-4"></div>
                <div className="flex flex-col justify-start items-start gap-6">
                    {/* Rent / Buy */}
                    <div className="relative">
                        <div className="flex justify-center items-center gap-2">
                            {filtertypes.map((option) => (
                                <div key={option} className="relative flex justify-center items-center">
                                    <input
                                        type="radio"
                                        name="rentbuy"
                                        id={option}
                                        value={option}
                                        checked={filterprops.filterType === option}
                                        onChange={handleFilterType}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={option}
                                        className={`cursor-pointer w-full px-12 py-2 rounded-md border-2 transition-all duration-300 ${filterprops.filterType === option ? "bg-secondary text-white" : "bg-white"} border-gray-300 text-gray-700 font-medium`}
                                    >
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="relative">
                        <label className="block text-md font-semibold text-gray-600 mb-1">Select Property</label>
                        <div className="w-full h-full flex justify-start items-center gap-2 flex-wrap">
                            {propertyTypes.map((type) => {
                                return (
                                    <React.Fragment key={type.name}>
                                        <input
                                            type="radio"
                                            name="propertyType"
                                            id={type.name}
                                            value={type.name}
                                            className="peer hidden"
                                            checked={filterprops.property === type.name}
                                            onChange={() =>
                                                setFilterProps(prev => ({
                                                    ...prev,
                                                    property: type.name,
                                                }))
                                            }
                                        />
                                        <label
                                            className={`${filterprops.property === type.name ? "bg-secondary text-white" : "bg-secondary/10 border-1 border-secondary/60"} text-slate-700 text-md cursor-pointer px-3 py-1 rounded`}
                                            htmlFor={type.name}
                                        >
                                            {type.name}
                                        </label>
                                    </React.Fragment>
                                );
                            })}
                            {/* <h5
                                onClick={() => setShowMoreProp(!showMoreProp)}
                                className="cursor-pointer px-3 py-1 rounded underline text-blue-600"
                            >
                                Show {`${showMoreProp ? "Less" : "More"}`}...
                            </h5> */}
                        </div>
                    </div>

                    {/* Locations (multi-select simulation) */}
                    <div className="relative w-[80%]">
                        <label className="block text-md font-semibold text-gray-600 mb-2">
                            Select Location(s)
                        </label>

                        <div className="w-full border border-slate-300 rounded-sm px-3 py-2 flex flex-wrap gap-2 bg-white">
                            {/* Selected Locations */}
                            {locations.map((place) => (
                                <div
                                    key={place}
                                    className="bg-secondary/70 min-w-[100px] text-slate-800 text-sm px-3 py-1 rounded-sm shadow-sm flex justify-between items-center"
                                    onClick={() => handleRemoveTag(place)}
                                >
                                    {place} <GrClose className="text-red-400 cursor-pointer ml-2" />
                                </div>
                            ))}

                            {/* Input Field */}
                            <input
                                type="text"
                                onChange={handleLocation}
                                ref={locationInputRef}
                                placeholder={`${locations.length > 0 ? 'Add More+' : 'Enter locations'}`}
                                className="flex-grow w-auto border-none outline-none text-md text-gray-700 py-1 bg-transparent placeholder-gray-400"
                            />
                        </div>

                        {/* Dropdown Suggestions */}
                        {suggLocation && (
                            <div className="absolute w-[70%] max-h-[180px] custom-scrollbar overflow-y-auto bg-white/95 shadow-md rounded-sm mt-1 z-20 border border-gray-300">
                                {locationDropDown.map((loc) => (
                                    <h2
                                        key={loc}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                                        onClick={() => {
                                            setLocations(prev => prev.includes(loc) ? prev : [...prev, loc]);
                                            setLocationDropDown([]);
                                            if (locationInputRef.current) {
                                                locationInputRef.current.value = "";
                                            }
                                            setSuggLocation(false);
                                        }}
                                    >
                                        {loc}
                                    </h2>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bedrooms */}
                    {bedrooms.length > 0 && <div className="relative">
                        <label className="block text-md font-semibold text-gray-600 mb-1">Bedrooms</label>
                        <div className="w-full flex flex-wrap gap-2">
                            {bedrooms.length > 0 ? bedrooms.map((item) => {
                                const isChecked = selectedBedrooms.includes(item);

                                return (
                                    <React.Fragment key={item}>
                                        <input
                                            type="checkbox"
                                            name="bedrooms"
                                            id={`bedroom-${item}`}
                                            checked={isChecked}
                                            onChange={(e) => {
                                                if (!isChecked) {
                                                    setSelectedBedrooms((prev) => [...prev, item]);
                                                } else {
                                                    setSelectedBedrooms((prev) => prev.filter((bed) => bed !== item));
                                                }
                                            }}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`bedroom-${item}`}
                                            className={`cursor-pointer px-3 py-1 text-md flex justify-center items-center rounded ${selectedBedrooms.includes(item) ? "bg-secondary text-white " : "border-1 border-secondary/70 bg-secondary/10"}`}
                                        >
                                            {item}
                                        </label>
                                    </React.Fragment>
                                );
                            }) : <span>Not Applicable for {filterprops.property}.</span>}
                        </div>
                    </div>}

                    {/* Size */}
                    {sizeOptions.length > 0 && <div className="relative ">
                        <label className="block text-md font-semibold text-gray-600 mb-1">Size (SQM)</label>
                        <div className="w-full flex justify-center items-center gap-2">

                            <div className="w-full flex justify-start items-start flex-col">
                                <select
                                    className="w-full min-w-[200px] bg-secondary/10 text-md text-slate-700 p-3 border border-gray-300 rounded-sm py-2 px-3 outline-none"
                                    onChange={handleSize}
                                    name="minSize"
                                >
                                    {sizeOptions.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>

                                <span className="ml-1 text-primary font-mono">Min</span>
                            </div>

                            {maxSizeOptions.length > 0 && (
                                <div className="w-full flex justify-start items-start flex-col">
                                    <select
                                        name="maxSize"
                                        onChange={handleSize}
                                        className="w-full min-w-[200px] bg-secondary/10 text-md text-slate-700 p-3 border border-gray-300 rounded-sm py-2 px-3 outline-none"
                                    >
                                        {maxSizeOptions.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <span className="ml-1 text-primary font-mono">Max</span>
                                </div>
                            )}
                        </div>
                    </div>}

                    {/* Furnishing */}
                    <div className="relative">
                        <label className="block text-md font-semibold text-gray-600 mb-2">Furnishing</label>
                        <div className="w-full flex justify-start items-center gap-2 flex-wrap">
                            {furnishingOptions.map((item) => {
                                return (
                                    <div key={item} className="">
                                        <input
                                            type="checkbox"
                                            name="furnished"
                                            onChange={handleFurnished}
                                            id={item}
                                            value={item}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={item}
                                            className={`cursor-pointer p-2 text-slate-700 rounded ${filterprops.furnished.includes(item) ? "bg-secondary/90 text-white" : "border-1 border-secondary/70 bg-secondary/10"}`}
                                        >
                                            {item}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Price / Rent */}
                    <div className="relative">
                        <label className="block text-md font-semibold text-gray-600 mb-1">Rent / Price</label>
                        {/* <div className="w-full flex justify-center items-center gap-1" >
                            <div className="flex flex-col w-full">
                                <input
                                    type="text"
                                    name="minBudget"
                                    placeholder="Min amount"
                                    value={filterprops.budget.min || ''}
                                    onChange={handleBudget}
                                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <span className="ml-1 text-red-800">Min</span>
                            </div>
                            -
                            <div className="flex flex-col w-full">
                                <input
                                    type="text"
                                    name="maxBudget"
                                    value={filterprops.budget.max || ''}
                                    onChange={handleBudget}
                                    placeholder="max amount"
                                    className={`w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 ${!filterprops.budget.err ? 'focus:ring-blue-500' : 'focus:ring-red-500'} outline-none`}
                                />
                                <span className="ml-1 text-red-800">Max</span>
                            </div>
                        </div> */}
                        <div className="w-full flex justify-center items-center gap-2">

                            <div className="w-full flex justify-start items-start flex-col">
                                <select
                                    className="w-full min-w-[200px] bg-secondary/10 text-md text-slate-700 p-3 border border-gray-300 rounded-sm py-2 px-3 outline-none"
                                    onChange={handleSize}
                                    name="minSize"
                                >
                                    {sizeOptions.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>

                                <span className="ml-1 text-primary font-mono">Min</span>
                            </div>

                            {(
                                <div className="w-full flex justify-start items-start flex-col">
                                    <select
                                        name="maxSize"
                                        onChange={handleSize}
                                        className="w-full min-w-[200px] bg-secondary/10 text-md text-slate-700 p-3 border border-gray-300 rounded-sm py-2 px-3 outline-none"
                                    >
                                        {maxSizeOptions.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <span className="ml-1 text-primary font-mono">Max</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-slate-300 mt-4"></div>
                    {/* Submit Button */}
                    <div className="w-full flex justify-end mt-0 gap-5">
                        <div
                            className="flex justify-center items-center underline text-primary cursor-pointer"
                            onClick={handleResetFilter}
                        >
                            Reset Filters
                        </div>
                        <button
                            onClick={handleRedirect}
                            className="px-6 py-3 bg-primary text-md font-semibold text-white rounded-md cursor-pointer hover:bg-primary/80"
                        >
                            <IoMdDoneAll className="inline-block text-2xl text-white" /> Search Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default FilterPopup;