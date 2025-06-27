import { useState } from "react";
import { BiAddToQueue, BiCross } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";

const AdminSettings = () => {
    const [propertyDetails, setPropertyDetails] = useState({
        propertyType: ["Apartment", "Villa", "Warehouse", "Office Space", "Land"],
        cities: ["Barcelona", "Doha", "Cape Town", "Osaka", "Vancouver"],
        states: ["California", "Queensland", "Bavaria", "Maharashtra", "British Columbia"],
        countries: ["Spain", "Qatar", "South Africa", "Japan", "Canada"],
        bedroomSizes: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Studio"],
        bathrooms: ["1 Bathroom", "1.5 Bathrooms", "2 Bathrooms", "2.5 Bathrooms", "3 Bathrooms"],
        tags: ['Featured', 'New', 'Trending']
    })
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

    return (
        <div className="w-full flex justify-start items-start flex-col mt-5 bg-slate-50 rounded-lg p-5">
            <h1 className="text-xl text-slate-700 text-start font-semibold">General Settings</h1>
            <div className="w-full flex justify-center items-center flex-wrap gap-2 ">
                <div className="w-[48%] flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Site Name</h4>
                    <input type="text" value={'Clarion Advisory'} className="w-[80%] outline-neutral-50 p-2 py-3 bg-primary/10" />
                </div>
                <div className="w-[48%] flex flex-wrap justify-start items-start gap-2 bg-slate-100 rounded-md p-3 m-2">
                    <div className="flex flex-col justify-center items-start">
                        <h2 className="text-lg text-slate-600 font-semibold">Site Logo <span className="font-mono text-sm">(current)</span></h2>
                        <div className="w-[150px]">
                            <img src="/clarion-logo.png" alt="site-logo" className="w-full object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <h5 className="text-md font-semibold text-slate-500">Change Logo</h5>
                        <input type="file" className="border-[2px] border-dashed border-green-300 p-2 my-1 bg-slate-50 hover:bg-green-50 duration-200 cursor-pointer" />

                    </div>
                </div>
            </div>
            <h1 className="text-xl text-slate-700 text-start font-semibold">Contact Information</h1>
            <div className="w-full flex justify-center items-start flex-wrap gap-2.5">
                <div className="w-[30%] flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Company Phone</h4>
                    <input type="text" value={1234567890} className="w-full outline-neutral-50 p-2 py-3 bg-primary/10" />
                </div>
                <div className="w-[30%] flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Company Email</h4>
                    <input type="email" value={'company@gmail.com'} className="w-full outline-neutral-50 p-2 py-3 bg-primary/10" />
                </div>
                <div className="w-[30%] flex flex-col justify-start items-start bg-slate-100 rounded-md p-3 m-2">
                    <h4 className="text-lg text-slate-600 font-semibold">Address</h4>
                    <input type="email" value={'123 Realtor Ave, Miami, FL'} className="w-full outline-neutral-50 p-2 py-3 bg-primary/10" />
                </div>
            </div>
            <h1 className="text-xl text-slate-700 text-start font-semibold">Social Media</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
                {/* Facebook Input */}
                <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-colors">
                    <div className="absolute left-0 h-full w-12 bg-blue-600 flex items-center justify-center">
                        <FaFacebookF className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="facebook.com/username"
                        className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        aria-label="Facebook username"
                    />
                </div>

                {/* Twitter/X Input */}
                <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-700 transition-colors">
                    <div className="absolute left-0 h-full w-12 bg-black flex items-center justify-center">
                        <BsTwitterX className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="x.com/username"
                        className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        aria-label="X (Twitter) username"
                    />
                </div>

                {/* Instagram Input */}
                <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-pink-500 transition-colors">
                    <div className="absolute left-0 h-full w-12 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                        <FiInstagram className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="instagram.com/username"
                        className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        aria-label="Instagram username"
                    />
                </div>

                {/* LinkedIn Input */}
                <div className="relative flex items-center h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors">
                    <div className="absolute left-0 h-full w-12 bg-blue-700 flex items-center justify-center">
                        <FaLinkedinIn className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="linkedin.com/in/username"
                        className="w-full h-full pl-14 pr-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        aria-label="LinkedIn username"
                    />
                </div>
            </div>
            <h1 className="text-xl text-slate-700 text-start font-semibold mt-2">Property Settings</h1>
            <div className="w-full flex justify-start items-start flex-wrap gap-2.5">
                {/**Property Category */}
                <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Property Category</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="propertyType"
                            placeholder="Add a Property Type"
                            value={input.name === 'propertyType' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.propertyType.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'propertyType')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property City */}
                <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Cities</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="cities"
                            placeholder="Add a City"
                            value={input.name === 'cities' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.cities.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'cities')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property State */}
                <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage States</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="states"
                            placeholder="Add a State"
                            value={input.name === 'states' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.states.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'states')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property Country */}
                <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Countries</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="countries"
                            placeholder="Add a Country"
                            value={input.name === 'countries' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.countries.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'countries')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property Bedrooms */}
                <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Bedroom Sizes</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="bedroomSizes"
                            placeholder="Add a BetRoom Size"
                            value={input.name === 'bedroomSizes' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.bedroomSizes.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'bedroomSizes')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property Baths */}
                <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Bathrooms</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="bathrooms"
                            placeholder="Add a Bathroom"
                            value={input.name === 'bathrooms' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.bathrooms.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'bathrooms')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div>
                {/**Property custom tags */}
                {/* <div className="w-[32%] h-[500px] overflow-y-auto custom-scrollbar p-2 bg-slate-200 rounded-lg mt-2">
                    <ul className="w-full flex justify-start items-start flex-col">
                        <span className="text-lg text-slate-70 font-semibold">Manage Tags</span>
                        <li className="w-full px-2 border-2 border-slate-50 bg-primary/20 flex justify-center items-center gap-3 my-1"><input type="text"
                            name="tags"
                            placeholder="Add a Tag"
                            value={input.name === 'tags' ? input.value : ''}
                            onChange={handleAddDetailsInput} className="w-full p-2 outline-none" /><MdOutlineAdd onClick={handleAddDetails} className="text-3xl h-full font-semibold bg-green-100 p-1 text-secondary cursor-pointer hover:rounded-full hover:bg-green-50 duration-200" /></li>
                        {propertyDetails.tags.map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full p-2 bg-primary/10 flex justify-start items-start gap-3 my-1"><IoClose onClick={() => handleRemoveProperty(item, 'tags')} className="text-3xl p-1 text-red-400 cursor-pointer hover:bg-red-200 rounded-full duration-200" />{item}</li>
                            )
                        })}

                    </ul>
                </div> */}
            </div>
            <div className="w-full flex justify-center items-center my-4">
                <button className="w-[200px] p-2 bg-secondary text-xl text-slate-50 font-semibold rounded-md cursor-pointer hover:bg-secondary/70">Confirm Changes</button>
            </div>

        </div>
    );
}

export default AdminSettings;