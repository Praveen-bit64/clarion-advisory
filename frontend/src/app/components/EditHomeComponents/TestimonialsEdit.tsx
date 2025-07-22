import { useEffect, useState } from "react";
import GlobalModal from "../GlobalModal";
import Switcher from "../Switcher";
import { toast } from "react-toastify";
import { useHomeComponentDetails } from "@/app/context/HomeComponentDetails";

interface TestimonialsEditProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestimonialsEdit = ({ isOpen, setIsOpen }: TestimonialsEditProps) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const { testimonials, reviews, refreshHomeComponents } = useHomeComponentDetails()
    const [editInputs, setEditInputs] = useState({
        title: testimonials.title,
        description: testimonials.description,
        isvisible: true,
        reviewer: {
            name: "",
            location: "",
            comment: "",
            rating: "",
            profile: null as File | null,
        },
    });

    const enables = (value: boolean) => {
        setIsEnabled(value);
        setEditInputs((prev) => ({
            ...prev,
            isvisible: value,
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement) {
            const file = e.target.files?.[0] || null;
            setEditInputs((prev) => ({
                ...prev,
                reviewer: { ...prev.reviewer, profile: file },
            }));
        } else if (["name", "location", "comment", "rating"].includes(name)) {
            setEditInputs((prev) => ({
                ...prev,
                reviewer: { ...prev.reviewer, [name]: value },
            }));
        } else {
            setEditInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Top-level fields
        formData.append('title', editInputs.title);
        formData.append('description', editInputs.description);
        formData.append('isvisible', editInputs.isvisible ? 'true' : 'false');

        // Nested reviewer fields
        formData.append('name', editInputs.reviewer.name);
        formData.append('location', editInputs.reviewer.location);
        formData.append('comment', editInputs.reviewer.comment);
        formData.append('rating', editInputs.reviewer.rating);

        // Profile image
        if (editInputs.reviewer.profile) {
            formData.append('profile', editInputs.reviewer.profile);
        }

        try {
            const res = await fetch('/api/homecomponents/settestimonials', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (!data.error) {
                toast.success('Component updated');
                refreshHomeComponents()
                setIsOpen(false)
            } else {
                toast.error(data.message || 'There was an error');
                setIsOpen(false)
            }
        } catch (err) {
            console.error('Submit error:', err);
            toast.error('Failed to send request');
        }
    };


    console.log(testimonials, reviews, "testimonialeditinputs");

    return (
        <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-full flex flex-col bg-white py-5 px-2 gap-3">
                <div className="w-full flex flex-col">
                    <label className="text-lg font-semibold">Section Visibility</label>
                    <Switcher enables={enables} />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label className="text-lg font-semibold">Title</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={editInputs.title}
                        name="title"
                        placeholder="Title"
                        className="w-full p-2 outline-none border border-slate-300 bg-white"
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label className="text-lg font-semibold">Description</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={editInputs.description}
                        name="description"
                        placeholder="Description"
                        className="w-full p-2 outline-none border border-slate-300 bg-white"
                    />
                </div>

                <div className="w-full border border-slate-300 p-2 py-3 rounded-lg bg-primary/10">
                    <h4 className="w-full text-center text-md font-semibold">Add New</h4>
                    <div className="w-full flex flex-wrap justify-center items-center gap-2">
                        <input
                            type="text"
                            onChange={handleChange}
                            value={editInputs.reviewer.name}
                            placeholder="Name"
                            className="w-[48%] outline-none p-2 border bg-white rounded-lg border-secondary/30"
                            name="name"
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={editInputs.reviewer.location}
                            placeholder="Location"
                            className="w-[48%] outline-none p-2 border bg-white rounded-lg border-secondary/30"
                            name="location"
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={editInputs.reviewer.comment}
                            placeholder="Comment"
                            className="w-[98%] outline-none p-3 border bg-white border-secondary/30"
                            name="comment"
                        />
                        <div className="w-[48%] flex flex-col gap-1.5">
                            <h4 className="text-sm font-semibold">Rating</h4>
                            <select
                                name="rating"
                                onChange={handleChange}
                                value={editInputs.reviewer.rating}
                                className="w-full outline-none p-2.5 border bg-white rounded-lg border-secondary/30"
                            >
                                <option value="">Select</option>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </select>
                        </div>
                        <div className="w-[48%] flex flex-col gap-1.5">
                            <h4 className="text-sm font-semibold">Profile</h4>
                            <input
                                type="file"
                                onChange={handleChange}
                                name="profile"
                                className="w-[96%] outline-none p-2 bg-green-50 border-2 border-dashed rounded-lg border-secondary/30"
                            />
                            {editInputs.reviewer.profile && (
                                <img
                                    src={URL.createObjectURL(editInputs.reviewer.profile)}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded-full mt-2"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end pt-3 gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-[100px] bg-amber-600 p-2 rounded-md text-white"
                    >
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="w-[100px] bg-secondary p-2 rounded-md text-white">
                        Confirm
                    </button>
                </div>
            </div>
        </GlobalModal>
    );
};

export default TestimonialsEdit;
