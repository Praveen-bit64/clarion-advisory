'use client';
import { useState } from 'react';
import Image from 'next/image';

const Page = () => {
    // General Settings State
    const [siteTitle, setSiteTitle] = useState("Prime Properties");
    const [contactInfo, setContactInfo] = useState({
        phone: "+1 (555) 123-4567",
        email: "contact@primeproperties.com",
        address: "123 Realtor Ave, Miami, FL"
    });
    const [socialMedia, setSocialMedia] = useState({
        facebook: "primeproperties",
        instagram: "primeproperties",
        linkedin: "company/primeproperties"
    });
    const [timezone, setTimezone] = useState("America/New_York");
    const [currency, setCurrency] = useState("USD");
    const [language, setLanguage] = useState("en");

    // Profile Settings State
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@primeproperties.com",
        avatar: "/avatar-placeholder.jpg"
    });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // Property Management State
    const [properties, setProperties] = useState([
        { id: 1, title: "Luxury Beach Villa", status: "Active", featured: true },
        { id: 2, title: "Downtown Apartment", status: "Draft", featured: false },
        { id: 3, title: "Mountain Cabin", status: "Sold", featured: true }
    ]);
    const [propertyTypes, setPropertyTypes] = useState(["Apartment", "Villa", "Office", "Land"]);
    const [amenities, setAmenities] = useState(["Swimming Pool", "Gym", "Parking", "WiFi"]);

    // Media Settings State
    const [mediaSettings, setMediaSettings] = useState({
        maxImageSize: 5, // MB
        supportedFormats: ["jpg", "png", "webp"],
        watermarkEnabled: false,
        videoSupport: true
    });

    // Theme Settings State
    const [theme, setTheme] = useState({
        primaryColor: "#3B82F6",
        darkMode: false,
        fontFamily: "Inter"
    });

    // Active Tab State
    const [activeTab, setActiveTab] = useState("general");

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload the file to your server
            console.log(`Uploading ${type} file:`, file.name);
        }
    };

    // Add new property type
    const addPropertyType = (type: string) => {
        if (type && !propertyTypes.includes(type)) {
            setPropertyTypes([...propertyTypes, type]);
        }
    };

    // Toggle property status
    const togglePropertyStatus = (id: number, status: string) => {
        setProperties(properties.map(prop =>
            prop.id === id ? { ...prop, status } : prop
        ));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-primary">Prime Properties</h1>
                    <p className="text-sm text-gray-500">Admin Dashboard</p>
                </div>
                <nav className="p-4 space-y-1">
                    {[
                        { id: "general", icon: "⚙️", label: "General Settings" },
                        { id: "profile", icon: "👤", label: "Profile" },
                        { id: "properties", icon: "🏠", label: "Properties" },
                        { id: "media", icon: "🖼️", label: "Media" },
                        { id: "theme", icon: "🎨", label: "Theme" },
                        { id: "seo", icon: "🔍", label: "SEO" },
                        { id: "notifications", icon: "🔔", label: "Notifications" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-auto">
                {/* General Settings Tab */}
                {activeTab === "general" && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-6">General Settings</h2>

                        <div className="space-y-8">
                            {/* Site Identity Section */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4">Site Identity</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Site Title</label>
                                        <input
                                            type="text"
                                            value={siteTitle}
                                            onChange={(e) => setSiteTitle(e.target.value)}
                                            className="w-full p-3 border rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Site Logo</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src="/logo-placeholder.png"
                                                    alt="Site Logo"
                                                    width={80}
                                                    height={80}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    id="logo-upload"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(e, "logo")}
                                                />
                                                <label
                                                    htmlFor="logo-upload"
                                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                                                >
                                                    Change Logo
                                                </label>
                                                <p className="text-xs text-gray-500 mt-1">Recommended: 300x100px PNG</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Contact Information Section */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={contactInfo.phone}
                                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                            className="w-full p-3 border rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={contactInfo.email}
                                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                            className="w-full p-3 border rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Physical Address</label>
                                        <input
                                            type="text"
                                            value={contactInfo.address}
                                            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                                            className="w-full p-3 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Social Media Section */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Facebook</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">facebook.com/</span>
                                            <input
                                                type="text"
                                                value={socialMedia.facebook}
                                                onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                                                className="flex-1 p-3 border rounded-r-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Instagram</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">instagram.com/</span>
                                            <input
                                                type="text"
                                                value={socialMedia.instagram}
                                                onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                                                className="flex-1 p-3 border rounded-r-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">linkedin.com/</span>
                                            <input
                                                type="text"
                                                value={socialMedia.linkedin}
                                                onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                                                className="flex-1 p-3 border rounded-r-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Localization Section */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4">Localization</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Timezone</label>
                                        <select
                                            value={timezone}
                                            onChange={(e) => setTimezone(e.target.value)}
                                            className="w-full p-3 border rounded-lg"
                                        >
                                            <option value="America/New_York">Eastern Time (ET)</option>
                                            <option value="America/Chicago">Central Time (CT)</option>
                                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Currency</label>
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="w-full p-3 border rounded-lg"
                                        >
                                            <option value="USD">US Dollar ($)</option>
                                            <option value="EUR">Euro (€)</option>
                                            <option value="GBP">British Pound (£)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Language</label>
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="w-full p-3 border rounded-lg"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <div className="pt-4">
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Save General Settings
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Settings Tab */}
                {activeTab === "profile" && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Avatar Section */}
                            <div className="md:w-1/3">
                                <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden mb-4">
                                        <Image
                                            src={profile.avatar}
                                            alt="Profile"
                                            width={128}
                                            height={128}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, "avatar")}
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                                    >
                                        Change Photo
                                    </label>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="md:w-2/3 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full p-3 border rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full p-3 border rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Security Section */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Security</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={twoFactorEnabled}
                                                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-10 h-4 rounded-full shadow-inner transition-colors ${twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                                                        }`}></div>
                                                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform ${twoFactorEnabled ? 'transform translate-x-6' : ''
                                                        }`}></div>
                                                </div>
                                                <span className="ml-3 text-sm font-medium">
                                                    Two-Factor Authentication
                                                </span>
                                            </label>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Adds an extra layer of security to your account
                                            </p>
                                        </div>

                                        <div>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Property Management Tab */}
                {activeTab === "properties" && (
                    <div className="space-y-6">
                        {/* Property Listings Section */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Property Listings</h2>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    + Add New Property
                                </button>
                            </div>

                            {/* Property Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Property
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Featured
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {properties.map((property) => (
                                            <tr key={property.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium">{property.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={property.status}
                                                        onChange={(e) => togglePropertyStatus(property.id, e.target.value)}
                                                        className={`px-2 py-1 rounded-full text-xs ${property.status === "Active" ? "bg-green-100 text-green-800" :
                                                            property.status === "Draft" ? "bg-yellow-100 text-yellow-800" :
                                                                "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Draft">Draft</option>
                                                        <option value="Sold">Sold</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={property.featured}
                                                            onChange={() => setProperties(properties.map(p =>
                                                                p.id === property.id ? { ...p, featured: !p.featured } : p
                                                            ))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                                    <button className="text-gray-600 hover:text-gray-800">Clone</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Property Settings Section */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-2xl font-bold mb-6">Property Settings</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Property Types */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Property Types</h3>
                                    <div className="space-y-3">
                                        {propertyTypes.map((type) => (
                                            <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span>{type}</span>
                                                <button className="text-red-500 hover:text-red-700">
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <div className="flex mt-2">
                                            <input
                                                type="text"
                                                placeholder="Add new type"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        addPropertyType(e.currentTarget.value);
                                                        e.currentTarget.value = "";
                                                    }
                                                }}
                                                className="flex-1 p-2 border rounded-l-lg"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                    if (input.value) {
                                                        addPropertyType(input.value);
                                                        input.value = "";
                                                    }
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                                    <div className="space-y-3">
                                        {amenities.map((amenity) => (
                                            <div key={amenity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span>{amenity}</span>
                                                <button className="text-red-500 hover:text-red-700">
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <div className="flex mt-2">
                                            <input
                                                type="text"
                                                placeholder="Add new amenity"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        setAmenities([...amenities, e.currentTarget.value]);
                                                        e.currentTarget.value = "";
                                                    }
                                                }}
                                                className="flex-1 p-2 border rounded-l-lg"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                    if (input.value) {
                                                        setAmenities([...amenities, input.value]);
                                                        input.value = "";
                                                    }
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Media Settings Tab */}
                {activeTab === "media" && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-6">Media Settings</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Image Settings */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Image Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Maximum File Size (MB)</label>
                                        <input
                                            type="number"
                                            value={mediaSettings.maxImageSize}
                                            onChange={(e) => setMediaSettings({ ...mediaSettings, maxImageSize: Number(e.target.value) })}
                                            className="w-full p-3 border rounded-lg"
                                            min="1"
                                            max="20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Supported Formats</label>
                                        <div className="flex flex-wrap gap-2">
                                            {mediaSettings.supportedFormats.map((format) => (
                                                <span key={format} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {format}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={mediaSettings.watermarkEnabled}
                                                    onChange={() => setMediaSettings({ ...mediaSettings, watermarkEnabled: !mediaSettings.watermarkEnabled })}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-4 rounded-full shadow-inner transition-colors ${mediaSettings.watermarkEnabled ? 'bg-blue-600' : 'bg-gray-300'
                                                    }`}></div>
                                                <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform ${mediaSettings.watermarkEnabled ? 'transform translate-x-6' : ''
                                                    }`}></div>
                                            </div>
                                            <span className="ml-3 text-sm font-medium">
                                                Enable Watermark
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Video Settings */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Video Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={mediaSettings.videoSupport}
                                                    onChange={() => setMediaSettings({ ...mediaSettings, videoSupport: !mediaSettings.videoSupport })}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-4 rounded-full shadow-inner transition-colors ${mediaSettings.videoSupport ? 'bg-blue-600' : 'bg-gray-300'
                                                    }`}></div>
                                                <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform ${mediaSettings.videoSupport ? 'transform translate-x-6' : ''
                                                    }`}></div>
                                            </div>
                                            <span className="ml-3 text-sm font-medium">
                                                Enable Video Support
                                            </span>
                                        </label>
                                    </div>
                                    {mediaSettings.videoSupport && (
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Allowed Video Sources</label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                                                    <span className="ml-2">YouTube</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                                                    <span className="ml-2">Vimeo</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                                                    <span className="ml-2">MP4 Uploads</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Save Media Settings
                            </button>
                        </div>
                    </div>
                )}

                {/* Theme Settings Tab */}
                {activeTab === "theme" && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Color Scheme */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Primary Color</label>
                                        <div className="flex gap-3">
                                            {["#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                                                <div
                                                    key={color}
                                                    onClick={() => setTheme({ ...theme, primaryColor: color })}
                                                    className={`w-10 h-10 rounded-full cursor-pointer ${theme.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                                                        }`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={theme.darkMode}
                                                    onChange={() => setTheme({ ...theme, darkMode: !theme.darkMode })}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-4 rounded-full shadow-inner transition-colors ${theme.darkMode ? 'bg-gray-800' : 'bg-gray-300'
                                                    }`}></div>
                                                <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform ${theme.darkMode ? 'transform translate-x-6' : ''
                                                    }`}></div>
                                            </div>
                                            <span className="ml-3 text-sm font-medium">
                                                Dark Mode
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Typography */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Typography</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Font Family</label>
                                    <select
                                        value={theme.fontFamily}
                                        onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                                        className="w-full p-3 border rounded-lg"
                                    >
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Poppins">Poppins</option>
                                        <option value="Montserrat">Montserrat</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Theme Preview */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Preview</h3>
                            <div className={`p-6 rounded-lg ${theme.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'
                                }`}>
                                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: theme.fontFamily }}>
                                    Sample Heading
                                </h4>
                                <p style={{ fontFamily: theme.fontFamily }}>
                                    This is how your text will appear with the selected settings.
                                </p>
                                <button
                                    className="mt-4 px-4 py-2 rounded-lg"
                                    style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                                >
                                    Primary Button
                                </button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Save Theme Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;