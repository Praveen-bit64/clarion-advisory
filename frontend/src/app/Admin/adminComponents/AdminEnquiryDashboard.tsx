import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiUser, FiHome, FiClock, FiBriefcase } from "react-icons/fi";

type ContactEnquiry = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    message: string;
    created_at: string;
};

type PropertyEnquiry = {
    id: number;
    name: string;
    email: string;
    phone: string;
    company?: string;
    message: string;
    property_title: string;
    sent_to: string;
    created_at: string;
};

const AdminEnquiryDashboard: React.FC = () => {
    const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiry[]>([]);
    const [propertyEnquiries, setPropertyEnquiries] = useState<PropertyEnquiry[]>([]);
    const [activeTab, setActiveTab] = useState<'contact' | 'property'>('contact');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [contactRes, propertyRes] = await Promise.all([
                    fetch("/api/enquiry/contact"),
                    fetch("/api/enquiry/property")
                ]);

                const [contactData, propertyData] = await Promise.all([
                    contactRes.json(),
                    propertyRes.json()
                ]);

                if (!contactData.error) setContactEnquiries(contactData.data || []);
                if (!propertyData.error) setPropertyEnquiries(propertyData.data || []);
            } catch (err) {
                console.error("Failed to fetch enquiries", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="lg:text-3xl text-lg font-bold text-gray-800 mb-8">Enquiry Dashboard</h1>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <FiMail className="mr-2" />
                        Contact Enquiries ({contactEnquiries.length})
                    </button>
                    <button
                        className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === 'property' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('property')}
                    >
                        <FiHome className="mr-2" />
                        Property Enquiries ({propertyEnquiries.length})
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Contact Enquiries Table */}
                        {activeTab === 'contact' && (
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Company
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Message
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {contactEnquiries.length > 0 ? (
                                                [...contactEnquiries]?.reverse()?.map((enquiry) => (
                                                    <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                    <FiUser className="text-blue-600" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {enquiry.firstName} {enquiry?.lastName}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                <a href={`mailto:${enquiry.email}`} className="flex items-center text-blue-600 hover:underline">
                                                                    <FiMail className="mr-1" /> {enquiry.email}
                                                                </a>
                                                            </div>
                                                            <div className="text-sm text-gray-500 mt-1 flex items-center">
                                                                <FiPhone className="mr-1" /> {enquiry?.phone || 'Unavailable'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {enquiry.company ? (
                                                                <div className="flex items-center text-sm text-gray-900">
                                                                    <FiBriefcase className="mr-1" /> {enquiry?.company || 'NA'}
                                                                </div>
                                                            ) : (
                                                                <span className="px-2 py-1 text-xs text-gray-500">-</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">
                                                                {enquiry.message}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <FiClock className="mr-1" /> {formatDate(enquiry.created_at)}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No contact enquiries found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Property Enquiries Table */}
                        {activeTab === 'property' && (
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Property
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Message
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {propertyEnquiries.length > 0 ? (
                                                [...propertyEnquiries]?.reverse()?.map((enquiry) => (
                                                    <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                                    <FiUser className="text-green-600" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {enquiry.name}
                                                                    </div>
                                                                    {enquiry.company && (
                                                                        <div className="text-xs text-gray-500 flex items-center mt-1">
                                                                            <FiBriefcase className="mr-1" /> {enquiry?.company || 'NA'}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                <a href={`mailto:${enquiry.email}`} className="flex items-center text-blue-600 hover:underline">
                                                                    <FiMail className="mr-1" /> {enquiry.email}
                                                                </a>
                                                            </div>
                                                            <div className="text-sm text-gray-500 mt-1 flex items-center">
                                                                <FiPhone className="mr-1" /> {enquiry?.phone || 'Unavailable'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900 flex items-center">
                                                                <FiHome className="mr-1 text-green-500" /> {enquiry.property_title}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                Sent to: {enquiry.sent_to}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">
                                                                {enquiry.message}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <FiClock className="mr-1" /> {formatDate(enquiry.created_at)}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No property enquiries found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminEnquiryDashboard;