import { useEffect, useState } from "react"
import GlobalModal from "../GlobalModal"
import Switcher from "../Switcher"
import { toast } from "react-toastify"
import { useHomeComponentDetails } from "@/app/context/HomeComponentDetails"

const RecentlyAddedEdit = (props: { isOpen: boolean, setIsOpen: any }) => {
    const { isOpen, setIsOpen } = props
    const [isEnabled, setIsEnabled] = useState(true)
    const enables = (value: boolean) => {
        setIsEnabled(value)
    }
    const { recentlyadded, refreshHomeComponents } = useHomeComponentDetails()
    const [editInputs, setEditInputs] = useState({
        title: recentlyadded.title,
        description: recentlyadded.description,
        isvisible: isEnabled
    })
    useEffect(() => {
        setEditInputs((prev) => ({
            ...prev,
            isvisible: isEnabled
        }))
    }, [isEnabled])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditInputs((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async () => {
        const res = await fetch('/api/homecomponents/setrecentlyadded', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputValues: editInputs })
        })
        const data = await res.json()
        if (!data.error) {
            toast.success("Component updated")
            refreshHomeComponents()
            setIsOpen(false)
        } else {
            toast.error(data?.error || "Uncatched Errors")
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
                    <input onChange={handleChange} value={editInputs.title} name="title" type="text" placeholder="Title" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label htmlFor="title" className="text-lg font-semibold">Description</label>
                    <input type="text" onChange={handleChange} value={editInputs.description} name="description" placeholder="Description" className="w-full p-2 outline-none border border-slate-300 bg-white" />
                </div>
                <div className="w-full flex justify-end items-end pt-3 gap-2">
                    <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                    <button onClick={handleSubmit} className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                </div>
            </div>
        </GlobalModal>
    )
}
export default RecentlyAddedEdit