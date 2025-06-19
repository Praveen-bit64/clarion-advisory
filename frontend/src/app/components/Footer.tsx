'use client'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const socials = [
        { icon: FaXTwitter, link: '#', colorCode: 'rgb(206,210,205)' },    // Twitter
        { icon: FaFacebookF, link: '#', colorCode: 'rgb(24,119,242)' },   // Facebook
        { icon: FaInstagram, link: '#', colorCode: 'rgb(228,64,95)' },    // Instagram
        { icon: FaLinkedin, link: '#', colorCode: 'rgb(0,119,181)' },     // LinkedIn
    ];

    return (
        <div className="w-full bg-slate-950 flex justify-center items-start p-5 gap-1 flex-wrap">
            <div className="w-[33%] min-h-[250px] flex justify-start items-start gap-10 flex-col p-4 pl-16">
                <img
                    src="/clarion-logo.png"
                    className="w-[150px] bg-slate-100 rounded-sm"
                    alt="clarion advisory logo"
                />
                <div className="w-full flex justify-start items-center gap-3">
                    <div className="rounded-lg p-5 bg-white/10">
                        <p className="text-sm text-slate-300">Toll Free Customer Care</p>
                        <h4 className="text-md text-slate-50 font-semibold">+(0) 123 050 945 02</h4>
                    </div>
                    <div className="rounded-lg p-5 bg-white/10">
                        <p className="text-sm text-slate-300">Need Support?</p>
                        <h4 className="text-md text-slate-50 font-semibold">hi@homez.com</h4>
                    </div>
                </div>

                <div>
                    <p className="text-lg font-bold text-slate-200 mb-2">Follow us on social media</p>
                    <ul className="flex gap-3">
                        {socials.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <li key={idx}>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex justify-center items-center rounded-md bg-slate-800 hover:scale-105 transition-all duration-300"
                                        style={{ backgroundColor: 'transparent' }}
                                    >
                                        <Icon
                                            className="text-white text-2xl"
                                            style={{
                                                transition: 'all 0.3s ease-in-out',
                                                color: item.colorCode
                                            }}
                                        // onMouseEnter={(e) => {
                                        //     e.currentTarget.parentElement!.style.backgroundColor = item.colorCode;
                                        // }}
                                        // onMouseLeave={(e) => {
                                        //     e.currentTarget.parentElement!.style.backgroundColor = 'transparent';
                                        // }}
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="w-[63%] min-h-[250px] flex justify-start items-start gap-10 flex-col p-4 pr-16">
                <div className="w-full">
                    <h3 className="text-md mb-2 text-slate-100 font-semibold">Keep Yourself Up to Date</h3>
                    <div className="w-full flex justify-start items-center gap-1 bg-white/10 p-3 rounded-lg">
                        <input type="text" placeholder="Enter Email" className="w-full h-full p-3 text-slate-300 outline-none" />
                        <button className="text-md font-semibold cursor-pointer text-secondary inline">Subscribe</button>
                    </div>
                </div>
                <div className="w-full flex justify-between items-start gap-4">
                    <div className="">
                        <h2 className="text-md text-slate-100 font-semibold">Popular Search</h2>
                        <ul>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Apartment for Rent</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Apartment Low to Hide</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Offices for Buy</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Offices for Rent</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">villas for Rent in Bahrain</li>
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="text-md text-slate-100 font-semibold">Quick Links</h2>
                        <ul>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Terms of Use</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Privacy Policy</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Contact Support</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">About Us</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Home</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">FAQs</li>
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="text-md text-slate-100 font-semibold">Discover</h2>
                        <ul>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Bahrain</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Adliya</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Barbar</li>
                            <li className="text-slate-400 text-sm py-3 cursor-pointer hover:underline hover:text-secondary duration-200">Janabia</li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="w-[90%] h-[1px] bg-slate-600">
            </div>
            <div className="py-4 flex justify-between items-center">
                <p className="captalize text-slate-300">©Clarion Advisory WLL - All rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
