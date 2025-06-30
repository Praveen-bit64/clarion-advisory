'use client'
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import GlobalModal from '../components/GlobalModal';
import { CiEdit } from 'react-icons/ci';
import { useEditMode } from '../context/EditModeToggle';
import { CgCloseO } from 'react-icons/cg';

const page = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { isEditMode } = useEditMode();
    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const [isOpen, setIsOpen] = useState(false)
    const EditComponent = (props: { isOpen: boolean, setIsOpen: any, faqs: any }) => {
        const { isOpen, setIsOpen } = props
        return (
            <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                    {/* <div className="w-full flex justify-start items-start flex-col">
                            <label htmlFor="title" className="text-lg font-semibold">Section Visibility</label>
                            <Switcher enables={enables} />
                        </div> */}
                    <div className="w-full flex flex-col justify-start items-start p-4">
                        <h4 className='text-lg text-slate-800'>Manage FAQs</h4>
                        <ul className='w-full flex flex-col justify-center items-start'>
                            {faqs.map((item, ndx) => {
                                return (
                                    <li key={ndx} className='w-full m-2 p-2 bg-primary/20 text-md font-semibold'>{item.question} <CgCloseO className='inline' /></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="w-full flex justify-end items-end pt-3 gap-2">
                        <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                        <button className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                    </div>
                </div>
            </GlobalModal>
        )
    }


    const faqs = [
        {
            question: "What areas in Bahrain allow foreign property ownership?",
            answer: "Foreigners can purchase property in designated freehold areas including Amwaj Islands, Durrat Marina, Bahrain Bay, and Riffa Views. Some leasehold areas also permit long-term leases for expatriates."
        },
        {
            question: "What are the typical property transaction fees in Bahrain?",
            answer: "Total fees typically range from 2-5% of the property value, including 1.5% municipal registration fee, 1% real estate agent commission (if applicable), and legal fees. VAT may apply to some services."
        },
        {
            question: "How does the mortgage process work for expatriates in Bahrain?",
            answer: "Expatriates can obtain mortgages up to 70% of property value from Bahraini banks, typically with 5-20 year terms. You'll need proof of income, residency visa, and a downpayment of at least 30%."
        },
        {
            question: "What should I look for when buying off-plan property in Bahrain?",
            answer: "Verify the developer's RERA registration, completion track record, and escrow account status. Review the payment plan carefully and ensure all promises are in the sales contract. Our advisors can help assess project viability."
        },
        {
            question: "How do property taxes work in Bahrain?",
            answer: "Bahrain has no annual property taxes. There's a one-time 1.5% municipal fee upon purchase. Rental income is tax-free for individuals, though corporate landlords may have different obligations."
        },
        {
            question: "What's the rental yield potential in Bahrain's real estate market?",
            answer: "Average gross yields range from 5-8% depending on location and property type. Prime areas like Seef District and Amwaj Islands often achieve higher yields, while suburban family villas offer stable long-term returns."
        }
    ];
    const memoModal = useMemo(() => (
        <EditComponent isOpen={isOpen} setIsOpen={setIsOpen} faqs={faqs} />
    ), [isOpen])
    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-50 relative group">
            {isOpen && memoModal}
            {isEditMode && <div className="absolute w-full hidden min-h-full bg-primary/30 top-0 left-0 z-9999 group-hover:flex justify-center items-start border-4 border-rose-500">
                <CiEdit onClick={() => setIsOpen(true)} className="text-7xl text-rose-500 border-2 hover:border-rose-500 bg-white rounded-full p-2 hover:shadow-2xl absolute top-3.5 cursor-pointer" />
            </div>}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Get answers to common queries about Bahrain's real estate market and our services
                    </p>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                className={`w-full flex justify-between items-center p-6 text-left ${activeIndex === index ? 'bg-white' : 'bg-white'}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-slate-800 pr-4">
                                    {faq.question}
                                </h3>
                                <span className="text-primary">
                                    {activeIndex === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                                </span>
                            </button>

                            <div
                                className={`px-6 pb-6 pt-0 transition-all duration-300 ease-in-out ${activeIndex === index ? 'block bg-white' : 'hidden'}`}
                            >
                                <p className="text-slate-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-6">
                        Didn't find what you're looking for?
                    </p>
                    <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                        <Link href={'/contact'}> Contact Our Support Team</Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default page;