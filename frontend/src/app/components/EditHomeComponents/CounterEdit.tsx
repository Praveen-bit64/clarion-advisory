import { useEffect, useState } from "react"
import GlobalModal from "../GlobalModal"
import Switcher from "../Switcher"
import { toast } from "react-toastify"
import { useHomeComponentDetails } from "@/app/context/HomeComponentDetails"

const CounterEdit = (props: { isOpen: boolean, setIsOpen: any }) => {
    const { isOpen, setIsOpen } = props
    const [isEnabled, setIsEnabled] = useState(true)
    const { counter, refreshHomeComponents } = useHomeComponentDetails()
    const enables = (value: boolean) => {
        setIsEnabled(value)
    }
    const [editInputs, setEditInputs] = useState({
        title: counter.title,
        description: counter.description,
        isVisible: `${isEnabled}`,
        sec1Title: counter.sec1Title,
        sec1Count: counter.sec1Count,
        sec2Title: counter.sec2Title,
        sec2Count: counter.sec2Count,
        sec3Title: counter.sec3Title,
        sec3Count: counter.sec3Count
    })
    useEffect(() => {
        setEditInputs((prev) => ({
            ...prev,
            isVisible: `${isEnabled}`
        }))
    }, [isEnabled])
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditInputs((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    console.log(counter, "counterEditInptu");
    const handleSubmit = async () => {
        const res = await fetch('api/homecomponents/setcounter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contentValues: editInputs })
        })
        const data = await res.json()
        if (!data.error) {
            toast.success("Component Updated")
            refreshHomeComponents()
            setIsOpen(false)
        } else {
            toast.error("Error Updating component")
            setIsOpen(false)
        }
    }
    console.log(editInputs, "editInputs");

    return (
        <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="w-full flex justify-start items-start flex-col bg-white py-5 px-2 gap-3">
                <div className="w-full flex justify-start items-start flex-col">
                    <label htmlFor="title" className="text-lg font-semibold">Section Visibility</label>
                    <Switcher enables={enables} />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label htmlFor="title" className="text-md font-semibold">Title</label>
                    <input onChange={handleOnchange} value={editInputs.title} name="title" type="text" placeholder="Title" className="w-full p-1 outline-none border border-slate-300 bg-white" />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label htmlFor="title" className="text-md font-semibold">Description</label>
                    <input onChange={handleOnchange} value={editInputs.description} name="description" type="text" placeholder="Description" className="w-full p-1 outline-none border border-slate-300 bg-white" />
                </div>
                {/**section A */}
                <div className="w-full flex flex-col justify-center items-center gap-2 p-2 py-3 border border-slate-300">
                    <div className="w-full flex justify-start items-start gap-4 ">
                        {/* <span className="inline p-1 px-2 text-white bg-accent">Section A</span><input type="file" className="p-1 bg-green-100 border-2 border-dashed text-sm" name="" id="" /> */}
                    </div>
                    <div className="w-full flex justify-start items-start gap-2">
                        <div className="w-[48%] flex flex-col justify-center items-start gap-1.5">
                            <h4 className="text-xs font-semibold">Title</h4>
                            <input onChange={handleOnchange} value={editInputs.sec1Title} type="text" placeholder="Enter title" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="sec1Title" id="" />
                        </div>
                        <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                            <h4 className="text-xs font-semibold">Count</h4>
                            <input onChange={handleOnchange} value={editInputs.sec1Count} type="number" placeholder="Enter Count" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="sec1Count" id="" />
                        </div>
                    </div>
                </div>
                {/**section B */}
                <div className="w-full flex flex-col justify-center items-center gap-2 p-2 py-3 border border-slate-300">
                    <div className="w-full flex justify-start items-start gap-4 ">
                        {/* <span className="inline p-1 px-2 text-white bg-accent">Section B</span><input type="file" className="p-1 bg-green-100 border-2 border-dashed text-sm" name="" id="" /> */}
                    </div>
                    <div className="w-full flex justify-start items-start gap-2">
                        <div className="w-[48%] flex flex-col justify-center items-start gap-1.5">
                            <h4 className="text-xs font-semibold">Title</h4>
                            <input type="text" onChange={handleOnchange} value={editInputs.sec2Title} placeholder="Enter title" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="sec2Title" id="" />
                        </div>
                        <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                            <h4 className="text-xs font-semibold">Count</h4>
                            <input type="number" onChange={handleOnchange} value={editInputs.sec2Count} placeholder="Enter Count" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="sec2Count" id="" />
                        </div>
                    </div>
                </div>
                {/**section C */}
                <div className="w-full flex flex-col justify-center items-center gap-2 p-2 py-3 border border-slate-300">
                    <div className="w-full flex justify-start items-start gap-4 ">
                        {/* <span className="inline p-1 px-2 text-white bg-accent">Section C</span><input type="file" className="p-1 bg-green-100 border-2 border-dashed text-sm" name="" id="" /> */}
                    </div>
                    <div className="w-full flex justify-start items-start gap-2">
                        <div className="w-[48%] flex flex-col justify-center items-start gap-1.5">
                            <h4 className="text-xs font-semibold">Title</h4>
                            <input onChange={handleOnchange} value={editInputs.sec3Title} type="text" placeholder="Enter title" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="sec3Title" id="" />
                        </div>
                        <div className="w-[48%] flex flex-col justify-start items-start gap-1.5">
                            <h4 className="text-xs font-semibold">Count</h4>
                            <input type="number" onChange={handleOnchange} value={editInputs.sec3Count} placeholder="Enter Count" className="w-full p-1 outline-none border border-secondary/20 text-sm" name="sec3Count" id="" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end items-end pt-3 gap-2">
                    <button onClick={() => setIsOpen(false)} className="w-[100px] bg-amber-600 p-2 rounded-md text-white">Cancel</button>
                    <button onClick={handleSubmit} className="w-[100px] bg-secondary p-2 rounded-md text-white">Confirm</button>
                </div>
            </div>
        </GlobalModal>
    )
}

export default CounterEdit