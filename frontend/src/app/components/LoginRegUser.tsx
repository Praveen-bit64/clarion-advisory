'use client'
import { useState } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { toast } from "react-toastify";
import Loader from "./Loader";

const LoginRegUser = () => {
    const [login, setLogin] = useState(true)
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { registerInputs, inputErrs, registerOnchange, isFormSubmitting, validateForm, handleRegisterFormSubmit } = useRegisterForm()
    console.log(inputErrs, 3534535);
    const registerForm = async (vals: typeof registerInputs) => {
        const formData = new FormData();

        formData.append("name", vals.name);
        formData.append("city", vals.city);
        if (vals.phone !== undefined && vals.phone !== null) {
            formData.append("phone", vals.phone.toString());
        }

        formData.append("email", vals.email);
        formData.append("password", vals.password);

        if (vals.profile instanceof File) {
            formData.append("profile", vals.profile);
        }

        try {
            const res = await fetch("/api/authentication/register", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.error) {
                toast.success(data?.message || "Registered Successfully");
                setPreviewImage(null)
                setLogin(true)
            } else {
                toast.error(data?.message || "There was an Error");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error("Register error:", err);
        }
    };
    console.log(registerInputs, 452366);

    return (
        <div className="w-full min-h-screen flex justify-center items-center relative overflow-hidden flex-wrap py-5">
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
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    {/* 📸 Profile Image Upload */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="profileImage" className="text-sm text-slate-700 font-medium">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profile"
                            accept="image/*"
                            className="p-2 rounded-sm border border-gray-300/70 text-slate-800 focus:outline-none focus:ring-1 focus:ring-secondary bg-white/20"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const imageUrl = URL.createObjectURL(file);
                                    setPreviewImage(imageUrl);
                                }
                                registerOnchange(e); // ✅ Call the function
                            }}

                        />
                        {previewImage && (
                            <div className="flex justify-center">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-secondary shadow-sm"
                                />

                            </div>
                        )}
                    </div>

                    {/* 📨 Email Field */}
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={registerOnchange}
                        value={registerInputs.name}
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    {inputErrs?.name && <p className="text-sm text-red-500">{inputErrs.name}</p>}
                    <input
                        type="number"
                        placeholder="Phone"
                        name="phone"
                        onChange={registerOnchange}
                        value={registerInputs?.phone || ''}
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    {inputErrs?.phone && <p className="text-sm text-red-500">{inputErrs.phone}</p>}
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={registerOnchange}
                        value={registerInputs.email}
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    {inputErrs?.email && <p className="text-sm text-red-500">{inputErrs.email}</p>}
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={registerOnchange}
                        value={registerInputs.city}
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    {inputErrs?.city && <p className="text-sm text-red-500">{inputErrs.city}</p>}
                    {/* 🔐 Password Field */}
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={registerOnchange}
                        value={registerInputs.password}
                        className="p-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    {inputErrs?.password && <p className="text-sm text-red-500">{inputErrs.password}</p>}

                    {!isFormSubmitting ? <button
                        type="submit"
                        onClick={() => handleRegisterFormSubmit(registerForm)}
                        className="bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-semibold"
                    >
                        Register
                    </button> :
                        <div className="bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-semibold">
                            <Loader type="bars" color="white" />
                        </div>
                    }
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <span onClick={() => setLogin(true)} className="text-secondary cursor-pointer hover:underline">Login</span>
                </p>
            </div>
        </div>
    );
};

export default LoginRegUser;