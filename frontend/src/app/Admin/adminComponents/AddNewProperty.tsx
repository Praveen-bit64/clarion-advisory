'use client'
import GlobalModal from "@/app/components/GlobalModal";
import Switcher from "@/app/components/Switcher";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type PropertyDetail = {
    property: string;
    value: string;
};
type modalContent = 'addproperty' | 'addamenity' | ''

const AddNewProperty = () => {
    const [formNav, setFormNav] = useState(0)
    const [slugInput, setSlugInput] = useState('');
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true)
    const [modalContent, setModalContent] = useState<modalContent>('')
    const enables = (value: boolean) => {
        setIsEnabled(value)
    }
    const [addProperty, setAddProperty] = useState({
        property: '',
        value: ''
    })
    const [propertyDetailsArr, setPropertyDetailsArr] = useState<PropertyDetail[]>([])
    const handleAddInputs = (e: any) => {
        const { name, value } = e.target;
        setAddProperty((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    console.log(propertyDetailsArr, 43242);

    const managePropertyDetails = () => {
        setPropertyDetailsArr((prev) => ([
            ...prev,
            addProperty
        ]))
        setAddProperty({ property: '', value: '' })
        setIsOpen(false)

    }
    const AddPropertyModal = ({
        isOpen,
        onClose,
        onSave
    }: {
        isOpen: boolean;
        onClose: () => void;
        onSave: (detail: PropertyDetail) => void;
    }) => {
        const [detail, setDetail] = useState<PropertyDetail>({ property: '', value: '' });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setDetail(prev => ({ ...prev, [name]: value }));
        };

        const handleSave = () => {
            if (detail.property.trim() && detail.value.trim()) {
                onSave(detail);
                setDetail({ property: '', value: '' });
                onClose();
            }
        };

        return (
            <GlobalModal isOpen={isOpen} onClose={onClose}>
                {modalContent === 'addproperty' && <div className="w-full bg-secondary/90 p-5 flex flex-col gap-4">
                    <h4 className="text-2xl font-semibold text-white text-center">
                        Custom Fields
                    </h4>

                    <input
                        type="text"
                        name="property"
                        value={detail.property}
                        onChange={handleChange}
                        placeholder="Field Name"
                        className="w-full p-3 bg-white/80 rounded-md outline-none"
                    />

                    <input
                        type="text"
                        name="value"
                        value={detail.value}
                        onChange={handleChange}
                        placeholder="Field Value"
                        className="w-full p-3 bg-white/80 rounded-md outline-none"
                    />

                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={onClose}
                            className="w-20 p-2 bg-amber-600 text-white font-semibold rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="w-20 p-2 bg-primary text-white font-semibold rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>}
            </GlobalModal>
        );
    };

    const handleSaveDetail = (detail: PropertyDetail) => {
        setPropertyDetailsArr(prev => [...prev, detail]);
    };
    const handleRemoveCustomProperty = (value: string) => {
        setPropertyDetailsArr((prev) => prev.filter(item => item.property !== value))
    }

    const memoAddPropertyModal = useMemo(() => (
        <AddPropertyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveDetail}
        />
    ), [isModalOpen, modalContent]);



    //5th section form handles
    const [amenities, setAmenities] = useState(["Swimming Pool",
        "Gym/Fitness Center",
        "Parking Space",
        "24/7 Security",
        "Elevator",
        "Garden/Green Space",
        "Playground",
        "Wi-Fi/Internet Access",
        "Pet-Friendly Area",
        "Community Hall"])
    const [amenitiesAvail, setAmenitiesAvail] = useState<string[]>([])
    console.log(amenitiesAvail, 234234);

    const handleAmenities = (amenity: string) => {
        if (amenitiesAvail.includes(amenity)) {
            setAmenitiesAvail((prev) => prev.filter(ele => ele !== amenity))
        } else {

            setAmenitiesAvail((prev) => [...prev, amenity])
        }
    }
    const AddAmenity = (props: { isOpen: boolean, onClose: () => void }) => {
        const [input, setInput] = useState('')
        const { isOpen, onClose } = props
        const handleSave = () => {
            const amenityAlreadyAvail = amenities.filter(
                item => item.toLowerCase() === input.toLowerCase()
            );

            if (input.trim() && amenityAlreadyAvail.length > 0) {
                setInput('');
                setIsModalOpen(false);
            } else if (input.trim()) {
                setAmenities(prev => [...prev, input]);
                setInput('');
                setIsModalOpen(false);
            }
        };

        console.log(amenities, 'ameniteyes');

        return (
            <GlobalModal isOpen={isOpen}
                onClose={onClose}
            >
                <div className="w-full bg-secondary/90 p-5 flex flex-col gap-4">
                    <h4 className="text-2xl font-semibold text-white text-center">
                        Add New
                    </h4>

                    <input
                        type="text"
                        name="property"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Field Name"
                        className="w-full p-3 bg-white/80 rounded-md outline-none"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={onClose}
                            className="w-20 p-2 bg-amber-600 text-white font-semibold rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="w-20 p-2 bg-primary text-white font-semibold rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </GlobalModal>
        )
    }
    const memoAddAmenityModal = useMemo(() => (
        <AddAmenity
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        // onSave={handleSaveDetail}
        />
    ), [isModalOpen, modalContent]);
    return (
        <div className=" w-full flex justify-center items-center flex-col">
            {modalContent === 'addproperty' ? memoAddPropertyModal : modalContent === 'addamenity' ? memoAddAmenityModal : null}
            {/**Navigation */}
            <div className="w-[500px] flex justify-center items-center my-3 mb-10 relative duration-200 transition-all ease-linear">
                <span className="w-[30px] h-[30px] p-2 rounded-full bg-green-600 text-xl text-white flex justify-center items-center font-semibold">1</span>
                <span className={`w-[140px] h-[4px] ${formNav > 0 ? 'bg-green-600' : 'bg-slate-400'} duration-200 transition-all ease-linear`}></span><span className="absolute top-10 left-[-35px] font-mono">Description</span>
                <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 0 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>2</span>
                <span className={`w-[140px] h-[4px] ${formNav > 1 ? 'bg-green-600' : 'bg-slate-400'} duration-200 transition-all ease-linear`}></span><span className="absolute top-10 left-[80px] font-mono">Media & SEO</span>
                <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 1 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>3</span>
                <span className={`w-[140px] h-[4px] ${formNav > 2 ? 'bg-green-600' : 'bg-slate-400'}`}></span><span className="absolute top-10 left-[220px] font-mono">Location</span>
                <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 2 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>4</span>
                <span className={`w-[140px] h-[4px] ${formNav > 3 ? 'bg-green-600' : 'bg-slate-400'}`}></span><span className="absolute top-10 left-[345px]  font-mono">Detail</span>
                <span className={`w-[30px] h-[30px] p-2 rounded-full ${formNav > 3 ? 'bg-green-600' : 'bg-slate-400'} text-xl text-white flex justify-center items-center font-semibold`}>5</span><span className="absolute top-10 left-[455px] font-mono">Amenities</span>
            </div>
            {/**Form area */}
            <div className="bg-white rounded-xl  w-[60%] p-5 py-10">
                {formNav === 0 ?
                    //1st section 
                    <div className="w-full flex justify-center items-start gap-5 flex-col ">
                        <h2 className="text-xl text-slate-700 font-semibold">Property Description</h2>
                        <div className="w-full flex justify-start items-start flex-col gap-1.5">
                            <label htmlFor="title" className="text-md font-semibold">Title</label>
                            <input type="text" placeholder="Property Name" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />
                        </div>
                        <div className="w-full flex justify-start items-start flex-col gap-1.5">
                            <label htmlFor="desc" className="text-md font-semibold">Description</label>
                            <textarea placeholder="Property Description" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400 h-[200px]" />
                        </div>
                        <div className="w-full flex justify-center items-center flex-wrap gap-2.5">
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Property Category</h5>
                                <select name="" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                    <option value="">Apartment</option>
                                    <option value="">WareHouse</option>
                                    <option value="">Villa</option>
                                    <option value="">Office Space</option>
                                </select>
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Property Type</h5>
                                <select name="" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                    <option value="">For Sale</option>
                                    <option value="">For Rent</option>
                                </select>
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Price in BHP</h5>
                                <input type="text" className="w-full p-2 border border-slate-400 rounded-lg" placeholder="Enter Price in BHP" />
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Property Status</h5>
                                <select name="" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                    <option value="">Hold</option>
                                    <option value="">Publish</option>
                                </select>
                            </div>
                            <div className="w-[98%] mb-6">
                                <label htmlFor="customSlug" className="block text-md font-semibold text-gray-700 mb-2">
                                    Custom Property Slug(Optional)
                                </label>
                                <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                                    <span className="bg-gray-100 text-gray-600 px-3 py-2 text-sm">
                                        {baseUrl}/
                                    </span>
                                    <input
                                        id="customSlug"
                                        type="text"
                                        name="slug"
                                        value={slugInput}
                                        onChange={(e) => setSlugInput(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        placeholder="e.g. luxury-villa-doha"
                                        className="flex-1 px-3 py-2 outline-none text-sm text-gray-800"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    This will be the URL of the property listing.
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Preview: <strong>{baseUrl + `/` + slugInput}</strong>
                                </p>
                            </div>
                        </div>

                    </div> :
                    formNav === 1 ?
                        // 2nd section 
                        <div className="w-full flex justify-center items-start gap-5 flex-col">
                            <h2 className="text-xl text-slate-700 font-semibold">Upload photos of your property</h2>
                            <div className="w-full flex flex-col gap-6 mt-6">

                                {/* Upload Sections Row */}
                                <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6">

                                    {/* Thumbnail Upload */}
                                    <div className="w-full lg:w-[48%] bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <h5 className="text-md font-semibold text-slate-700 mb-2">
                                            Upload Thumbnail Image <span className="text-sm text-gray-500">(Single image)</span>
                                        </h5>
                                        <label className="block w-full border-2 border-dashed border-gray-300 p-4 text-center rounded-md cursor-pointer hover:border-secondary hover:bg-secondary/5 transition duration-200">
                                            <input type="file" accept="image/*" className="hidden" />
                                            <span className="text-sm text-gray-600">Click or drag to upload thumbnail</span>
                                        </label>
                                    </div>

                                    {/* Gallery Upload */}
                                    <div className="w-full lg:w-[48%] bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <h5 className="text-md font-semibold text-slate-700 mb-2">
                                            Upload Property Gallery Images <span className="text-sm text-gray-500">(Up to 12 images)</span>
                                        </h5>
                                        <label className="block w-full border-2 border-dashed border-gray-300 p-4 text-center rounded-md cursor-pointer hover:border-secondary hover:bg-secondary/5 transition duration-200">
                                            <input type="file" accept="image/*" multiple className="hidden" />
                                            <span className="text-sm text-gray-600">Click or drag to upload gallery images</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Video Upload Section */}
                                <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h5 className="text-md font-semibold text-slate-700 mb-2">
                                        Upload Property Walkthrough Video <span className="text-sm text-gray-500">(Single video)</span>
                                    </h5>
                                    <label className="block w-full border-2 border-dashed border-gray-300 p-4 text-center rounded-md cursor-pointer hover:border-secondary hover:bg-secondary/5 transition duration-200">
                                        <input type="file" accept="video/*" className="hidden" />
                                        <span className="text-sm text-gray-600">Click or drag to upload video</span>
                                    </label>
                                </div>
                                {/**SEO */}
                                <div className="w-full flex justify-start items-center gap-2.5 flex-wrap">
                                    <div className="w-[48%] flex justify-start items-start flex-col gap-1.5">
                                        <label htmlFor="title" className="text-sm font-semibold">Alt Tag(Optional)</label>
                                        <input type="text" placeholder="Alt tag" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />

                                    </div>
                                    <div className="w-[48%] flex justify-start items-start flex-col gap-1.5">
                                        <label htmlFor="title" className="text-sm font-semibold">Meta Title(Optional)</label>
                                        <input type="text" placeholder="Meta Title" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />

                                    </div>
                                    <div className="w-[98%] flex justify-start items-start flex-col gap-1.5">
                                        <label htmlFor="title" className="text-sm font-semibold">Meta Description(Optional)</label>
                                        <input type="text" placeholder="Meta Title" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />

                                    </div>
                                </div>

                            </div>

                        </div> :
                        formNav === 2 ?
                            //3rd section 
                            <div className="w-full flex justify-center items-start flex-col gap-3">
                                <h2 className="text-xl text-slate-700 font-semibold">Property Location</h2>
                                <div className="w-full flex justify-start items-start flex-col gap-1.5">
                                    <h5 className="text-md font-semibold">Property Address</h5>
                                    <input type="text" placeholder="Enter Address" className="w-full p-3 rounded-lg outline-none border border-slate-400" />
                                </div>
                                <div className="w-full flex justify-center items-start flex-wrap gap-2.5">
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">State</h5>
                                        <select name="" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                            <option value="">TamilNadu</option>
                                            <option value="">Kerala</option>
                                            <option value="">Maharastra</option>
                                        </select>
                                    </div>
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">City</h5>
                                        <select name="" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                            <option value="">Chennai</option>
                                            <option value="">Tiruvannamalai</option>
                                            <option value="">coimbatore</option>
                                        </select>
                                    </div>
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">Country</h5>
                                        <select name="" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                            <option value="">India</option>
                                            <option value="">Bahrain</option>
                                            <option value="">Russia</option>
                                        </select>
                                    </div>
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">ZipCode</h5>
                                        <input type="text" className="w-full rounded-lg outline-none border border-slate-400 p-2" />
                                    </div>
                                </div>
                            </div> :
                            formNav === 3 ?
                                // 4th section
                                <div className="w-full flex justify-start flex-wrap items-start gap-2.5">
                                    <h2 className="text-xl text-slate-700 font-semibold w-full">Property Details</h2>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="w-[40%]">
                                            <h6 className="text-sm font-mono font-semibold">Bedrooms & Baths</h6>
                                            <Switcher enables={enables} />
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setModalContent('addproperty');
                                            }}
                                            className="w-[30%] p-2 bg-primary text-lg text-slate-50 cursor-pointer"
                                        >
                                            Add New Field
                                        </button>
                                    </div>
                                    {isEnabled && <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Bedrooms</h5>
                                        <input type="text" className="w-full p-2 rounded-xl border border-slate-300 outline-none" placeholder="Bedrooms Available" />
                                    </div>}
                                    {isEnabled && <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Baths</h5>
                                        <input type="text" className="w-full p-2 rounded-xl border border-slate-300 outline-none" placeholder="Baths Available" />
                                    </div>}
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Size (SQM)</h5>
                                        <input type="text" className="w-full p-2 rounded-xl border border-slate-300 outline-none" placeholder="Available size in sqm" />
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Furnished</h5>
                                        <select name="" id="" className="w-full p-[10px] border border-slate-300 rounded-xl outline-none">
                                            <option value="">Fully Furnished</option>
                                            <option value="">Semi-Furnished</option>
                                            <option value="">Unfurnished</option>
                                        </select>
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Feature Tag</h5>
                                        <select name="" id="" className="w-full p-[10px] border border-slate-300 rounded-xl outline-none">
                                            <option value="">None</option>
                                            <option value="">Featured</option>
                                            <option value="">Newest</option>
                                            <option value="">Trending</option>
                                        </select>
                                    </div>
                                    {propertyDetailsArr.length > 0 && propertyDetailsArr.map((item, ndx) => {
                                        return (
                                            <div key={ndx} className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                                <div className="w-full flex justify-between items-center">
                                                    <h5 className="text-md font-semibold">{item.property}</h5>
                                                    <RiDeleteBin6Line onClick={() => handleRemoveCustomProperty(item.property)} className=" text-red-500 cursor-pointer" />
                                                </div>
                                                <input type="text" onChange={handleAddInputs} className="w-full p-[10px] border border-slate-300 rounded-xl bg-slate-200 outline-none cursor-not-allowed" name={item.property} disabled id="" value={item.value} />
                                            </div>
                                        )
                                    })}
                                </div> :
                                formNav === 4 ?
                                    //4th Section 
                                    <div className="w-full flex justify-start flex-wrap items-start gap-2.5">
                                        <div className="w-full flex justify-between items-center">
                                            <h2 className="text-xl text-slate-700 font-semibold w-full">Select Amenities</h2>
                                            <button onClick={() => {
                                                setIsModalOpen(true);
                                                setModalContent('addamenity')
                                            }} className="w-1/6 p-2 bg-primary rounded-lg cursor-pointer text-white text-md">Add New</button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {amenities.map((item) => (
                                                <div key={item}>
                                                    <input
                                                        type="checkbox"
                                                        id={item}
                                                        onChange={() => handleAmenities(item)}
                                                        checked={amenitiesAvail.includes(item)}
                                                        className="hidden peer" // Hide default checkbox
                                                    />
                                                    <label
                                                        htmlFor={item}
                                                        className="flex items-center p-3 border rounded-lg cursor-pointer 
                   hover:bg-primary/5 peer-checked:border-primary/30 
                   peer-checked:bg-primary/10 peer-checked:text-primary"
                                                    >
                                                        <span className="mr-2">✓</span> {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div> : formNav === 5 ?
                                        //success status 
                                        <div className="w-full mx-auto my-10 p-6 bg-green-50 border border-green-200 rounded-lg shadow-md flex flex-col items-center text-center">
                                            <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                                            <h2 className="text-xl font-semibold text-green-800 mb-2">Property Added Successfully!</h2>
                                            <p className="text-green-700 mb-4">Your listing has been published and is now visible to visitors.</p>
                                            <Link href="/admin/listings">
                                                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200">
                                                    Manage Listings
                                                </button>
                                            </Link>
                                        </div>

                                        : null}

                {/**button options */}
                <div className="w-full flex justify-between items-center mt-3">
                    <button onClick={() => setFormNav(formNav !== 0 ? formNav - 1 : formNav)} className="w-[100px] p-2 bg-primary text-white cursor-pointer hover:bg-primary/80 duration-200">Back </button>
                    <button onClick={() => setFormNav(formNav !== 5 ? formNav + 1 : formNav)} className="w-[100px] p-2 bg-green-800 text-white cursor-pointer hover:bg-green-700 duration-200">Next </button>
                </div>
            </div>
        </div>
    );
}

export default AddNewProperty;