'use client'
import Link from "next/link";
import GlobalContainer from "../components/GlobalContainer";
import { useListedProperties } from "../context/ListedProperties";
import { useEffect, useState } from "react";
import { IoBed, IoImagesSharp } from "react-icons/io5";
import { IoMdHeart, IoMdHeartEmpty, IoMdVideocam } from "react-icons/io";
import { FaBath } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import { useLikes } from "../context/LikeContext";
import NoResults from "../components/NoResults";
import { useSearchParams } from "next/navigation";
import { usePropertySchema } from "../context/PropertySchema";

const page = () => {
    const { properties } = useListedProperties();
    const [filteredProperties, setFilteredProperties] = useState(properties);
    const { isLiked, toggleLike } = useLikes();
    const { propertySchema } = usePropertySchema()
    const searchParams = useSearchParams();

    const search = searchParams?.get('search')

    useEffect(() => {
        if (!properties) return;

        const searchLower = search?.toLowerCase() || "";

        const knownCategories = propertySchema?.propertyType || [];
        const knownTypes = ['rent', 'sale'];

        const matchedCategory = knownCategories.find(cat => searchLower.includes(cat.toLowerCase()));
        const matchedType = knownTypes.find(type => searchLower.includes(type));

        const filtered = properties.filter(item => {
            const isCategoryMatch = matchedCategory
                ? item.propertyCategory?.toLowerCase() === matchedCategory.toLowerCase()
                : false;

            const isTypeMatch = matchedType
                ? item.propertyType?.toLowerCase() === matchedType
                : false;

            const isLocationMatch = item.propertyCity?.toLowerCase().includes(searchLower) ||
                item.propertyState?.toLowerCase().includes(searchLower) ||
                item.propertyCountry?.toLowerCase().includes(searchLower);

            const isTitleMatch = item.title?.toLowerCase().includes(searchLower);

            // ANY match
            return isCategoryMatch || isTypeMatch || isLocationMatch || isTitleMatch;
        });

        setFilteredProperties(filtered);
    }, [search, properties, propertySchema]);




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
    return (
        <div className="w-full h-auto bg-slate-100 flex justify-center items-start pb-14">
            <GlobalContainer>
                <div className="w-full flex justify-start items-start flex-col gap-2 mt-10 py-10">
                    <h2 className="text-3xl text-slate-700 font-semibold">{search}</h2>
                    <div className="flex justify-start items-center gap-1 text-sm text-slate-700">
                        <Link href={'/'} className="hover:text-secondary duration-200">Home</Link>/
                        <Link href={'#'} className="hover:text-secondary duration-200">properties</Link>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center gap-4 flex-wrap mt-2">
                    {filteredProperties.length > 0 ?
                        filteredProperties?.filter(item => item.propertyStatus.toLowerCase() === 'publish')?.map(renderPropertyCard) :
                        <NoResults />
                    }
                </div>
            </GlobalContainer>
        </div>
    );
}

export default page;