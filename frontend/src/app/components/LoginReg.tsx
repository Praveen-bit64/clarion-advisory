'use client'
import { useState } from "react";

const LoginReg = () => {
    const [login, setLogin] = useState(true)
    return (
        <div className="w-full h-screen flex justify-center items-center relative overflow-hidden flex-wrap">
            {/* Background Image and Overlay */}
            <div className="absolute w-full h-full top-0 left-0">
                <div className="absolute w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 z-10" />
                <img
                    src="/login-bg.png"
                    className="w-full h-full object-cover blur-[2px]"
                    alt="Login Background"
                />
            </div>

            {/* Centered Login Form */}
            <div className={`z-20 w-[90%] max-w-sm bg-white/80 p-8 rounded-sm shadow-xl border-2 border-l-secondary border-t-secondary border-r-primary border-b-primary transition-all duration-400 ${login ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none absolute'}`}>
                <div className="w-full flex justify-center items-center">
                    <img src="/clarion-logo.png" className="w-[180px] place-items-center" alt="clarion log" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Login to Your Account</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-semibold"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account? <span onClick={() => setLogin(false)} className="text-secondary cursor-pointer hover:underline">Register</span>
                </p>
            </div>

            {/* Register Form */}
            <div className={`z-20 w-[90%] max-w-sm bg-white/80 p-8 rounded-sm shadow-xl border-2 border-l-secondary border-t-secondary border-r-primary border-b-primary transition-all duration-400 ${!login ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none absolute'}`}>
                <div className="w-full flex justify-center items-center">
                    <img src="/clarion-logo.png" className="w-[180px] place-items-center" alt="clarion log" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Register New Account</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <input
                        type="text"
                        placeholder="Authentication Code"
                        className="p-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <span className="text-[12px] text-primary text-end cursor-pointer">Forgot/Resent Authentication Code</span>
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-semibold"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <span onClick={() => setLogin(true)} className="text-secondary cursor-pointer hover:underline">Login</span>
                </p>
            </div>
        </div>
    );
};

export default LoginReg;