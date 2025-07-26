'use client'

import { useEffect, useState } from "react";
import { BiAddToQueue, BiCross } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaFacebookF, FaLinkedinIn, FaMinus, FaPlus } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";
import { useAdminContactForm } from "../hooks/useAdminContactForm";
import { useContact } from "@/app/context/ContactContext";
import { toast } from "react-toastify";
import { useAdminGeneralInfo } from "../hooks/useAdminGeneralInfo";
import Loader from "@/app/components/Loader";
import { useSiteInfo } from "@/app/context/SiteInfoContext";
import { useSocailLinks } from "../hooks/useSocialLinks";
import { useSocialData } from "@/app/context/SocialLinksContext";
import { usePropertySchema } from "@/app/context/PropertySchema";

interface getcontact {
    phone?: string,
    email?: string,
    address?: string
}
interface PropertySchema {
    propertyType?: string[]
    cities?: string[]
    states?: string[]
    countries?: string[]
    bedroomSizes?: string[]
    bathrooms?: string[]
    tags?: string[]
}

const AdminSettings = () => {
    const { propertySchema } = usePropertySchema()

    const [propertyDetails, setPropertyDetails] = useState<PropertySchema>(propertySchema || {})


    //custom hooks for validating forms
    const { values, error, isSubmitting, handleChange, handleSubmit } = useAdminContactForm() //for contactform
    const { generalValues, generalErros, isGeneralInfoSubmitting, handleGeneralInfoChange, handleOnGeneralInfoSubmit } = useAdminGeneralInfo() //for general site info
    const { socialLinks, socialErrs, isSocialSubmitting, handleSocialSubmit, onChangeSocialHandler } = useSocailLinks()

    // context handles
    const { contactInfo, setContactInfo } = useContact()
    const { siteInfo, setSiteInfo } = useSiteInfo()
    const { socialData, setSocialData } = useSocialData()

    console.log(propertySchema, 3423423);

    //contact info handle
    const onContactSubmit = async (vals: typeof values) => {
        const res = await fetch('/api/adminSettings/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contactInfo: {
                    phone: vals.phone,
                    email: vals.email,
                    address: vals.address,
                },
            })
        })
        const data = await res.json();
        if (data.error) {
            toast.error(data.message || 'Something went wrong!');
        } else {
            toast.success('Contact info updated!');
        }
        getContactDetails()
    }
    const getContactDetails = async () => {
        const res = await fetch('/api/adminSettings/getContact');
        const data = await res.json();
        setContactInfo(data.contactInfo)

    }

    //general site info handle
    const onGeneralInfoSubmit = async (vals: typeof generalValues) => {
        const formData = new FormData();
        formData.append('siteName', vals.siteName);
        if (vals.siteLogo) formData.append('siteLogo', vals.siteLogo);

        const res = await fetch('/api/adminSettings/setgeneralsiteinfo', {
            method: 'POST',
            body: formData, // 👈 Don't set Content-Type manually for FormData
        });

        const data = await res.json();
        if (data.error) {
            toast.error(data.message || 'Something went wrong!');
        } else {
            toast.success('Site info updated!');
        }
        getSiteInfo()
    }
    const getSiteInfo = async () => {
        const res = await fetch('/api/adminSettings/getgeneralsiteinfo')
        const data = await res.json()

        if (!data.error) {
            setSiteInfo(data.siteInfo)
        }
    }

    //social links handle
    const onSocialSubmit = async (vals: typeof socialLinks) => {
        try {
            const res = await fetch('/api/adminSettings/setsociallinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    socialLinks: {
                        insta: vals.insta,
                        facebook: vals.facebook,
                        twitter: vals.twitter,
                        linkedin: vals.linkedin,
                    },
                }),
            });

            const data = await res.json();

            if (!data.error) {
                toast.success(data?.message || 'Updated successfully');
            } else {
                toast.error(data?.message || 'Something went wrong!');
            }
            getSocialLinks()
        } catch (err) {
            console.error("Error submitting social links:", err);
            toast.error('Network or server error!');
        }
    };
    const getSocialLinks = async () => {
        const res = await fetch('/api/adminSettings/getsociallinks')
        const data = await res.json()

        if (!data.error) {
            setSocialData(data.socialLinks)
        }
    }

    //propertySchema handle
    const onPropertySchemeSubmit = async () => {
        const res = await fetch('/api/propertySchema/setpropertyschema',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    propertySchema: {
                        propertyType: propertyDetails.propertyType,
                        cities: propertyDetails.cities,
                        states: propertyDetails.states,
                        countries: propertyDetails.countries,
                        bedroomSizes: propertyDetails.bedroomSizes,
                        bathrooms: propertyDetails.bathrooms,
                        tags: propertyDetails.tags
                    }
                })
            }
        )
        const data = await res.json()
        if (!data.error) {
            toast.success(data?.message || 'Updated succesfully')
        } else {
            toast.error(data?.message || 'There was a error, try after sometimes')
        }
    }


    useEffect(() => {
        getContactDetails()
    }, [])
    const handleAddDetails = () => {
        setPropertyDetails((prev) => {
            const existing = prev[input.name as keyof typeof prev] as string[];

            // Avoid duplicates
            if (existing.includes(input.value)) return prev;

            return {
                ...prev,
                [input.name]: [...existing, input.value]
            };
        });

        // Optional: Reset input
        setInput({ name: '', value: '' });
    };

    const [input, setInput] = useState({
        name: '',
        value: ''
    })
    const handleAddDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ name, value });
    };
    const handleRemoveProperty = (property: string, name: string) => {
        setPropertyDetails((prev) => {
            const existingList = prev[name as keyof typeof prev] as string[];

            return {
                ...prev,
                [name]: existingList.filter(item => item !== property)
            };
        });
    };
    const [contentView, setContentView] = useState('')

    return (
        <div className="w-full flex justify-start items-start flex-col mt-5 bg-slate-50 rounded-lg p-5">
            <h1 onClick={() => setContentView('general')} className="text-xl text-slate-700 mt-2 text-start font-semibold w-full p-2 bg-secondary/20 cursor-pointer flex justify-between items-center ">General Settings <span className="inline">{contentView !== 'general' ? <FaPlus /> : <FaMinus />}</span></h1>
            <div className={`w-full relative ${contentView === 'general' ? 'flex translate-y-0 h-auto border border-slate-300 border-t-0 rounded-b-lg pb-2' : 'translate-y-[-10px] h-0 '} justify-center items-center flex-wrap gap-2 duration-200 overflow-hidden`}>

                <div className="lg:w-[48%] w-full flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Site Name</h4>
                    <input type="text" name="siteName" value={generalValues.siteName} onChange={handleGeneralInfoChange} className="w-[80%] outline-neutral-50 p-2 py-3 bg-primary/10" required />
                    {generalErros.siteName && (
                        <span className="text-red-500 text-sm mt-1">{generalErros.siteName}</span>
                    )}
                </div>
                <div className="lg:w-[48%] w-full flex flex-wrap justify-start items-start gap-2 bg-slate-100 rounded-md p-3 m-2">
                    <div className="flex flex-col justify-center items-start">
                        <h2 className="text-lg text-slate-600 font-semibold">Site Logo <span className="font-mono text-sm">(current)</span></h2>
                        <div className="w-[150px]">
                            <img src={`${siteInfo?.siteLogo}`} alt={siteInfo?.siteName} className="w-full object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <h5 className="text-md font-semibold text-slate-500">Change Logo</h5>
                        <input type="file" name="siteLogo" onChange={handleGeneralInfoChange} className="border-[2px] border-dashed border-green-300 p-2 my-1 bg-slate-50 hover:bg-green-50 duration-200 cursor-pointer" />
                        {generalErros.siteLogo && (
                            <span className="text-red-500 text-sm mt-1">{generalErros.siteLogo}</span>
                        )}
                    </div>
                </div>
                <div className="w-[90%] flex justify-end items-end gap-3">
                    <button onClick={() => setContentView('')} className="w-[100px] p-1 bg-rose-400 rounded-md text-lg text-white">Close</button>

                    {!isGeneralInfoSubmitting ? (
                        <button
                            onClick={() => handleOnGeneralInfoSubmit(onGeneralInfoSubmit)}
                            className="w-[100px] p-1 bg-secondary rounded-md text-lg text-white"
                        >
                            Save
                        </button>
                    ) : (
                        <div className="w-[100px] bg-secondary rounded-md text-lg text-white p-1.5 flex justify-center items-center">
                            <Loader type="bars" color="white" height={25} width={25} variant="inline" />
                        </div>
                    )}
                </div>
            </div>
            <h1 onClick={() => setContentView('contact')} className="text-xl text-slate-700 mt-2 text-start font-semibold w-full p-2 bg-secondary/20 cursor-pointer flex justify-between items-center">Contact Information<span className="inline">{contentView !== 'contact' ? <FaPlus /> : <FaMinus />}</span></h1>
            <div className={`w-full justify-center   items-start flex-wrap gap-2.5 ${contentView === 'contact' ? 'flex translate-y-0 h-auto border border-slate-300 border-t-0 rounded-b-lg pb-2' : 'translate-y-[-10px] h-0 '}  overflow-hidden`}>
                <div className="lg:w-[30%] w-full flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Company Phone</h4>
                    <input type="text" name="phone" value={values.phone} onChange={handleChange} className="w-full outline-neutral-50 p-2 py-3 bg-primary/10" />
                    {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
                </div>
                <div className="lg:w-[30%] w-full flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Company Email</h4>
                    <input type="email" name="email" value={values.email} onChange={handleChange} className="w-full outline-neutral-50 p-2 py-3 bg-primary/10" />
                    {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </div>
                <div className="lg:w-[30%] w-full flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Address</h4>
                    <input type="text" name="address" value={values.address} onChange={handleChange} className="w-full outline-neutral-50 p-2 py-3 bg-primary/10" />
                    {error.address && <p className="text-red-500 text-sm">{error.address}</p>}
                </div>
                <div className="w-[90%] flex justify-end items-end gap-3">
                    <button onClick={() => setContentView('')} className="w-[100px] p-1 bg-rose-400 rounded-md text-lg text-white">Close</button>
                    {!isSubmitting ? <button onClick={() => handleSubmit(onContactSubmit)} className="w-[100px] p-1 bg-secondary rounded-md text-lg text-white" disabled={isSubmitting}>{isSubmitting ? 'saving...' : 'Save'}</button> :
                        (
                            <div className="w-[100px] bg-secondary rounded-md text-lg text-white p-1.5 flex justify-center items-center">
                                <Loader type="bars" color="white" height={25} width={25} variant="inline" />
                            </div>
                        )}
                </div>
            </div>
            <h1 onClick={() => setContentView('social')} className="text-xl text-slate-700 mt-2 text-start font-semibold w-full p-2 bg-secondary/20 cursor-pointer flex justify-between items-center">Social Media<span className="inline">{contentView !== 'social' ? <FaPlus /> : <FaMinus />}</span></h1>
            <div className={`w-full flex justify-center items-center flex-wrap gap-3  mt-2 ${contentView === 'social' ? 'flex translate-y-0 h-auto border border-slate-300 border-t-0 rounded-b-lg pb-2' : 'translate-y-[-10px] h-0 '} overflow-x-auto`}>
                {/* Facebook Input */}
                <div className="relative flex flex-col items-center transition-colors">
                    <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-colors">
                        <div className="absolute left-0 h-full w-12 bg-blue-600 flex items-center justify-center">
                            <FaFacebookF className="text-white text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="https://facebook.com/username"
                            name="facebook"
                            value={socialLinks.facebook}
                            onChange={onChangeSocialHandler}
                            className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            aria-label="Facebook username"
                        />
                    </div>
                    {socialErrs?.facebook && <p className="text-red-500 text-sm">{socialErrs?.facebook}</p>}
                </div>

                {/* Twitter/X Input */}
                <div className="relative flex flex-col items-center transition-colors">
                    <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-700 transition-colors">
                        <div className="absolute left-0 h-full w-12 bg-black flex items-center justify-center">
                            <BsTwitterX className="text-white text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="https://x.com/username"
                            name="twitter"
                            value={socialLinks.twitter}
                            onChange={onChangeSocialHandler}
                            className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            aria-label="X (Twitter) username"
                        />
                    </div>
                    {socialErrs?.twitter && <p className="text-red-500 text-sm">{socialErrs?.twitter}</p>}
                </div>
                {/* Instagram Input */}
                <div className="relative flex flex-col items-center transition-colors">
                    <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-pink-500 transition-colors">
                        <div className="absolute left-0 h-full w-12 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                            <FiInstagram className="text-white text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="https://instagram.com/username"
                            name="insta"
                            value={socialLinks.insta}
                            onChange={onChangeSocialHandler}
                            className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            aria-label="Instagram username"
                        />
                    </div>
                    {socialErrs?.insta && <p className="text-red-500 text-sm">{socialErrs?.insta}</p>}
                </div>
                {/* LinkedIn Input */}
                <div className="relative flex flex-col items-center transition-colors">
                    <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors">
                        <div className="absolute left-0 h-full w-12 bg-blue-700 flex items-center justify-center">
                            <FaLinkedinIn className="text-white text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="linkedin.com/in/username"
                            name="linkedin"
                            value={socialLinks.linkedin}
                            onChange={onChangeSocialHandler}
                            className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            aria-label="LinkedIn username"
                        />
                    </div>
                    {socialErrs?.linkedin && <p className="text-red-500 text-sm">{socialErrs?.linkedin}</p>}
                </div>
                <div className="w-[90%] flex justify-end items-end gap-3">
                    <button onClick={() => setContentView('')} className="w-[100px] p-1 bg-rose-400 rounded-md text-lg text-white">Close</button>
                    {!isSocialSubmitting ? <button onClick={() => handleSocialSubmit(onSocialSubmit)} className="w-[100px] p-1 bg-secondary rounded-md text-lg text-white">Save</button> :
                        (
                            <div className="w-[100px] bg-secondary rounded-md text-lg text-white p-1.5 flex justify-center items-center">
                                <Loader type="bars" color="white" height={25} width={25} variant="inline" />
                            </div>
                        )
                    }
                </div>
            </div>
            <h1 onClick={() => setContentView('property')} className="text-xl text-slate-700 text-start font-semibold mt-2 w-full p-2 bg-secondary/20 cursor-pointer flex justify-between items-center">Property Settings<span className="inline">{contentView !== 'property' ? <FaPlus /> : <FaMinus />}</span></h1>
            <div className={`w-full flex justify-start items-start flex-wrap gap-2.5 ${contentView === 'property' ? 'flex translate-y-0 h-auto border border-slate-300 border-t-0 rounded-b-lg pb-2 pl-2' : 'translate-y-[-10px] h-0 '} overflow-hidden`}>
                {/**Property Category */}
                <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Property Category</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="propertyType"
                            placeholder="Add a Property Type"
                            value={input.name === 'propertyType' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.propertyType?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'propertyType')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property City */}
                <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Cities</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="cities"
                            placeholder="Add a City"
                            value={input.name === 'cities' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.cities?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'cities')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property State */}
                <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage States</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="states"
                            placeholder="Add a State"
                            value={input.name === 'states' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.states?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'states')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property Country */}
                <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Countries</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="countries"
                            placeholder="Add a Country"
                            value={input.name === 'countries' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.countries?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'countries')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property Bedrooms */}
                <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Bedroom Sizes</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="bedroomSizes"
                            placeholder="Add a BetRoom Size"
                            value={input.name === 'bedroomSizes' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.bedroomSizes?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'bedroomSizes')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property Baths */}
                <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Bathrooms</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="bathrooms"
                            placeholder="Add a Bathroom"
                            value={input.name === 'bathrooms' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.bathrooms?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'bathrooms')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property custom tags */}
                {/* <div className="lg:w-[32%] w-full h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Tags</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="tags"
                            placeholder="Add a Tag"
                            value={input.name === 'tags' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails?.tags?.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'tags')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div> */}
                <div className="w-[95%] flex justify-end items-end gap-3">
                    <button onClick={() => setContentView('')} className="w-[100px] p-1 bg-rose-400 rounded-md text-lg text-white">Close</button>
                    <button onClick={onPropertySchemeSubmit} className="w-[100px] p-1 bg-secondary rounded-md text-lg text-white">Save</button>
                </div>
            </div>
            {/* <div className="w-full flex justify-center items-center my-4">
                <button className="w-[200px] p-2 bg-secondary text-xl text-slate-50 font-semibold rounded-md cursor-pointer hover:bg-secondary/70">Confirm Changes</button>
            </div> */}

        </div>
    );
}

export default AdminSettings;