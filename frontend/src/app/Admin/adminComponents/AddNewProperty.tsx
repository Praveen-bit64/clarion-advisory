'use client'
import GlobalModal from "@/app/components/GlobalModal";
import Switcher from "@/app/components/Switcher";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAddNewProperty } from "../hooks/useAddNewProperty";
import { usePropertySchema } from "@/app/context/PropertySchema";
import { toast } from "react-toastify";
import Loader from "@/app/components/Loader";
import { useListedProperties } from "@/app/context/ListedProperties";

type PropertyDetail = {
    property: string;
    value: string;
};
type modalContent = 'addproperty' | 'addamenity' | ''

const AddNewProperty = (props: { getViewCallback: (value: string) => void }) => {
    const { getViewCallback } = props
    const [formNav, setFormNav] = useState(0)
    const [slugInput, setSlugInput] = useState('');
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [isListed, setIsListed] = useState(false)
    const [modalContent, setModalContent] = useState<modalContent>('')
    const [amenitiesAvail, setAmenitiesAvail] = useState<string[]>([])
    console.log(amenitiesAvail, 234234);
    //Dynamic handles
    const {
        newPropertyValues,
        addNewPropertyErrs,
        isNewPropertySubmitting,
        formStatus,
        handleOnchangeNewProperty,
        handleAddNewPropertySubmit,
        validateNewPropertyVals,
        setNewPropertyValues,
        setAddNewPropertyErrs,
        handleFormStatus
    } = useAddNewProperty({ isBetroom: isEnabled, amenitiesSelected: amenitiesAvail })

    console.log(addNewPropertyErrs, newPropertyValues, 2343424);
    const { fetchListedProperties } = useListedProperties()

    const { propertySchema } = usePropertySchema()
    const handleNavigation = () => {
        const errors = validateNewPropertyVals(newPropertyValues);
        setAddNewPropertyErrs(errors);
        console.log(errors, 534535);

        handleFormStatus(errors); // Pass errors directly
    };
    // useEffect(() => {
    //     const fetchRes = async () => {
    //         const res = await fetch('/api/properties/listnewproperty', {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ test: 'test' })
    //         })
    //         const data = await res.json()
    //         if (data.error) {
    //             toast.error(data.message)
    //         } else {
    //             toast.success("Success")
    //         }
    //     }
    //     fetchRes()
    // }, [])
    useEffect(() => {
        if (formNav === 0 && formStatus.formOne === 'pass') {
            // if (true) {
            setFormNav(1);
        } else if (formNav === 1 && formStatus.formTwo === 'pass') {
            setFormNav(2);
        } else if (formNav === 2 && formStatus.formThree === 'pass') {
            setFormNav(3);
        } else if (formNav === 3 && formStatus.formFour === 'pass') {
            setFormNav(4);
        } else if (formNav === 4 && formStatus.formFive === 'pass') {
            setFormNav(5);
        }
    }, [formStatus]);

    const isNextDisabled = [
        formStatus.formOne !== 'pass',
        formStatus.formTwo !== 'pass',
        formStatus.formThree !== 'pass',
        formStatus.formFour !== 'pass',
        formStatus.formFive !== 'pass',
    ][formNav];


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

    //Reset Property Values
    const ResetValues = {
        title: '',
        description: '',
        propertyCategory: 'Apartment',
        propertyType: 'rent',
        propertyPrice: '',
        propertyStatus: 'Publish',
        customSlug: null,
        thumbnailImage: null,
        galleryImage: [],
        propertyVideo: '',
        altTag: null,
        metaTitle: null,
        metaDescription: null,
        propertyPhone: null,
        propertyWapp: null,
        propertyAddress: '',
        propertyState: '',
        propertyCity: '',
        propertyCountry: '',
        zipCode: '',
        isBedroomAvailable: true,
        bedrooms: '',
        bathrooms: '',
        propertySize: '',
        furnished: '',
        featureTag: false,
        customFields: false,
        amenities: []
    }

    const onNewPropertySubmit = async (vals: typeof newPropertyValues) => {
        const formData = new FormData();

        // Append text fields
        formData.append('title', vals.title);
        formData.append('description', vals.description);
        formData.append('propertyCategory', vals.propertyCategory);
        formData.append('propertyType', vals.propertyType);
        formData.append('propertyStatus', vals.propertyStatus);
        formData.append('customSlug', vals.customSlug || '');
        formData.append('altTag', vals.altTag || '');
        formData.append('metaTitle', vals.metaTitle || '');
        formData.append('metaDescription', vals.metaDescription || '');
        formData.append('propertyAddress', vals.propertyAddress);
        formData.append('propertyState', vals.propertyState);
        formData.append('propertyCity', vals.propertyCity);
        formData.append('propertyCountry', vals.propertyCountry);
        formData.append('isBedroomAvailable', vals.isBedroomAvailable.toString());
        formData.append('bedrooms', String(vals?.bedrooms || ''));
        formData.append('bathrooms', String(vals?.bathrooms || ''));
        formData.append('propertySize', String(vals?.propertySize || ''));
        formData.append('propertyPhone', String(vals?.propertyPhone || ''));
        formData.append('propertyWapp', String(vals?.propertyWapp || ''));
        formData.append('zipCode', String(vals?.zipCode || ''));
        formData.append('propertyPrice', String(vals?.propertyPrice || ''));
        formData.append('furnised', vals.furnished ? vals?.furnished.toString() : '');
        formData.append('featureTag', vals.featureTag.toString());

        formData.append('customFields', JSON.stringify(vals.customFields || {}));
        formData.append('amenities', JSON.stringify(vals.amenities || []));

        // File uploads
        if (vals.thumbnailImage instanceof File) {
            formData.append('thumbnailImage', vals.thumbnailImage);
        }

        if (vals.propertyVideo instanceof File) {
            formData.append('propertyVideo', vals.propertyVideo);
        }

        if (Array.isArray(vals.galleryImage)) {
            vals.galleryImage.forEach((file) => {
                if (file instanceof File) {
                    formData.append('galleryImage', file);
                }
            });
        }

        try {
            const res = await fetch('/api/properties/listnewproperty', {
                method: 'POST',
                body: formData, // No headers needed, browser sets correct boundary
            });

            const data = await res.json();

            if (!data.error) {
                toast.success(data?.message || 'Property Added Successfully');
                fetchListedProperties()
                setNewPropertyValues(ResetValues)
                setIsListed(true)
            } else {
                toast.error(data?.error || 'Error Listing Property');
                setNewPropertyValues(ResetValues)
                setIsListed(false)
            }
        } catch (err) {
            console.error('Error during property submit:', err);
            toast.error('Something went wrong while listing the property.');
        }
    };



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
    console.log('Video file selected:', newPropertyValues.propertyVideo);



    //5th section form handles
    const [amenities, setAmenities] = useState(propertySchema?.amenities || [])


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
    console.log(newPropertyValues.isBedroomAvailable, 5425345);

    return (
        <div className=" w-full flex justify-center items-center flex-col md:ml-0 ml-[160px]">
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
            <div className={`${formNav < 5 ? 'bg-white' : ''} rounded-xl  p-5 py-10  w-[500px]`}>
                {formNav === 0 ?
                    //1st section 
                    <div className="w-full flex justify-center items-start gap-5 flex-col ">
                        <h2 className="text-xl text-slate-700 font-semibold">Property Description</h2>
                        <div className="w-full flex justify-start items-start flex-col gap-1.5">
                            <label htmlFor="title" className="text-md font-semibold">Title</label>
                            <input name="title" value={newPropertyValues.title} onChange={handleOnchangeNewProperty} type="text" placeholder="Property Name" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />
                            {addNewPropertyErrs && addNewPropertyErrs.title && <p className="text-red-500 text-sm">{addNewPropertyErrs.title}</p>}
                        </div>
                        <div className="w-full flex justify-start items-start flex-col gap-1.5">
                            <label htmlFor="desc" className="text-md font-semibold">Description</label>
                            <textarea name="description" onChange={handleOnchangeNewProperty} value={newPropertyValues.description} placeholder="Property Description" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400 h-[200px]" />
                            {addNewPropertyErrs && addNewPropertyErrs.description && <p className="text-red-500 text-sm">{addNewPropertyErrs.description}</p>}
                        </div>
                        <div className="w-full flex justify-center items-center flex-wrap gap-2.5">
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Property Category</h5>
                                <select onChange={handleOnchangeNewProperty} name="propertyCategory" id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                    {propertySchema?.propertyType?.map((type, ndx) => {
                                        return (
                                            <option key={ndx} value={type}>{type}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Property Type</h5>
                                <select name="propertyType" id="" onChange={handleOnchangeNewProperty} className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                    <option value="rent">For Rent</option>
                                    <option value="sale">For Sale</option>
                                </select>
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Price in BHP</h5>
                                <input type="number" name="propertyPrice" onChange={handleOnchangeNewProperty} value={newPropertyValues.propertyPrice} className="w-full p-2 border border-slate-400 rounded-lg" placeholder="Enter Price in BHP" />
                                {addNewPropertyErrs && addNewPropertyErrs.propertyPrice && <p className="text-red-500 text-sm">{addNewPropertyErrs.propertyPrice}</p>}
                            </div>
                            <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                <h5 className="text-md font-semibold">Property Status</h5>
                                <select name="propertyStatus" onChange={handleOnchangeNewProperty} value={newPropertyValues.propertyStatus} id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                    <option value="publish">Publish</option>
                                    <option value="hold">Hold</option>
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
                                        name="customSlug"
                                        onChange={handleOnchangeNewProperty}
                                        value={newPropertyValues.customSlug || ''}
                                        placeholder="e.g. luxury-villa-doha"
                                        className="flex-1 px-3 py-2 outline-none text-sm text-gray-800"
                                    />
                                </div>
                                {addNewPropertyErrs && addNewPropertyErrs.customSlug && <p className="text-red-500 text-sm">{addNewPropertyErrs.customSlug}</p>}
                                <p className="text-xs text-gray-500 mt-1">
                                    This will be the URL of the property listing.
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Preview: <strong>{baseUrl + `/` + newPropertyValues?.customSlug || ''}</strong>
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
                                            {newPropertyValues.thumbnailImage && (
                                                <img
                                                    src={URL.createObjectURL(newPropertyValues.thumbnailImage)}
                                                    alt="Thumbnail Preview"
                                                    className="w-[100px] h-[80px] object-cover rounded mx-auto mb-2"
                                                />
                                            )}

                                            <input
                                                type="file"
                                                name="thumbnailImage"
                                                onChange={handleOnchangeNewProperty}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <span className="text-sm text-gray-600">Click or drag to upload thumbnail</span>
                                        </label>
                                        {addNewPropertyErrs && addNewPropertyErrs.thumbnailImage && <p className="text-red-500 text-sm">{addNewPropertyErrs.thumbnailImage}</p>}
                                    </div>

                                    {/* Gallery Upload */}
                                    <div className="w-full lg:w-[48%] bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <h5 className="text-md font-semibold text-slate-700 mb-2">
                                            Upload Property Gallery Images <span className="text-sm text-gray-500">(Up to 12 images)</span>
                                        </h5>

                                        <label className="block w-full border-2 border-dashed border-gray-300 p-4 text-center rounded-md cursor-pointer hover:border-secondary hover:bg-secondary/5 transition duration-200">
                                            <input
                                                type="file"
                                                name="galleryImage"
                                                accept="image/*"
                                                multiple
                                                onChange={handleOnchangeNewProperty}
                                                className="hidden"
                                            />
                                            <span className="text-sm text-gray-600">Click or drag to upload gallery images</span>
                                        </label>

                                        {newPropertyValues.galleryImage && newPropertyValues.galleryImage.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {newPropertyValues.galleryImage.slice(0, 4).map((img: File, index: number) => (
                                                    <div key={index} className="relative w-[100px] h-[50px] rounded overflow-hidden border">
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            alt={`Preview ${index}`}
                                                            className={`w-full h-full object-cover ${index === 3 && newPropertyValues?.galleryImage && newPropertyValues.galleryImage.length > 4 ? 'opacity-50' : ''
                                                                }`}
                                                        />
                                                        {index === 3 && newPropertyValues?.galleryImage && newPropertyValues.galleryImage.length > 4 && (
                                                            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold bg-black/50">
                                                                +{newPropertyValues.galleryImage.length - 4} more
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                            </div>

                                        )}
                                        {addNewPropertyErrs && addNewPropertyErrs.galleryImage && <p className="text-red-500 text-sm">{addNewPropertyErrs.galleryImage}</p>}
                                    </div>

                                </div>

                                {/* Video Upload Section */}
                                <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h5 className="text-md font-semibold text-slate-700 mb-2">
                                        Upload Property Walkthrough Video <span className="text-sm text-gray-500">(Single video)</span>
                                    </h5>

                                    <label className="block w-full border-2 border-dashed border-gray-300 p-4 text-center rounded-md cursor-pointer hover:border-secondary hover:bg-secondary/5 transition duration-200">
                                        <input
                                            type="file"
                                            name="propertyVideo"
                                            accept="video/*"
                                            onChange={handleOnchangeNewProperty}
                                            className="hidden"
                                        />
                                        <span className="text-sm text-gray-600">Click or drag to upload video</span>
                                    </label>

                                    {newPropertyValues.propertyVideo instanceof File && (
                                        <div className="mt-4">
                                            <video
                                                controls
                                                src={URL.createObjectURL(newPropertyValues.propertyVideo)}
                                                className="w-full h-auto max-h-[300px] rounded shadow"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/**SEO */}
                                <div className="w-full flex justify-start items-center gap-2.5 flex-wrap">
                                    <div className="w-[48%] flex justify-start items-start flex-col gap-1.5">
                                        <label htmlFor="title" className="text-sm font-semibold">Alt Tag(Optional)</label>
                                        <input type="text" name="altTag" value={newPropertyValues?.altTag || ''} onChange={handleOnchangeNewProperty} placeholder="Alt tag" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />
                                        {addNewPropertyErrs && addNewPropertyErrs.altTag && <p className="text-red-500 text-sm">{addNewPropertyErrs.altTag}</p>}
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start flex-col gap-1.5">
                                        <label htmlFor="title" className="text-sm font-semibold">Meta Title(Optional)</label>
                                        <input type="text" name="metaTitle" value={newPropertyValues?.metaTitle || ''} onChange={handleOnchangeNewProperty} placeholder="Meta Title" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />
                                        {addNewPropertyErrs && addNewPropertyErrs.metaTitle && <p className="text-red-500 text-sm">{addNewPropertyErrs.metaTitle}</p>}
                                    </div>
                                    <div className="w-[98%] flex justify-start items-start flex-col gap-1.5">
                                        <label htmlFor="title" className="text-sm font-semibold">Meta Description(Optional)</label>
                                        <input type="text" name="metaDescription" value={newPropertyValues?.metaDescription || ''} onChange={handleOnchangeNewProperty} placeholder="Meta Title" className="w-full p-2 rounded-lg border border-slate-200 outline-slate-400" />
                                        {addNewPropertyErrs && addNewPropertyErrs.metaDescription && <p className="text-red-500 text-sm">{addNewPropertyErrs.metaDescription}</p>}
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
                                    <input name="propertyAddress" value={newPropertyValues?.propertyAddress || ''} onChange={handleOnchangeNewProperty} type="text" placeholder="Enter Address" className="w-full p-3 rounded-lg outline-none border border-slate-400" />
                                    {addNewPropertyErrs && addNewPropertyErrs.propertyAddress && <p className="text-red-500 text-sm">{addNewPropertyErrs.propertyAddress}</p>}
                                </div>
                                <div className="w-full flex justify-center items-start flex-wrap gap-2.5">
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">State</h5>
                                        <select name="propertyState" value={newPropertyValues?.propertyState} onChange={handleOnchangeNewProperty} id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                            <option value="">Choose</option>
                                            {propertySchema?.states?.map((state, ndx) => {
                                                return (
                                                    <option key={ndx} value={state}>{state}</option>
                                                )
                                            })}
                                        </select>
                                        {addNewPropertyErrs && addNewPropertyErrs.propertyState && <p className="text-red-500 text-sm">{addNewPropertyErrs.propertyState}</p>}
                                    </div>
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">City</h5>
                                        <select name="propertyCity" value={newPropertyValues?.propertyCity} onChange={handleOnchangeNewProperty} id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                            <option value="">Choose</option>
                                            {propertySchema?.cities?.map((city, ndx) => {
                                                return (
                                                    <option key={ndx} value={city}>{city}</option>
                                                )
                                            })}
                                        </select>
                                        {addNewPropertyErrs && addNewPropertyErrs.propertyCity && <p className="text-red-500 text-sm">{addNewPropertyErrs.propertyCity}</p>}
                                    </div>
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">Country</h5>
                                        <select name="propertyCountry" value={newPropertyValues?.propertyCountry} onChange={handleOnchangeNewProperty} id="" className="w-full p-3 outline-none border border-slate-400 rounded-lg">
                                            <option value="">Choose</option>
                                            {propertySchema?.countries?.map((country, ndx) => {
                                                return (
                                                    <option key={ndx} value={country}>{country}</option>
                                                )
                                            })}
                                        </select>
                                        {addNewPropertyErrs && addNewPropertyErrs.propertyCountry && <p className="text-red-500 text-sm">{addNewPropertyErrs.propertyCountry}</p>}
                                    </div>
                                    <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                                        <h5 className="text-md font-semibold">ZipCode</h5>
                                        <input type="number" name="zipCode" onChange={handleOnchangeNewProperty} value={newPropertyValues?.zipCode} className="w-full rounded-lg outline-none border border-slate-400 p-2" />
                                        {addNewPropertyErrs && addNewPropertyErrs.zipCode && <p className="text-red-500 text-sm">{addNewPropertyErrs.zipCode}</p>}
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
                                        {/* <button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setModalContent('addproperty');
                                            }}
                                            className="w-[30%] p-2 bg-primary text-lg text-slate-50 cursor-pointer"
                                        >
                                            Add New Field
                                        </button> */}
                                    </div>
                                    {isEnabled && <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Bedrooms</h5>
                                        <select name="bedrooms" value={newPropertyValues?.bedrooms} onChange={handleOnchangeNewProperty} id="" className="w-full p-[10px] border border-slate-300 rounded-xl outline-none">
                                            <option value={`${null}`}>Choose</option>
                                            {propertySchema?.bedroomSizes?.map((bed, ndx) => {
                                                return (
                                                    <option key={ndx} value={bed}>{bed}</option>
                                                )
                                            })}
                                        </select>
                                        {addNewPropertyErrs && addNewPropertyErrs?.bedrooms && <p className="text-red-500 text-sm">{addNewPropertyErrs?.bedrooms}</p>}
                                    </div>}
                                    {isEnabled && <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Baths</h5>
                                        <select name="bathrooms" value={newPropertyValues?.bathrooms} onChange={handleOnchangeNewProperty} id="" className="w-full p-[10px] border border-slate-300 rounded-xl outline-none">
                                            <option value={`${null}`}>Choose</option>
                                            {propertySchema?.bathrooms?.map((bath, ndx) => {
                                                return (
                                                    <option key={ndx} value={bath}>{bath}</option>
                                                )
                                            })}
                                        </select>
                                        {addNewPropertyErrs && addNewPropertyErrs?.bathrooms && <p className="text-red-500 text-sm">{addNewPropertyErrs?.bathrooms}</p>}
                                    </div>}
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Phone</h5>
                                        <input type="number" name="propertyPhone" onChange={handleOnchangeNewProperty} value={newPropertyValues?.propertyPhone || ''} className="w-full p-2 rounded-xl border border-slate-300 outline-none" placeholder="Phone Number(optional)" />
                                        {addNewPropertyErrs && addNewPropertyErrs?.propertyPhone && <p className="text-red-500 text-sm">{addNewPropertyErrs?.propertyPhone}</p>}
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Whatsapp</h5>
                                        <input type="number" name="propertyWapp" onChange={handleOnchangeNewProperty} value={newPropertyValues?.propertyWapp || ''} className="w-full p-2 rounded-xl border border-slate-300 outline-none" placeholder="Available size in sqm" />
                                        {addNewPropertyErrs && addNewPropertyErrs?.propertyWapp && <p className="text-red-500 text-sm">{addNewPropertyErrs?.propertyWapp}</p>}
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Size (SQM)</h5>
                                        <input type="number" name="propertySize" onChange={handleOnchangeNewProperty} value={newPropertyValues.propertySize} className="w-full p-2 rounded-xl border border-slate-300 outline-none" placeholder="Available size in sqm" />
                                        {addNewPropertyErrs && addNewPropertyErrs?.propertySize && <p className="text-red-500 text-sm">{addNewPropertyErrs?.propertySize}</p>}
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Furnished</h5>
                                        <select name="furnished" value={newPropertyValues?.furnished} onChange={handleOnchangeNewProperty} id="" className="w-full p-[10px] border border-slate-300 rounded-xl outline-none">
                                            <option value={`${null}`}>Choose</option>
                                            <option value="Fully Furnished">Fully Furnished</option>
                                            <option value="Semi-Furnished">Semi-Furnished</option>
                                            <option value="Unfurnished">Unfurnished</option>
                                        </select>
                                        {addNewPropertyErrs && addNewPropertyErrs.furnished && <p className="text-red-500 text-sm">{addNewPropertyErrs.furnished}</p>}
                                    </div>
                                    <div className="w-[48%] flex justify-start items-start gap-1.5 flex-col">
                                        <h5 className="text-md font-semibold">Feature Tag</h5>
                                        <select name="featureTag" value={`${newPropertyValues?.featureTag}`} onChange={handleOnchangeNewProperty} id="" className="w-full p-[10px] border border-slate-300 rounded-xl outline-none">
                                            <option value="None">None</option>
                                            {propertySchema?.tags?.map((tag, ndx) => {
                                                return (
                                                    <option key={ndx} value={tag}>{tag}</option>
                                                )
                                            })}
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
                                                        className="hidden peer"
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
                                        {addNewPropertyErrs && addNewPropertyErrs.amenities && <p className="text-red-500 text-sm">{addNewPropertyErrs.amenities}</p>}
                                    </div> : formNav === 5 && !isNewPropertySubmitting && isListed ? (
                                        // ✅ Success
                                        <div className="w-full max-w-2xl mx-auto my-10 p-8 bg-green-100 border border-green-300 rounded-xl shadow-lg flex flex-col items-center text-center">
                                            <FaCheckCircle className="text-green-600 text-6xl mb-4 animate-bounce" />
                                            <h2 className="text-2xl font-bold text-green-800 mb-2">Listing Successful!</h2>
                                            <p className="text-green-700 mb-4 text-base">Your property has been listed and is now live for visitors.</p>
                                            <div className="w-full flex justify-center items-center gap-5">
                                                {/* <Link > */}
                                                <button onClick={() => getViewCallback('managelistings')} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition duration-200">
                                                    Go to My Listings
                                                </button>
                                                {/* </Link> */}
                                                <button onClick={() => setFormNav(0)} className="px-6 py-3 bg-primary hover:primary/90 text-white font-semibold rounded-lg shadow transition duration-200">
                                                    Add New
                                                </button>
                                            </div>
                                        </div>
                                    ) : formNav === 5 && !isNewPropertySubmitting && !isListed ? (
                                        // ❌ Error
                                        <div className="w-full max-w-2xl mx-auto my-10 p-8 bg-red-100 border border-red-300 rounded-xl shadow-lg flex flex-col items-center text-center">
                                            <FaTimesCircle className="text-red-600 text-6xl mb-4 animate-pulse" />
                                            <h2 className="text-2xl font-bold text-red-800 mb-2">Listing Failed</h2>
                                            <p className="text-red-700 mb-4 text-base">Oops! Something went wrong while submitting your listing.</p>
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition duration-200"
                                            >
                                                Retry Submission
                                            </button>
                                        </div>
                                    ) : isNewPropertySubmitting ? (
                                        // ⏳ Loading
                                        <div className="w-full max-w-xl mx-auto my-10 p-6 bg-gray-100 border border-gray-300 rounded-xl shadow-lg flex flex-col items-center text-center">
                                            <Loader type="rotate" color="green" />
                                            <p className="mt-4 text-gray-700 text-base animate-pulse">Listing your property, please wait...</p>
                                        </div>
                                    ) : null
                }

                {/**button options */}
                {formNav < 5 && <div className="w-full flex justify-between items-center mt-3">
                    <button onClick={() => setFormNav(formNav !== 0 ? formNav - 1 : formNav)} className="w-[100px] p-2 bg-primary text-white cursor-pointer hover:bg-primary/80 duration-200">Back </button>
                    {addNewPropertyErrs && formNav === 4 ? <button
                        onClick={() => handleAddNewPropertySubmit(onNewPropertySubmit)}
                        className="w-[100px] p-2 bg-green-600 text-white cursor-pointer hover:bg-green-700 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Publich
                    </button> :
                        !isNewPropertySubmitting ? <button
                            onClick={handleNavigation}
                            // disabled={isNextDisabled}
                            className="w-[100px] p-2 bg-emerald-800 text-white cursor-pointer hover:bg-green-700 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button> :
                            <div className="w-[100px] p-2 bg-emerald-800">
                                <Loader type="bars" color="white" />
                            </div>
                    }

                </div>}
            </div>
        </div>
    );
}

export default AddNewProperty;