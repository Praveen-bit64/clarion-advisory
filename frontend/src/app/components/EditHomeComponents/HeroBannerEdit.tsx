'use client'
import { useHomeComponentDetails } from "@/app/context/HomeComponentDetails";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GlobalModal from "../GlobalModal";
import Switcher from "../Switcher";

const HeroBannerEdit = (props: { isOpen: boolean; setIsOpen: any }) => {

    const { isOpen, setIsOpen } = props;
    const { heroBanner, refreshHomeComponents } = useHomeComponentDetails()
    const [isEnabled, setIsEnabled] = useState(false);
    const enables = (value: boolean) => {
        setIsEnabled(value);
    };

    const [editCompInputs, setEditCompInputs] = useState<{
        title: string;
        description: string;
        isvisible: boolean;
    }>({
        title: heroBanner.title,
        description: heroBanner.description,
        isvisible: isEnabled,
    });

    // Sync isvisible when toggled
    useEffect(() => {
        setEditCompInputs((prev) => ({
            ...prev,
            isvisible: isEnabled,
        }));
    }, [isEnabled]);

    const handleEditCompOnchange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setEditCompInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    console.log(editCompInputs, 'faefaeafe');
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', editCompInputs.title);
            formData.append('description', editCompInputs.description);
            formData.append('isvisible', `${editCompInputs.isvisible}`); // boolean to string

            const res = await fetch('/api/homecomponents/setherobanner', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!data.error) {
                toast.success(data.message || 'Component Updated!');
                refreshHomeComponents()
                setIsOpen(false); // optional: close modal after success
            } else {
                toast.error(data.message || 'Failed, try again.');
                setIsOpen(false)
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-full flex flex-col bg-white py-5 px-2 gap-3">
                {/* Section Visibility */}
                <div className="w-full flex flex-col">
                    <label htmlFor="isvisible" className="text-lg font-semibold">
                        Section Visibility
                    </label>
                    <Switcher enables={enables} />
                </div>

                {/* Title */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="title" className="text-lg font-semibold">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={editCompInputs.title}
                        onChange={handleEditCompOnchange}
                        placeholder="Title"
                        className="w-full p-2 outline-none border border-slate-300 bg-white"
                    />
                </div>

                {/* Description */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="description" className="text-lg font-semibold">
                        Description
                    </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        value={editCompInputs.description}
                        onChange={handleEditCompOnchange}
                        placeholder="Description"
                        className="w-full p-2 outline-none border border-slate-300 bg-white"
                    />
                </div>

                {/* Buttons */}
                <div className="w-full flex justify-end pt-3 gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-[100px] bg-amber-600 p-2 rounded-md text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-[100px] bg-secondary p-2 rounded-md text-white"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </GlobalModal>
    );
};


export default HeroBannerEdit;