import { useEffect, useState } from "react";
import GlobalModal from "../GlobalModal";
import { MdDeleteOutline, MdOutlineAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useHomeComponentDetails } from "@/app/context/HomeComponentDetails";

const FooterEdit = ({
    isOpen,
    setIsOpen,
    popularSearches,
    discoverLocations,
    onAddSearch,
    onRemoveSearch,
    onAddLocation,
    onRemoveLocation,
    activeTab,
    setActiveTab
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    popularSearches: string[];
    discoverLocations: string[];
    onAddSearch: (search: string) => void;
    onRemoveSearch: (search: string) => void;
    onAddLocation: (location: string) => void;
    onRemoveLocation: (location: string) => void;
    activeTab: 'searches' | 'locations' | 'testimonial';
    setActiveTab: (tab: any) => void;
}) => {
    const [inputValue, setInputValue] = useState('');
    const { footer } = useHomeComponentDetails()
    const [testimonails, setTestimonails] = useState([{ name: '', id: '' }])
    console.log(footer, 785374953);

    const [copyright, setCopyright] = useState(footer?.copyright || '')
    useEffect(() => {
        setCopyright(footer.copyright)
    }, [footer])

    const fetchTestimonails = async () => {
        const res = await fetch('/api/fetchtestimonails', { method: 'GET' });
        const data = await res.json();

        if (!data.error) {
            setTestimonails(data.testimonails);
        }
    };
    const handleDeleteUser = async (id: string) => {
        const res = await fetch('api/deletetestimonail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        const data = await res.json()

        if (!data.error) {
            toast.success("Review Deleted!")
            fetchTestimonails()
        } else {
            toast.error(data?.message || 'Try after sometimes')
        }
    }

    useEffect(() => {
        fetchTestimonails();
    }, []);

    const handleAdd = () => {
        if (activeTab === 'searches') {
            onAddSearch(inputValue);
        } else {
            onAddLocation(inputValue);
        }
        setInputValue('');
    };
    const handleSubmit = async () => {
        const res = await fetch('/api/homecomponents/setfooter', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ copyright: copyright, popularsearch: popularSearches, discover: discoverLocations })
        })
        const data = await res.json()
        if (!data.error) {
            toast.success("Footer Details Upadated")
            setIsOpen(false)

        } else {
            toast.error(data?.message || "There was an error")
            setIsOpen(false)
        }
    }

    return (
        <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                <div className="w-full flex justify-center items-center gap-2">
                    <div className="w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                        {/* Tab Selector */}
                        <div className="flex border-b border-gray-300 mb-4">
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'searches' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('searches')}
                            >
                                Popular Searches
                            </button>
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'locations' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('locations')}
                            >
                                Discover Locations
                            </button>
                            <button
                                className={`py-2 px-4 font-medium ${activeTab === 'testimonial' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('testimonial')}
                            >
                                Testimonials
                            </button>
                        </div>

                        {/* Content based on active tab */}
                        {activeTab === 'searches' ? (
                            <>
                                {popularSearches.length < 9 && <div className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1">
                                    <input
                                        type="text"
                                        name="newsearch"
                                        placeholder="Add New Search"
                                        onChange={(e) => setInputValue(e.target.value)}
                                        value={inputValue}
                                        className="w-full p-2 outline-none"
                                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                    />
                                    <MdOutlineAdd
                                        onClick={handleAdd}
                                        className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200"
                                    />
                                </div>}

                                {popularSearches.map((item, ndx) => (
                                    <div key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1">
                                        <IoClose
                                            onClick={() => onRemoveSearch(item)}
                                            className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200"
                                        />
                                        {item}
                                    </div>
                                ))}
                            </>
                        ) : activeTab === 'testimonial' ? (
                            <div className="w-full">
                                <ul className="w-full flex justify-start items-start flex-col gap-1  h-[350px] overflow-y-auto custom-scroll">
                                    {testimonails.map((item, ndx) => {
                                        return (
                                            <li key={ndx} className="w-full flex justify-between items-start  p-1 bg-secondary/10 border border-white">{item?.name} <MdDeleteOutline onClick={() => handleDeleteUser(item?.id)} color="red" /></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ) :

                            (
                                <>
                                    {discoverLocations.length < 7 && <div className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1">
                                        <input
                                            type="text"
                                            name="newlocation"
                                            placeholder="Add New Location"
                                            onChange={(e) => setInputValue(e.target.value)}
                                            value={inputValue}
                                            className="w-full p-2 outline-none"
                                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                        />
                                        <MdOutlineAdd
                                            onClick={handleAdd}
                                            className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200"
                                        />
                                    </div>}

                                    {discoverLocations.map((item, ndx) => (
                                        <div key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1">
                                            <IoClose
                                                onClick={() => onRemoveLocation(item)}
                                                className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </>
                            )}
                    </div>
                </div>
                <div className="w-full p-3">
                    <h4>Edit Copyright Content</h4>
                    <input onChange={(e) => setCopyright(e.target.value)} value={copyright} type="text" placeholder="Enter Copyright" className="w-full p-2 outline-none border-2 border-slate-100" name="" id="" />
                </div>
                <div className="w-full flex justify-end items-end pt-3 gap-2">
                    <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                    <button onClick={handleSubmit} className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                </div>
            </div>
        </GlobalModal>
    );
};
export default FooterEdit