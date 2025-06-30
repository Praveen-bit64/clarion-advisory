import Link from 'next/link';
import { FaBuilding, FaHandshake, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa';
import { MdOutlineDesignServices, MdEmojiPeople } from 'react-icons/md';

const page = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                    <div className="text-center px-4 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Discover Bahrain's Finest Properties</h1>
                        <p className="text-xl text-white/90 mb-8">Connecting you with the most exclusive real estate opportunities in the Kingdom</p>
                    </div>
                </div>
                <img
                    src="/about-us-bg.jpg"
                    alt="Bahrain Skyline"
                    className="w-full h-full object-cover object-center"
                />
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                            <span className="border-b-4 border-primary pb-2">Our Story</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            Founded in 2015, <span className="font-semibold text-primary">Bahrain Estates</span> began as a small team of passionate real estate professionals with a vision to transform property discovery in the Kingdom.
                        </p>
                        <p className="text-lg text-slate-600 mb-6">
                            Today, we're the leading digital platform connecting buyers, sellers, and investors with Bahrain's most exceptional properties. Our deep local knowledge combined with innovative technology sets us apart.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-primary">
                            <p className="italic text-slate-700">
                                "Our mission is to make every real estate transaction in Bahrain seamless, transparent, and rewarding for all parties involved."
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/about-1.jpg"
                            alt="Office team"
                            className="rounded-lg h-64 w-full object-cover shadow-lg"
                        />
                        <img
                            src="/about-2.jpg"
                            alt="Property showcase"
                            className="rounded-lg h-64 w-full object-cover shadow-lg mt-8"
                        />
                        <img
                            src="/about-3.jpg"
                            alt="Happy client"
                            className="rounded-lg h-64 w-full object-cover shadow-lg"
                        />
                        <img
                            src="/about-4.jpg"
                            alt="Bahrain property"
                            className="rounded-lg h-64 w-full object-cover shadow-lg mt-8"
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            Why Choose <span className="text-primary">Bahrain Estates</span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            We combine local expertise with cutting-edge technology to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaBuilding className="text-4xl text-primary" />,
                                title: "Extensive Portfolio",
                                description: "Access Bahrain's most comprehensive collection of luxury properties, commercial spaces, and investment opportunities"
                            },
                            {
                                icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
                                title: "Local Market Mastery",
                                description: "Our team's deep understanding of Bahrain's neighborhoods ensures you make informed decisions"
                            },
                            {
                                icon: <MdOutlineDesignServices className="text-4xl text-primary" />,
                                title: "Virtual Property Tours",
                                description: "Experience properties remotely with our immersive 3D and VR viewing technology"
                            },
                            {
                                icon: <FaHandshake className="text-4xl text-primary" />,
                                title: "Trusted Partnerships",
                                description: "We maintain strong relationships with developers, banks, and legal experts"
                            },
                            {
                                icon: <FaChartLine className="text-4xl text-primary" />,
                                title: "Market Insights",
                                description: "Receive data-driven advice with our proprietary market analysis tools"
                            },
                            {
                                icon: <MdEmojiPeople className="text-4xl text-primary" />,
                                title: "Dedicated Support",
                                description: "Your personal consultant guides you through every step of the process"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Meet Our <span className="text-primary">Leadership</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Our experienced team brings together decades of Bahrain real estate expertise
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Ahmed Al Khalifa",
                            role: "Founder & CEO",
                            image: "/team-1.jpg",
                            bio: "20+ years in Bahrain real estate development"
                        },
                        {
                            name: "Fatima Al Jishi",
                            role: "Director of Sales",
                            image: "/team-2.jpg",
                            bio: "Specializes in luxury residential properties"
                        },
                        {
                            name: "Yousef Al Mannai",
                            role: "Head of Technology",
                            image: "/team-3.jpg",
                            bio: "Pioneer in proptech solutions for MENA region"
                        },
                        {
                            name: "Mariam Al Arrayed",
                            role: "Client Relations",
                            image: "/team-4.jpg",
                            bio: "Ensures exceptional customer experiences"
                        }
                    ].map((member, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                    <p className="text-primary font-medium mb-2">{member.role}</p>
                                    <p className="text-white/90 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bahrain Focus */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                <span className="border-b-4 border-white pb-2">Our Bahrain Advantage</span>
                            </h2>
                            <p className="text-lg mb-6">
                                Bahrain's real estate market offers unique opportunities with its strategic location, business-friendly environment, and high quality of life.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">✓</span>
                                    <span>Freehold ownership areas for expatriates</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">✓</span>
                                    <span>Tax-free property investments</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">✓</span>
                                    <span>Growing demand in prime locations like Amwaj, Seef, and Diyar</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 mt-1">✓</span>
                                    <span>Stable regulatory environment with RERA oversight</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src="/bahrain-map.jpg"
                                alt="Bahrain property hotspots"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/30"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Bahrain Real Estate?</h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Whether you're buying, selling, or investing, our team is ready to assist you with expert guidance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg font-bold transition-colors">
                            <Link href={'/properties'}>Browse Properties</Link>
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-bold transition-colors">
                            <Link href={'/contact'}>Contact Our Team</Link>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;