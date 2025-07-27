'use client'
import Link from "next/link";
import GlobalContainer from "../components/GlobalContainer";
import { RiArrowDownWideFill } from "react-icons/ri";
import Filter from "../icons/Filter";
import { JSX, useEffect, useMemo, useRef, useState, useCallback } from "react";
import GlobalModal from "../components/GlobalModal";
import FilterPopup from "../components/FilterPopup";
import propertyData from '@/app/data/propertyData.json';
import { FiExternalLink } from "react-icons/fi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoBed, IoImagesSharp } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
import { useListedProperties } from "../context/ListedProperties";
import { useLikes } from "../context/LikeContext";
import { usePropertyFilter } from "../hooks/usePropertyFilter";
import { usePropertySchema } from "../context/PropertySchema";
import { FaBath } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { useRouter, useSearchParams } from "next/navigation";
import NoResults from "../components/NoResults";
import { CgClose } from "react-icons/cg";

const Page = () => {
    const router = useRouter();
    const [dropdown, setDropDown] = useState({
        status: false,
        place: '',
    });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { properties } = useListedProperties();
    const [sortOption, setSortOption] = useState<'none' | 'lowToHigh' | 'highToLow'>('none')
    const [isAdavancedFilter, setIsAdvancedFilter] = useState(false)
    const [filteredProperties, setFilteredProperties] = useState(properties);
    const { isLiked, toggleLike } = useLikes();
    const { filters, manages } = usePropertyFilter();
    const { propertySchema } = usePropertySchema();
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();

    // Memoize search parameters
    const searchFilters = useMemo(() => ({
        propertyType: searchParams?.get('pType'),
        searchType: searchParams?.get('sType'),
        rawLocation: searchParams?.get('pLocation'),
        furnished: searchParams?.get('frnsh')?.split(",") || [],
        bedroomss: searchParams?.get('beds')?.split(",") || [],
        minSize: Number(searchParams?.get('mnsize')) || 0,
        maxSize: Number(searchParams?.get('mxsize')) || 0,
        minBudget: Number(searchParams?.get('mnbug')) || 0,
        maxBudget: Number(searchParams?.get('mxbug')) || 0,
    }), [searchParams]);


    useEffect(() => {
        if (searchFilters.propertyType) {
            setIsAdvancedFilter(true)
        }
    }, [searchFilters.propertyType])

    // Memoize locations from property schema
    const locations = useMemo(() => {
        const locs = [];
        if (Array.isArray(propertySchema?.cities)) {
            locs.push(...propertySchema.cities.map(item => ({ name: item, type: 'city' })));
        }
        if (Array.isArray(propertySchema?.states)) {
            locs.push(...propertySchema.states.map(item => ({ name: item, type: 'state' })));
        }
        if (Array.isArray(propertySchema?.countries)) {
            locs.push(...propertySchema.countries.map(item => ({ name: item, type: 'country' })));
        }
        return locs;
    }, [propertySchema]);

    // Filter properties based on URL search params
    const filterBySearchParams = useCallback((properties: any[]) => {
        if (!properties || properties.length === 0) return [];

        const {
            propertyType, searchType, rawLocation, furnished, bedroomss,
            minSize, maxSize, minBudget, maxBudget
        } = searchFilters;

        const filtLocation = rawLocation ? rawLocation.split(",") : [];

        return properties.filter(item => {
            // Property type filter
            if (propertyType && item.propertyCategory.toLowerCase() !== propertyType.toLowerCase()) {
                return false;
            }

            // Search type filter
            if (searchType && item.propertyType.toLowerCase() !== searchType.toLowerCase()) {
                return false;
            }

            // Location filter
            if (filtLocation.length > 0 && !filtLocation.some(loc =>
                item.propertyCity?.toLowerCase().includes(loc.toLowerCase().trim()) ||
                item.propertyState?.toLowerCase().includes(loc.toLowerCase().trim()) ||
                item.propertyCountry?.toLowerCase().includes(loc.toLowerCase().trim())
            )) {
                return false;
            }

            // Bedrooms filter
            if (bedroomss.length > 0 && !bedroomss.some(bed =>
                String(item.bedrooms) === bed.trim()
            )) {
                return false;
            }

            // Furnished filter
            if (furnished.length > 0 && !furnished.some(frn =>
                String(item.furnished).toLowerCase().includes(frn.toLowerCase().trim())
            )) {
                return false;
            }

            // Price range filter
            if (minBudget > 0 && Number(item.propertyPrice) < minBudget) {
                return false;
            }

            if (maxBudget >= minBudget && maxBudget !== 0 && Number(item.propertyPrice) > maxBudget) {
                return false;
            }

            // Size range filter
            if (minSize > 0 && Number(item.propertySize) < minSize) {
                return false;
            }

            if (maxSize >= minSize && maxSize !== 0 && Number(item.propertySize) > maxSize) {
                return false;
            }

            return true;
        });
    }, [searchFilters]);

    // Filter properties based on context filters
    const filterByContextFilters = useCallback((properties: any[]) => {
        if (!properties) return [];

        let filtered = [...properties];

        if (filters.filterByType) {
            filtered = filtered.filter(
                prop => prop.propertyType?.toLowerCase() === filters.filterByType.toLowerCase()
            );
        }

        if (filters.filterByCat) {
            filtered = filtered.filter(
                prop => prop.propertyCategory?.toLowerCase() === filters.filterByCat.toLowerCase()
            );
        }

        if (filters.filterByBeds) {
            filtered = filtered.filter(
                prop => String(prop?.bedrooms) === String(filters.filterByBeds)
            );
        }

        return filtered;
    }, [filters]);

    // Combine all filters
    useEffect(() => {
        if (!properties) return;

        let filtered = filterBySearchParams(properties);
        filtered = filterByContextFilters(filtered);

        setFilteredProperties(filtered);
    }, [properties, filterBySearchParams, filterByContextFilters]);

    // Sort properties
    const handleSortProperties = useCallback((value: string) => {
        if (value === 'all') {
            setFilteredProperties(properties);
            return;
        }

        const sorted = [...filteredProperties];
        sorted.sort((a, b) =>
            value === 'lowToHigh'
                ? Number(a.propertyPrice) - Number(b.propertyPrice)
                : Number(b.propertyPrice) - Number(a.propertyPrice)
        );

        setFilteredProperties(sorted);
    }, [filteredProperties, properties]);

    // Dropdown handlers
    const handleDropDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const place = e.currentTarget.dataset.place || '';
        setDropDown(prev => ({
            status: prev.place !== place || !prev.status,
            place: prev.place !== place || !prev.status ? place : ''
        }));
    }, []);

    // Click outside dropdown handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropDown({ status: false, place: '' });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Dropdown components
    const DropDown = () => {
        const componentMap: Record<string, () => JSX.Element> = {
            sType: () => (
                <ul className="w-full flex justify-center items-start flex-col">
                    <li onClick={() => manages.manageRemoveFilter('propType')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">All</li>
                    <li onClick={() => manages.manageAddFilter('rent', 'propType')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Rent</li>
                    <li onClick={() => manages.manageAddFilter('sale', 'propType')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">Sale</li>
                </ul>
            ),
            pType: () => (
                <ul className="w-full flex justify-center items-start flex-col">
                    <li onClick={() => manages.manageAddFilter('', 'propCat')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">All</li>
                    {propertySchema?.propertyType?.map((type, ndx) => (
                        <li key={ndx} onClick={() => manages.manageAddFilter(`${type}`, 'propCat')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">{type}</li>
                    ))}
                </ul>
            ),
            bedrooms: () => (
                <ul className="w-full flex justify-center items-start flex-col">
                    <li onClick={() => manages?.manageAddFilter(``, 'byBeds')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">All</li>
                    {propertySchema?.bedroomSizes?.map((beds, ndx) => (
                        <li key={ndx} onClick={() => manages?.manageAddFilter(`${beds}`, 'byBeds')} className="py-2 px-4 hover:bg-secondary w-full text-start hover:text-white">{beds}</li>
                    ))}
                </ul>
            )
        };

        const CompToRender = componentMap[dropdown?.place];
        return (
            <div ref={dropdownRef} className="absolute w-full min-h-[100px] bg-white top-11 left-0 z-99 shadow-lg shadow-secondary/10">
                {dropdown.place.trim() && <CompToRender />}
            </div>
        );
    };

    // Render property card
    const renderPropertyCard = (item: any, ndx: number) => {
        type FeatureTag = 'Featured' | 'New' | 'Trending' | 'false';
        const featureTag = (item.featureTag as FeatureTag) || 'false';
        const featureTagClass = {
            'Featured': 'bg-gradient-to-r from-amber-400 to-yellow-500',
            'New': 'bg-gradient-to-r from-sky-500 to-cyan-600',
            'Trending': 'bg-gradient-to-r from-pink-500 to-rose-600',
            'false': 'bg-gray-400'
        }[featureTag];

        return (
            <div key={ndx} className="group lg:w-[32%] w-full min-h-[400px]">
                <div className="w-full h-[250px] relative">
                    <span className="absolute top-0 right-0 bg-black/50 p-2 text-sm font-semibold font-mono text-white">{item.furnished}</span>
                    <div className="overflow-hidden w-full h-full">
                        <img src={`${item?.thumbnailImage}`} alt={item.title} className="w-full cursor-pointer group-hover:scale-110 duration-300 group-hover:rotate-2 h-full object-cover" />
                    </div>
                    {item?.featureTag && item?.featureTag !== 'false' && (
                        <span className={`absolute top-3 left-3 px-4 py-1.5 text-sm font-bold rounded-full shadow-lg ring-1 ring-white transition-all duration-300 ease-in-out group-hover:top-5 group-hover:opacity-0 ${featureTagClass} text-white`}>
                            {item.featureTag}
                        </span>
                    )}
                    <div className="absolute bottom-0 right-0 flex justify-end items-center p-1 gap-1">
                        <span className="text-white text-sm p-[4px] bg-black">
                            {JSON.parse(`${item?.galleryImage || '[]'}`).length} <IoImagesSharp className="text-white text-2xl inline-block" />
                        </span>
                        {item?.propertyVideo && <IoMdVideocam className="text-white text-3xl bg-black p-[3px]" />}
                    </div>
                    <span className="absolute bottom-2 left-2 rounded-sm bg-secondary p-2 font-mono font-semibold text-md text-white px-4 shadow-2xl">
                        BHD {item?.propertyPrice}{item?.propertyType === 'rent' ? '/mon' : ''}
                    </span>
                </div>
                <div className="w-full h-[160px] px-3 py-5 border-[1px] border-slate-300 border-t-none bg-white">
                    <Link href={item.customSlug ? `/${item.customSlug}?pId=${item?.id}` : `/properties/propertyDetails?pId=${item?.id}`}>
                        <h2 className="text-md font-semibold hover:underline text-slate-900 cursor-pointer">{item.title}</h2>
                    </Link>
                    <p className="text-sm text-slate-600">{item?.propertyCity}</p>
                    {item.isBedroomAvailable === '1' && (
                        <>
                            <span><IoBed className="inline mx-1" />{item?.bedrooms}</span>
                            <span><FaBath className="inline mx-1" />{item?.bathrooms}</span>
                        </>
                    )}
                    <span><TbRulerMeasure className="inline mx-1" />{item?.propertySize} sqms</span>
                    <div className="w-full my-2 border-t-[1px] border-slate-300 flex justify-between items-center">
                        <h4 className="w-full py-3 flex justify-start items-center text-md text-slate-800 capitalize font-semibold">for {item?.propertyType}</h4>
                        <div className="w-full flex justify-end items-center gap-4">
                            <Link href={`/properties/propertyDetails?pId=${item?.id}`}>
                                <FiExternalLink className="text-2xl hover:scale-110 duration-200 cursor-pointer" />
                            </Link>
                            {!isLiked(`${item?.id}`) ?
                                <IoMdHeartEmpty onClick={() => toggleLike(`${item?.id}`)} className="text-2xl hover:scale-110 duration-200 cursor-pointer" /> :
                                <IoMdHeart onClick={() => toggleLike(`${item?.id}`)} fill="red" className="text-2xl hover:scale-110 duration-200 cursor-pointer" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const handleAdvancedFilterBand = () => {
        setIsAdvancedFilter(false)
        router.push(`/properties`);
    }
    const getIsAdvandedFilterCb = (value: boolean) => {
        setIsAdvancedFilter(value)
    }

    return (
        <>
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <FilterPopup getIsAdvandedFilterCb={getIsAdvandedFilterCb} locationss={locations} basicFil={null} isOpen={true} onClose={() => setIsOpen(false)} />
            </GlobalModal>
            <div className="w-full h-auto bg-slate-100 flex justify-center items-start pb-14">
                <GlobalContainer>
                    <div className="w-full flex justify-start items-start flex-col gap-2 mt-10 py-10">
                        <h2 className="text-3xl text-slate-700 font-semibold">Explore our Prime Properties</h2>
                        <div className="flex justify-start items-center gap-1 text-sm text-slate-700">
                            <Link href={'/'} className="hover:text-secondary duration-200">Home</Link>/
                            <Link href={'#'} className="hover:text-secondary duration-200">properties</Link>
                        </div>
                    </div>
                    <div className="w-full h-12 flex justify-start items-center flex-col lg:flex-row gap-2">
                        {!isAdavancedFilter ? <div className="lg:w-[70%] w-full flex justify-start gap-1 items-center">
                            {['sType', 'pType', 'bedrooms'].map((filterType) => (
                                <div
                                    key={filterType}
                                    onClick={handleDropDown}
                                    data-place={filterType}
                                    className="relative hidden lg:flex justify-start items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center"
                                >
                                    <input
                                        type="text"
                                        value={
                                            filterType === 'sType' ? ` ${filters.filterByType ? 'For ' + filters.filterByType : 'Sale Type'}` :
                                                filterType === 'pType' ? ` ${filters.filterByCat || 'Property Type'}` :
                                                    ` ${filters.filterByBeds || 'Bedrooms'}`
                                        }
                                        className="outline-none cursor-pointer w-full text-center select-none text-md"
                                        readOnly
                                    />
                                    <RiArrowDownWideFill className="text-2xl" />
                                    {dropdown.status && dropdown.place === filterType && <DropDown />}
                                    {filters[filterType === 'sType' ? 'filterByType' :
                                        filterType === 'pType' ? 'filterByCat' : 'filterByBeds'] && (
                                            <div className="w-full h-full absolute bg-amber-500/20 z-99 top-0 left-0 rounded-2xl flex justify-start items-center">
                                                <span
                                                    onClick={() => manages.manageRemoveFilter(
                                                        filterType === 'sType' ? 'propType' :
                                                            filterType === 'pType' ? 'propCat' : 'byBeds'
                                                    )}
                                                    className="w-[25px] flex justify-center items-center rounded-full h-[25px] bg-white/70 p-1 hover:bg-amber-600 text-red-500 text-md cursor-pointer"
                                                >
                                                    X
                                                </span>
                                            </div>
                                        )}
                                </div>
                            ))}
                            <div
                                onClick={() => setIsOpen(true)}
                                className="flex justify-center items-center border p-2 w-full cursor-pointer border-slate-100 bg-white rounded-2xl text-center"
                            >
                                <span className="outline-none cursor-pointer w-full text-center select-none text-md">
                                    <Filter classname="inline-block mr-2" />More Filter
                                </span>
                            </div>
                        </div> :
                            <>
                                <div className="w-full bg-amber-500 p-2 flex justify-start items-center gap-2">
                                    <CgClose fill="red" onClick={handleAdvancedFilterBand} className="bg-red-500 p-2 text-white text-3xl rounded-full inline mr-1.5 cursor-pointer" />
                                    <span className="inline text-white font-semibold font-mono">Advanced Filter : {searchFilters.propertyType}, {searchFilters.searchType} & more..</span>
                                </div>
                            </>}
                        <div className="lg:w-[40%] w-full flex justify-end items-center">
                            <span className="text-sm text-slate-500">Sort by</span>
                            <select
                                onChange={(e) => handleSortProperties(e.target.value)}
                                className="p-1 outline-none"
                            >
                                <option value="all">Newest</option>
                                <option value="lowToHigh">Price: Low to High</option>
                                <option value="highToLow">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-4 flex-wrap mt-16">
                        {filteredProperties.length > 0 ?
                            filteredProperties?.filter(item => item.propertyStatus.toLowerCase() === 'publish')?.map(renderPropertyCard) :
                            <NoResults />
                        }
                    </div>
                </GlobalContainer>
            </div>
        </>
    );
};

export default Page;