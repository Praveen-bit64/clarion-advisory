'use client'
import { useState, useCallback, useMemo, useEffect } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { useUserDetails } from "../context/UserDetails";
import Image from "next/image";

interface LoginInputs {
    user: string;
    password: string;
}

type FormMode = 'login' | 'register' | 'reset';

const LoginRegUser = () => {
    const [mode, setMode] = useState<FormMode>('login');
    const [resetEmail, setResetEmail] = useState('')
    const [confirmPass, setConfirmPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [resetCode, setResetCode] = useState<number | null>(null);
    const [generatedCode, setGeneratedCode] = useState<number | null>(null);
    const [resetStage, setResetStage] = useState<'codesend' | 'codevalid' | 'resetpassword'>('codesend');
    const [viewPassword, setViewPassword] = useState(false);
    const [loginInputs, setLoginInputs] = useState<LoginInputs>({ user: '', password: '' });

    const {
        registerInputs,
        inputErrs,
        registerOnchange,
        isFormSubmitting,
        validateForm,
        handleRegisterFormSubmit,
        resetForm
    } = useRegisterForm();

    const router = useRouter();
    const { setStoredUserId } = useUserDetails();

    // Memoized preview image URL
    const previewImage = useMemo(() => {
        if (registerInputs.profile instanceof File) {
            return URL.createObjectURL(registerInputs.profile);
        }
        return null;
    }, [registerInputs.profile]);

    // Register user handler
    const registerForm = useCallback(async (vals: typeof registerInputs) => {
        const formData = new FormData();

        Object.entries(vals).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, key === 'phone' ? value.toString() : value);
            }
        });

        try {
            const res = await fetch("/api/authentication/register", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.error) {
                toast.success(data?.message || "Registered Successfully");
                resetForm();
                setMode('login');
            } else {
                toast.error(data?.message || "There was an Error");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error("Register error:", err);
        }
    }, [resetForm]);

    // Login user handler
    const onSubmitLogin = useCallback(async () => {
        if (!loginInputs.user || !loginInputs.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch('/api/authentication/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInputs)
            });

            const data = await res.json();

            if (!data.error) {
                toast.success(data.message ?? 'Login successful');
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);
                setStoredUserId(data.userId);
                setTimeout(() => router.push('/'), 1000);
            } else {
                toast.error(data.message ?? 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error("Error logging in user", err);
            toast.error("Internal Server Error");
        }
    }, [loginInputs, router, setStoredUserId]);

    const onChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInputs(prev => ({ ...prev, [name]: value }));
    }, []);

    //reset password
    // Countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const sendCodeToMail = async (code: number) => {
        const res = await fetch('/api/authentication/sendresetcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code, to: resetEmail })
        })
        const data = await res.json()
        if (!data.error) {
            toast.success(`Reset code sent to your email`);
            setResetStage('codevalid');
            setResendTimer(60); // lock resend for 60 seconds
        } else {
            toast.error(data?.message || 'Try after sometime')
        }
    }

    const resetpassword = async () => {
        const res = await fetch('/api/authentication/resetpassoword', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resetEmail, confirmPass })
        })
        const data = await res.json()
        if (!data.error) {
            toast.success("Password reset successful")
        } else {
            toast.error(data?.message || 'Try after sometime')
        }
    }

    const sendResetCode = () => {
        const randCode = Math.floor(1000 + Math.random() * 9000); // 4-digit
        setGeneratedCode(randCode)
        sendCodeToMail(randCode)
    };

    const handleResetPassword = useCallback(() => {
        if (!resetEmail) {
            toast.error("Please enter your email");
            return;
        }

        if (resetStage === 'codesend') {
            sendResetCode();
        }

        else if (resetStage === 'codevalid') {
            if (resetCode === generatedCode) {
                toast.success("Code verified!");
                setResetStage('resetpassword');
            } else {
                toast.error("Invalid reset code");
            }
        }

        else if (resetStage === 'resetpassword') {
            if (!newPass || !confirmPass) {
                toast.error("Please fill in both password fields");
                return;
            }
            if (newPass !== confirmPass) {
                toast.error("Passwords do not match");
                return;
            }
            resetpassword()
            // Optionally reset
            setResetEmail('');
            setResetCode(null);
            setGeneratedCode(null);
            setNewPass('');
            setConfirmPass('');
            setResetStage('codesend');
            setMode('login')
        }

    }, [resetEmail, resetCode, generatedCode, newPass, confirmPass, resetStage]);



    // Shared form container styles
    const formContainerClasses = "z-20 w-[90%] max-w-sm bg-white/80 p-8 rounded-sm shadow-xl transition-all duration-400";

    return (
        <div className="w-full min-h-screen flex justify-center items-center relative overflow-hidden flex-wrap py-5">
            {/* Background Image and Overlay */}
            <div className="absolute w-full h-full top-0 left-0">
                <div className="absolute w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 z-10" />
                <Image
                    src="/login-bg.png"
                    alt="Login Background"
                    fill
                    className="object-cover blur-[2px]"
                    priority
                />
            </div>

            {/* Login Form */}
            <div className={`${formContainerClasses} border-2 border-l-secondary border-t-secondary border-r-primary border-b-primary ${mode === 'login' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none absolute'
                }`}>
                <div className="w-full flex justify-center items-center">
                    <Image
                        src="/clarion-logo.png"
                        width={180}
                        height={80}
                        alt="Clarion logo"
                        priority
                    />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Login to Your Account</h2>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="user"
                        value={loginInputs.user}
                        onChange={onChangeLogin}
                        placeholder="Email / Phone"
                        className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <div className="w-full flex relative">
                        <input
                            type={viewPassword ? 'text' : 'password'}
                            name="password"
                            value={loginInputs.password}
                            onChange={onChangeLogin}
                            placeholder="Password"
                            className="w-full p-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-4"
                            onClick={() => setViewPassword(!viewPassword)}
                        >
                            {viewPassword ? <IoEye className="text-lg" /> : <IoEyeOff className="text-lg" />}
                        </button>
                    </div>
                    <button
                        onClick={onSubmitLogin}
                        className="bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-semibold transition-colors"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('reset')}
                        className="text-sm text-gray-500 hover:text-secondary hover:underline"
                    >
                        Forgot password?
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <button
                        onClick={() => setMode('register')}
                        className="text-secondary hover:underline focus:outline-none"
                    >
                        Register
                    </button>
                </p>
            </div>

            {/* Register Form */}
            <div className={`${formContainerClasses} border-2 border-l-secondary border-t-secondary border-r-primary border-b-primary ${mode === 'register' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none absolute'
                }`}>
                <div className="w-full flex justify-center items-center">
                    <Image
                        src="/clarion-logo.png"
                        width={180}
                        height={80}
                        alt="Clarion logo"
                        priority
                    />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Register New Account</h2>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
                            onChange={registerOnchange}
                        />
                        {previewImage && (
                            <div className="flex justify-center">
                                <Image
                                    src={previewImage}
                                    alt="Preview"
                                    width={80}
                                    height={80}
                                    className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-secondary shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    {['name', 'phone', 'email', 'city'].map((field) => (
                        <div key={field}>
                            <input
                                type={field === 'phone' ? 'number' : 'text'}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                name={field}
                                onChange={registerOnchange}
                                value={registerInputs[field as keyof typeof registerInputs] || ''}
                                className="w-full p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                            {inputErrs?.[field as keyof typeof inputErrs] && (
                                <p className="text-sm text-red-500">{inputErrs[field as keyof typeof inputErrs]}</p>
                            )}
                        </div>
                    ))}

                    <div className="w-full flex relative">
                        <input
                            type={viewPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name="password"
                            onChange={registerOnchange}
                            value={registerInputs.password}
                            className="w-full p-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-4"
                            onClick={() => setViewPassword(!viewPassword)}
                        >
                            {viewPassword ? <IoEye className="text-lg" /> : <IoEyeOff className="text-lg" />}
                        </button>
                    </div>
                    {inputErrs?.password && <p className="text-sm text-red-500">{inputErrs.password}</p>}

                    <button
                        onClick={() => handleRegisterFormSubmit(registerForm)}
                        disabled={isFormSubmitting}
                        className="bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-70"
                    >
                        {isFormSubmitting ? <Loader type="bars" color="white" /> : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}
                    <button
                        onClick={() => setMode('login')}
                        className="text-secondary hover:underline focus:outline-none"
                    >
                        Login
                    </button>
                </p>
            </div>

            {/* Reset Password Form */}
            <div className={`${formContainerClasses} border-2 border-l-yellow-400 border-t-yellow-400 border-r-yellow-500 border-b-yellow-500 ${mode === 'reset' ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none absolute'
                }`}>
                <div className="w-full flex justify-center items-center">
                    <Image
                        src="/clarion-logo.png"
                        width={180}
                        height={80}
                        alt="Clarion logo"
                        priority
                    />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Reset Password</h2>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    {resetStage === 'codesend' && (
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    )}

                    {resetStage === 'codevalid' && (
                        <>
                            <input
                                type="number"
                                value={resetCode || ''}
                                onChange={(e) => setResetCode(Number(e.target.value))}
                                placeholder="Enter Reset Code"
                                className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={sendResetCode}
                                    className={`text-sm font-medium text-blue-600 disabled:text-gray-400`}
                                    disabled={resendTimer > 0}
                                >
                                    Resend Code {resendTimer > 0 && `(${resendTimer}s)`}
                                </button>
                            </div>
                        </>
                    )}

                    {resetStage === 'resetpassword' && (
                        <>
                            <input
                                type="password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                placeholder="Enter New Password"
                                className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                            <input
                                type="password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                placeholder="Confirm Password"
                                className="p-3 rounded-sm border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-secondary"
                            />
                        </>
                    )}

                    <button
                        type="button"
                        onClick={handleResetPassword}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-md font-semibold transition-colors"
                    >
                        {resetStage === 'codesend'
                            ? 'Send Reset Code'
                            : resetStage === 'codevalid'
                                ? 'Verify Code'
                                : 'Reset Password'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Remember your password?{' '}
                    <button
                        onClick={() => setMode('login')}
                        className="text-secondary hover:underline focus:outline-none"
                    >
                        Back to Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginRegUser;