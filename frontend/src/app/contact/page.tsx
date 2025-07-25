'use client'
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaClock, FaEnvelope } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { LuLink2 } from "react-icons/lu";
import { useContactForm } from "../hooks/useContactForm";
import { toast } from "react-toastify";
import { useSiteInfo } from "../context/SiteInfoContext";
import { useContact } from "../context/ContactContext";
import Loader from "../components/Loader";

const Contact = () => {
    const { inputValues, inputErrs, isContactFormSubmitting, contactOnChange, validateContactForm, submitContactForm } = useContactForm()
    console.log(inputValues, inputErrs, 'contactinputvalues');
    const { contactInfo } = useContact()
    const { siteInfo } = useSiteInfo()
    const formSubmit = async (vals: typeof inputValues) => {
        const res = await fetch('/api/contactenquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: contactInfo?.email, Data: vals })
        })
        const data = await res.json()

        if (!data.error) {
            toast.success("Form Submitted, We'll Cantact you soon")

        } else {
            toast.error(data?.message || "There was an Error")
        }
    }
    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col gap-3.5">
            <div className="w-full min-h-[900px] relative ">
                <div className="w-full lg:h-[500px] h-[300px]">
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${contactInfo?.address}`)}&output=embed`}
                        width="100%"
                        height="100%"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className="lg:absolute lg:w-[40%] w-full  min-h-[700px] pt-10 flex flex-wrap justify-start items-start gap-3.5 p-4 rounded-lg bg-gradient-to-r from-primary/80 to-secondary/80 top-28 left-28 border-2 border-slate-100">
                    <h1 className="w-full text-2xl text-white font-semibold">Have questions? Get in touch!</h1>
                    <div className="lg:w-[48%] w-[98%] flex flex-col justify-start items-start gap-1.5">
                        <h4 className="text-md font-semibold text-white/90">First Name</h4>
                        <input name="fName" value={inputValues.fName} onChange={contactOnChange} type="text" placeholder="First Name" className="w-full p-2 border-white rounded-lg outline-none bg-white" />
                        {inputErrs.fName && <span className="text-sm text-red-500">{inputErrs.fName}</span>}
                    </div>
                    <div className="lg:w-[48%] w-[98%] flex flex-col justify-start items-start gap-1.5">
                        <h4 className="text-md font-semibold text-white/90">Last Name</h4>
                        <input name="lName" value={inputValues.lName} onChange={contactOnChange} type="text" placeholder="Last Name" className="w-full p-2 border-white rounded-lg outline-none bg-white" />
                        {inputErrs.lName && <span className="text-sm text-red-500">{inputErrs.lName}</span>}
                    </div>
                    <div className="lg:w-[48%] w-[98%] flex flex-col justify-start items-start gap-1.5">
                        <h4 className="text-md font-semibold text-white/90">Phone</h4>
                        <input name="phone" value={inputValues.phone} onChange={contactOnChange} type="number" placeholder="Phone" className="w-full p-2 border-white rounded-lg outline-none bg-white" />
                        {inputErrs.phone && <span className="text-sm text-red-500">{inputErrs.phone}</span>}
                    </div>
                    <div className="lg:w-[48%] w-[98%] flex flex-col justify-start items-start gap-1.5">
                        <h4 className="text-md font-semibold text-white/90">Email</h4>
                        <input name="email" value={inputValues.email} onChange={contactOnChange} type="text" placeholder="Email" className="w-full p-2 border-white rounded-lg outline-none bg-white" />
                        {inputErrs.email && <span className="text-sm text-red-500">{inputErrs.email}</span>}
                    </div>
                    <div className="w-[98%] flex flex-col justify-start items-start gap-1.5">
                        <h4 className="text-md font-semibold text-white/90">Company(Optional)</h4>
                        <input name="company" value={inputValues.company} onChange={contactOnChange} type="text" placeholder="Company Name" className="w-full p-2 border-white rounded-lg outline-none bg-white" />
                        {inputErrs.company && <span className="text-sm text-red-500">{inputErrs.company}</span>}
                    </div>
                    <div className="w-[98%] flex flex-col justify-start items-start gap-1.5">
                        <h4 className="text-md font-semibold text-white/90">Message</h4>
                        <input name="message" value={inputValues.message} onChange={contactOnChange} type="text" placeholder="Message" className="w-full h-[90px] p-2 border-white rounded-lg outline-none bg-white" />
                        {inputErrs.message && <span className="text-sm text-red-500">{inputErrs.message}</span>}
                    </div>
                    <div className="w-full flex justify-center items-center mt-3.5">
                        {!isContactFormSubmitting ? <button onClick={() => submitContactForm(formSubmit)} className="p-2 rounded-sm bg-white/90 text-black font-semibold px-10">Submit <IoIosSend className="inline text-2xl" /></button> : <button className="p-2 rounded-sm bg-white/90 text-black font-semibold px-10"><Loader type="rings" /></button>}
                    </div>
                </div>
                <div className="lg:absolute lg:w-[50%] right-5 pl-10 top-[60%] p-5 flex flex-col justify-center items-start mt-5 gap-4.5">
                    <h1 className="w-[40%] text-2xl font-semibold">We’d love to hear from you.</h1>
                    <p className="text-md font-mono w-[80%]">Have questions or need assistance? We're here to help. Reach out to us using the form below or connect with our team through the provided contact details.</p>
                </div>
            </div>
            <section className="w-full flex flex-col lg:flex-row min-h-[500px]">
                {/* Left: Info Section */}
                <div className="lg:w-1/2 w-full h-[300px] lg:h-auto">
                    <img
                        src="/contact-bg.jpg"
                        alt="Contact Background"
                        className="w-full h-full object-cover   "
                    />
                </div>


                {/* Right: Image Section */}
                <div className="lg:w-1/2 w-full p-6 lg:p-12 bg-white flex flex-col justify-center rounded-2xl">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" /> Office Location
                    </h2>

                    <div className="space-y-6">
                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-xl text-secondary mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">{siteInfo?.siteName}</h3>
                                <p className="text-slate-600 lg:w-1/4 w-full">{contactInfo?.address}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-xl text-secondary mt-1" />
                            <p className="text-slate-700">
                                <span className="font-semibold">Phone:</span> {contactInfo?.phone}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-xl text-secondary mt-1" />
                            <p className="text-slate-700">
                                <span className="font-semibold">Email:</span> {contactInfo?.email}
                            </p>
                        </div>

                        {/* Working Hours */}
                        <div className="flex items-start gap-4">
                            <FaClock className="text-xl text-secondary mt-1" />
                            <div>
                                <p className="text-slate-700 font-semibold">Working Hours</p>
                                <p className="text-slate-600">Sunday – Thursday: 9:00 AM – 6:00 PM</p>
                                <p className="text-slate-600">Friday & Saturday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;