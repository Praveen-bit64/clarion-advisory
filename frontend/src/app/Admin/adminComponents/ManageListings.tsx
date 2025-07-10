import { BiSearch, BiPlus } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineMoreVert } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import propertyData from '@/app/data/propertyData.json'
import { useListedProperties } from "@/app/context/ListedProperties";
import { useState } from "react";

const ManageListings = () => {
    const { properties } = useListedProperties()
    console.log(properties, 23523523);
    const [listedProperties, setListedProperties] = useState(properties)
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        if (!value) {
            setListedProperties(properties)
        } else {
            setListedProperties(prev => prev.filter(item => item.propertyStatus.toLowerCase() === value.toLowerCase()))
        }
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (!value.trim()) {
            setListedProperties(properties);
            return;
        }

        const lowerValue = value.toLowerCase();

        const filtered = properties.filter((prop) => {
            return (
                prop.description?.toLowerCase().includes(lowerValue) ||
                // (`${prop.reference}`.toLowerCase().includes(lowerValue)) || // Handles CLR-USR- or custom IDs
                (`${prop.id}` === value.split("-")[3]) ||
                prop.propertyCity?.toLowerCase().includes(lowerValue) ||
                prop.propertyAddress?.toLowerCase().includes(lowerValue) ||
                prop.title?.toLowerCase().includes(lowerValue) ||
                `${prop.zipCode}` === value ||
                prop.listedAt?.toLowerCase()?.includes(lowerValue)
            );
        });

        setListedProperties(filtered);
    };

    return (
        <div className="w-full p-6 bg-gray-50 rounded-2xl shadow-sm mt-5 mr-4">
            {/** Header Section */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Your Listings</h1>
                    <p className="text-gray-500 mt-1">View, edit, and manage your property listings</p>
                </div>

                <div className="w-full md:w-auto flex flex-col md:flex-row items-end gap-3">
                    <div className="relative w-full md:w-64">
                        <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
                            placeholder="Search listings..."
                        />
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative">
                            <select
                                onChange={handleSortBy}
                                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none text-gray-700"
                            >
                                <option value="">All Status</option>
                                <option value="publish">Active</option>
                                <option value="hold">Pending</option>
                                <option value="sold">Sold</option>
                            </select>
                            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors duration-200">
                            <BiPlus className="text-xl" />
                            <span>Add Property</span>
                        </button>
                    </div>
                </div>
            </div>

            {/** Table Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Listing</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date Posted</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {listedProperties.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                                <img
                                                    src={`${item.thumbnailImage}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-900">{item.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{item.propertyAddress}</p>
                                                <p className="text-md font-medium text-primary mt-1">{item.propertyPrice.toLocaleString()}<span className="text-sm text-black"> BHD</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.listedAt?.split(' ')[0]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.propertyStatus.toLowerCase() == 'publish'
                                            ? 'bg-green-100 text-green-800'
                                            : item.propertyStatus == 'hold'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {`${item.propertyStatus.toLowerCase() == 'publish' ? 'Active' : item.propertyStatus == 'hold' ? 'Hold' : 'Sold'}`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end items-center gap-3">
                                            <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-200">
                                                <RiEdit2Line className="text-lg" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors duration-200">
                                                <MdDeleteOutline className="text-lg" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200">
                                                <MdOutlineMoreVert className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/** Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">24</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageListings;