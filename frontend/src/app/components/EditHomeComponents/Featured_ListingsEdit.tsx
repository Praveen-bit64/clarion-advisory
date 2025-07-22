'use client'
import { useEffect, useState } from "react";
import GlobalModal from "../GlobalModal";
import Switcher from "../Switcher";
import { toast } from "react-toastify";
import { useHomeComponentDetails } from "@/app/context/HomeComponentDetails";
import { Description } from "@headlessui/react";

interface editInputs {
    title: string,
    description: string,
    isvisible: any
}
const Featured_ListingsEdit = (props: { isOpen: boolean, setIsOpen: any }) => {
    const { isOpen, setIsOpen } = props
    const [isEnabled, setIsEnabled] = useState(true)
    const { featured_listings, refreshHomeComponents } = useHomeComponentDetails()
    const [editInputs, setEditInputs] = useState<editInputs>({
        title: featured_listings.title,
        description: featured_listings.description,
        isvisible: isEnabled
    })
    console.log(editInputs, 534534);
    useEffect(() => {
        setEditInputs((prev) => ({
            ...prev,
            isvisible: isEnabled
        }))
    }, [isEnabled])
    const handleEditOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditInputs(prev => (
            { ...prev, [name]: value }
        ))
    }
    const enables = (value: boolean) => {
        setIsEnabled(value)
    }
    const handlesubmit = async () => {
        const formData = new FormData()
        formData.append('title', editInputs.title)
        formData.append('description', editInputs.description)
        formData.append('isvisible', `${editInputs.isvisible}`)
        const res = await fetch('/api/homecomponents/setfeaturedlistings', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        if (!data.error) {
            toast.success(data?.message || 'Component updated')
            refreshHomeComponents()
            setIsOpen(false)
        } else {
            toast.error("Error Updating Component Data")
            setIsOpen(false)
        }
    }
    return (
        <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                <div className="w-full flex justify-start items-start flex-col">
                    <label htmlFor="title" className="text-lg font-semibold">Section Visibility</label>
                    <Switcher enables={enables} />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label htmlFor="title" className="text-lg font-semibold">Title</label>
                    <input onChange={handleEditOnchange} value={editInputs.title} name='title' type="text" placeholder="Title" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label htmlFor="title" className="text-lg font-semibold">Description</label>
                    <input onChange={handleEditOnchange} value={editInputs.description} name='description' type="text" placeholder="Description" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                </div>
                <div className="w-full flex justify-end items-end pt-3 gap-2">
                    <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                    <button onClick={handlesubmit} className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                </div>
            </div>
        </GlobalModal>
    )
}

export default Featured_ListingsEdit;