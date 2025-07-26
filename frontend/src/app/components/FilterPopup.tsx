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
import { usePropertySchema } from "../context/PropertySchema";

type PropertyType = {
    name: string;
};

type FilterPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    basicFil?: any
    locationss?: any
    getIsAdvandedFilterCb: any
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
    location?: string[];
};

const FilterPopup = ({ isOpen, onClose, basicFil, locationss, getIsAdvandedFilterCb }: FilterPopupProps) => {
    const router = useRouter();
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>(getPropertyTypes);
    const [bedrooms, setBedrooms] = useState<string[]>([]);
    const [filtertypes] = useState<string[]>(["sale", "rent"]);
    const [locations, setLocations] = useState<string[]>([]);
    const [sizeOptions, setSizeOptions] = useState<number[]>([]);
    const [maxSizeOptions, setMaxSizeOptions] = useState<number[]>([]);
    const [getLocation, setGetLocation] = useState<string[]>([])
    const { propertySchema } = usePropertySchema()
    const furnishingOptions = ["Furnished", "Semi Furnished", "Unfurnished"];
    const [selected, setSelected] = useState("rent");
    const locationInputRef = useRef<HTMLInputElement>(null);

    const [filterprops, setFilterProps] = useState<FilterProps>({
        filterType: "rent",
        property: "Apartment",
        furnished: [],
        size: { minSize: 0, maxSize: 0 },
        budget: { min: 0, max: 0, err: false }
    });
    useEffect(() => {
        if (Array.isArray(locationss)) {
            setGetLocation(locationss?.map(loc => loc.name))
        }
    }, [locationss])


    useEffect(() => {
        if (basicFil) {
            setFilterProps((prev) => ({
                ...prev,
                filterType: basicFil?.sType || 'rent',
                property: basicFil?.pType || 'Apartment'
            }))
            setLocations(() => ([
                ...basicFil.location
            ]))
        }
    }, [basicFil])
    console.log(filterprops, basicFil, locations, 'filterprops');


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
        getIsAdvandedFilterCb(true)
        onClose()
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-y-auto custom-scrollbar max-h-[90vh] p-4 md:p-6"
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-black text-xl font-bold rounded-full hover:bg-red-200 duration-200 p-1 md:p-2 cursor-pointer"
                aria-label="Close filter popup"
            >
                <GrClose />
            </button>

            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 flex justify-start items-center gap-2">
                <RiListSettingsFill className="inline-block text-2xl md:text-3xl" />
                Advanced Property Search
            </h2>

            <div className="w-full h-[1px] bg-slate-300 mb-3 md:mb-4"></div>

            <div className="flex flex-col justify-start items-start gap-4 md:gap-6">
                {/* Rent / Buy */}
                <div className="w-full">
                    <div className="flex flex-col sm:flex-row justify-start sm:justify-center items-start sm:items-center gap-2 w-full">
                        {filtertypes.map((option) => (
                            <div key={option} className="relative flex justify-center items-center w-full sm:w-auto">
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
                                    className={`cursor-pointer w-full text-center px-4 py-2 md:px-12 md:py-2 rounded-md border-2 transition-all duration-300 ${filterprops.filterType === option
                                        ? "bg-secondary text-white border-secondary"
                                        : "bg-white border-gray-300 text-gray-700"
                                        } font-medium`}
                                >
                                    {option === 'rent' ? 'Rent' : 'Buy'}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Type */}
                <div className="w-full">
                    <label className="block text-sm md:text-md font-semibold text-gray-600 mb-1">Select Property</label>
                    <div className="w-full flex flex-wrap justify-start items-center gap-2">
                        {propertySchema?.propertyType && propertySchema?.propertyType.map((type) => (
                            <React.Fragment key={type}>
                                <input
                                    type="radio"
                                    name="propertyType"
                                    id={type}
                                    value={type}
                                    className="peer hidden"
                                    checked={filterprops.property === type}
                                    onChange={() =>
                                        setFilterProps(prev => ({
                                            ...prev,
                                            property: type,
                                        }))
                                    }
                                />
                                <label
                                    className={`${filterprops.property === type
                                        ? "bg-secondary text-white"
                                        : "bg-secondary/10 border border-secondary/60"
                                        } text-slate-700 text-sm md:text-md cursor-pointer px-2 py-1 md:px-3 md:py-1 rounded whitespace-nowrap`}
                                    htmlFor={type}
                                >
                                    {type}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Locations (multi-select simulation) */}
                <div className="relative w-full md:w-[95%]">
                    <label className="block text-sm md:text-md font-semibold text-gray-600 mb-1 md:mb-2">
                        Select Location(s)
                    </label>

                    <div className="w-full border border-slate-300 rounded-sm px-2 py-1 md:px-3 md:py-2 flex flex-wrap gap-1 md:gap-2 bg-white min-h-[42px]">
                        {/* Selected Locations */}
                        {locations.map((place) => (
                            <div
                                key={place}
                                className="bg-secondary/70 min-w-[80px] md:min-w-[100px] text-slate-800 text-xs md:text-sm px-2 py-0.5 md:px-3 md:py-1 rounded-sm shadow-sm flex justify-between items-center"
                                onClick={() => handleRemoveTag(place)}
                            >
                                <span className="truncate max-w-[70px] md:max-w-none">{place}</span>
                                <GrClose className="text-red-400 cursor-pointer ml-1 md:ml-2 text-xs md:text-sm" />
                            </div>
                        ))}

                        {/* Input Field */}
                        <input
                            type="text"
                            onChange={handleLocation}
                            ref={locationInputRef}
                            placeholder={`${locations.length > 0 ? 'Add More+' : 'Enter locations'}`}
                            className="flex-grow min-w-[100px] border-none outline-none text-sm md:text-md text-gray-700 py-1 bg-transparent placeholder-gray-400"
                        />
                    </div>

                    {/* Dropdown Suggestions */}
                    {suggLocation && (
                        <div className="absolute w-full md:w-[70%] max-h-[180px] custom-scrollbar overflow-y-auto bg-white/95 shadow-md rounded-sm mt-1 z-20 border border-gray-300">
                            {locationDropDown.map((loc) => (
                                <h2
                                    key={loc}
                                    className="px-3 py-1.5 md:px-4 md:py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer truncate"
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
                {filterprops.property !== 'Office Space' && filterprops.property !== 'Warehouse' && filterprops.property !== 'Land' && (
                    <div className="w-full">
                        <label className="block text-sm md:text-md font-semibold text-gray-600 mb-1">Bedrooms</label>
                        <div className="w-full flex flex-wrap gap-1 md:gap-2">
                            {propertySchema?.bedroomSizes && propertySchema?.bedroomSizes.map((item) => {
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
                                            className={`cursor-pointer px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-md flex justify-center items-center rounded ${selectedBedrooms.includes(item)
                                                ? "bg-secondary text-white"
                                                : "border border-secondary/70 bg-secondary/10"
                                                }`}
                                        >
                                            {item}
                                        </label>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Size */}
                {(filterprops.property === 'Office Space' || filterprops.property === 'Warehouse' || filterprops.property === 'Land') && (
                    <div className="w-full">
                        <label className="block text-sm md:text-md font-semibold text-gray-600 mb-1">Size (SQM)</label>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex flex-col">
                                <select
                                    className="w-full bg-secondary/10 text-sm md:text-md text-slate-700 p-2 md:p-3 border border-gray-300 rounded-sm outline-none"
                                    onChange={handleSize}
                                    name="minSize"
                                >
                                    {sizeOptions.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                <span className="ml-1 text-primary font-mono text-xs md:text-sm">Min</span>
                            </div>

                            {true && (
                                <div className="flex flex-col">
                                    <select
                                        name="maxSize"
                                        onChange={handleSize}
                                        className="w-full bg-secondary/10 text-sm md:text-md text-slate-700 p-2 md:p-3 border border-gray-300 rounded-sm outline-none"
                                    >
                                        {maxSizeOptions.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                        <option value={''}>{'2000&Above'}</option>
                                    </select>
                                    <span className="ml-1 text-primary font-mono text-xs md:text-sm">Max</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Furnishing */}
                <div className="w-full">
                    <label className="block text-sm md:text-md font-semibold text-gray-600 mb-1 md:mb-2">Furnishing</label>
                    <div className="flex justify-start items-center gap-2 flex-wrap">
                        {furnishingOptions.map((item) => (
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
                                    className={`cursor-pointer p-1 md:p-2 text-xs md:text-sm text-slate-700 rounded text-center ${filterprops.furnished.includes(item)
                                        ? "bg-secondary/90 text-white"
                                        : "border border-secondary/70 bg-secondary/10"
                                        }`}
                                >
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price / Rent */}
                <div className="w-full">
                    <label className="block text-sm md:text-md font-semibold text-gray-600 mb-1">Rent / Price</label>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex flex-col">
                            <input
                                type="number"
                                name="minBudget"
                                placeholder="Min amount"
                                value={filterprops.budget.min || ''}
                                onChange={handleBudget}
                                className="w-full bg-secondary/10 text-sm md:text-md text-slate-700 p-2 md:p-3 border border-gray-300 rounded-sm outline-none"
                            />
                            <span className="ml-1 text-primary font-mono text-xs md:text-sm">Min</span>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="number"
                                name="maxBudget"
                                value={filterprops.budget.max || ''}
                                onChange={handleBudget}
                                placeholder="Max amount"
                                className={`w-full bg-secondary/10 text-sm md:text-md text-slate-700 p-2 md:p-3 border border-gray-300 rounded-sm outline-none ${filterprops.budget.err ? 'border-red-500' : ''
                                    }`}
                            />
                            <span className="ml-1 text-primary font-mono text-xs md:text-sm">Max</span>
                        </div>
                    </div>
                    {filterprops.budget.err && (
                        <p className="text-red-500 text-xs mt-1">Max budget must be greater than min budget</p>
                    )}
                </div>

                <div className="w-full h-[1px] bg-slate-300 mt-2 md:mt-4"></div>

                {/* Submit Button */}
                <div className="w-full flex flex-col-reverse sm:flex-row justify-between sm:justify-end gap-3 mt-0">
                    <button
                        onClick={handleResetFilter}
                        className="px-4 py-2 text-sm md:text-md bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Reset Filters
                    </button>
                    <button
                        onClick={handleRedirect}
                        className="px-4 py-2 md:px-6 md:py-3 bg-primary text-sm md:text-md font-semibold text-white rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
                    >
                        <IoMdDoneAll className="text-lg md:text-xl" />
                        <span>Search Now</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default FilterPopup;