'use client'
import { BiPlus, BiSearch } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineMoreVert } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { useListedProperties } from "@/app/context/ListedProperties";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiFilter } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

const ManageListings = (props: { getViewCallback: (value: string) => void }) => {
    const { getViewCallback } = props;
    const { properties, fetchListedProperties } = useListedProperties();
    const [editInput, setEditInput] = useState({
        title: '',
        propertyPrice: '',
        propertyStatus: 'publish',
    });

    const [listedProperties, setListedProperties] = useState(properties);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const filtered = filterProperties();
        const total = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        setTotalPages(total);
        setCurrentPage(prev => prev > total && total > 0 ? total : prev);
    }, [properties, searchTerm, statusFilter]);

    const getCurrentProperties = () => {
        const filtered = filterProperties();
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    const filterProperties = () => {
        let filtered = [...properties];

        if (searchTerm.trim()) {
            const lowerValue = searchTerm.toLowerCase();
            filtered = filtered.filter((prop) => {
                return (
                    prop.description?.toLowerCase().includes(lowerValue) ||
                    (`${prop.id}` === searchTerm.split("-")[3]) ||
                    prop.propertyCity?.toLowerCase().includes(lowerValue) ||
                    prop.propertyAddress?.toLowerCase().includes(lowerValue) ||
                    prop.title?.toLowerCase().includes(lowerValue) ||
                    `${prop.zipCode}` === searchTerm ||
                    prop.listedAt?.toLowerCase()?.includes(lowerValue)
                );
            });
        }

        if (statusFilter) {
            filtered = filtered.filter(item =>
                item.propertyStatus.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        return filtered;
    };

    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleDeleteProperty = (id: string) => {
        const handleDelete = async () => {
            try {
                const res = await fetch('/api/properties/deleteproperty', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                const data = await res.json();

                if (!data.error) {
                    toast.success('Property deleted successfully');
                    toast.dismiss();
                } else {
                    toast.error(data?.message || 'There was an error deleting the property!');
                }
            } catch (error) {
                toast.error('Failed to delete property. Please try again.');
            }
        };

        toast(
            <div className="flex flex-col bg-secondary/10 items-center justify-center p-4 w-full max-w-md rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Deletion</h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                    Are you sure you want to delete this property? This action cannot be undone.
                </p>
                <div className="flex gap-3 w-full">
                    <button
                        onClick={() => toast.dismiss()}
                        className="flex-1 py-2 px-4 bg-white rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeButton: false,
                position: 'top-center',
                className: 'w-full',
            }
        );
    };

    const EditForm = ({ editInput, setEditInput, onCancel, onSave }: any) => {
        return (
            <div className="w-full max-w-md p-4 bg-secondary/10 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Property</h3>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={editInput.title}
                            onChange={(e) => setEditInput((prev: any) => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="text"
                            id="price"
                            value={editInput.propertyPrice}
                            onChange={(e) => setEditInput((prev: any) => ({ ...prev, propertyPrice: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            value={editInput.propertyStatus}
                            onChange={(e) => setEditInput((prev: any) => ({ ...prev, propertyStatus: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="publish">Active</option>
                            <option value="hold">Hold</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="feature" className="block text-sm font-medium text-gray-700 mb-1">Featured Tag</label>
                        <select
                            id="feature"
                            value={editInput.featureTag}
                            onChange={(e) => setEditInput((prev: any) => ({ ...prev, featureTag: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="false">None</option>
                            <option value="Trending">Trending</option>
                            <option value="Featured">Featured</option>
                            <option value="New">New</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ToastEditForm = ({ id, initialInput }: { id: string, initialInput: any }) => {
        const [localEditInput, setLocalEditInput] = useState({
            title: '',
            propertyPrice: '',
            propertyStatus: 'publish',
            featureTag: 'false'
        });

        useEffect(() => {
            setLocalEditInput({
                title: initialInput.title || '',
                propertyPrice: initialInput.propertyPrice || '',
                propertyStatus: initialInput.propertyStatus || 'publish',
                featureTag: initialInput.featureTag || 'false'
            });
        }, [initialInput]);

        const handleSubmitEdit = async () => {
            try {
                const res = await fetch('/api/properties/updateproperty', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id,
                        ...localEditInput
                    })
                });
                const data = await res.json();

                if (!data.error) {
                    toast.success('Property updated successfully');
                    fetchListedProperties()
                    toast.dismiss();
                } else {
                    toast.error(data?.message || 'Failed to update property');
                }
            } catch (error) {
                toast.error('Error updating property');
            }
        };

        return (
            <EditForm
                editInput={localEditInput}
                setEditInput={setLocalEditInput}
                onCancel={() => toast.dismiss()}
                onSave={handleSubmitEdit}
            />
        );
    };

    const handleEditProperty = (id: string) => {
        const handleFetchEdit = async () => {
            try {
                const res = await fetch(`/api/properties/editproperty`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                const data = await res.json();

                if (!data.error && data.propertyDetail) {
                    const propertyDetail = data.propertyDetail;

                    // Show toast only after data is ready
                    toast(
                        <ToastEditForm
                            id={id}
                            initialInput={{
                                title: propertyDetail.title,
                                propertyPrice: propertyDetail.propertyPrice,
                                propertyStatus: propertyDetail.propertyStatus,
                                featureTag: propertyDetail.featureTag
                            }}
                            key={id} //  Unique key to re-render fresh every time
                        />,
                        {
                            position: 'top-center',
                            autoClose: false,
                            closeButton: false,
                            className: 'w-full',
                        }
                    );
                } else {
                    toast.error(data?.message || 'Failed to fetch property details');
                }
            } catch (error) {
                toast.error('Error fetching property details');
            }
        };

        handleFetchEdit();
    };


    const currentProperties = getCurrentProperties();
    const filteredProperties = filterProperties();
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length);

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
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none"
                            placeholder="Search listings..."
                        />
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative">
                            <select
                                value={statusFilter}
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

                        <button
                            onClick={() => getViewCallback('newproperty')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors duration-200"
                        >
                            <BiPlus className="text-xl" />
                            <span>Add Property</span>
                        </button>
                    </div>
                </div>
            </div>

            {/** Table Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Listing</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date Posted</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentProperties.length > 0 ? (
                                currentProperties.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                                    <img
                                                        src={item.thumbnailImage || '/default-property.jpg'}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/default-property.jpg';
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-md font-semibold text-gray-900">{item.title}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">{item.propertyAddress}</p>
                                                    <p className="text-md font-medium text-primary mt-1">
                                                        {item.propertyPrice?.toLocaleString() || '0'}<span className="text-sm text-black"> BHD</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.listedAt?.split(' ')[0] || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.propertyStatus?.toLowerCase() === 'publish'
                                                ? 'bg-green-100 text-green-800'
                                                : item.propertyStatus?.toLowerCase() === 'hold'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {item.propertyStatus?.toLowerCase() === 'publish'
                                                    ? 'Active'
                                                    : item.propertyStatus?.toLowerCase() === 'hold'
                                                        ? 'Hold'
                                                        : 'Sold'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center gap-3">
                                                <button
                                                    onClick={() => handleEditProperty(String(item.id))}
                                                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-200"
                                                    aria-label="Edit property"
                                                >
                                                    <RiEdit2Line className="text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProperty(String(item.id))}
                                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors duration-200"
                                                    aria-label="Delete property"
                                                >
                                                    <MdDeleteOutline className="text-lg" />
                                                </button>
                                                <button
                                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                    aria-label="More options"
                                                >
                                                    <MdOutlineMoreVert className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No properties found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/** Enhanced Pagination */}
                {filteredProperties.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{filteredProperties.length}</span> results
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`px-3 py-1.5 rounded-md border ${currentPage === page
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageListings;