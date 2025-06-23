import { BiSearch } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import propertyData from '@/app/data/propertyData.json'

const ManageListings = () => {
    return (
        <div className="w-full mt-8 pr-4">
            {/**Title */}
            <div className="w-full flex justify-between items-center">
                <h1 className=" w-[38%] text-2xl text-slate-800 font-semibold text-start capitalize">Manage your listings</h1>
                <div className="w-[60%] flex justify-end items-center gap-4 pr-3">
                    <div className="w-full py-1 px-2 border bg-white border-slate-200 rounded-xl flex justify-start items-center"><BiSearch className=" text-2xl inline" />
                        <input type="text" className="p-2 rounded-lg outline-none" placeholder="Search" />
                    </div>
                    <div className="w-full p-2 border bg-white border-slate-200 rounded-xl flex justify-start items-center"><span className="text-sm text-slate-400 inline">sortby:</span>
                        <select name="" id="" className="outline-none border-none p-2 w-full">
                            <option value="">All</option>
                            <option value="">For Sale</option>
                            <option value="">For Rent</option>
                        </select>
                    </div>
                    <button className="w-full p-2 bg-primary rounded-lg font-semibold text-slate-50">Add New Property</button>
                </div>
            </div>
            {/**content */}
            <div className="w-full  h-[500px]  overflow-auto custom-scrollbar mt-5">
                <table className="w-full text-left border border-gray-200">
                    <thead className="bg-white text-center">
                        <tr className="py-5 ">
                            <th className="w-1/2 px-4 py-3 text-start text-2xl">Listing</th>
                            <th className="px-4 py-3 text-start text-xl">Date</th>
                            <th className="px-4 py-3 text-start text-xl">Status</th>
                            <th className="px-4 py-3 text-start text-xl">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {propertyData.slice(0.10).map((item, ndx) => {
                            return (
                                <tr key={ndx} className={`border-t border-gray-100 overflow-y-auto custom-scrollbar ${ndx % 2 === 0 ? 'bg-primary/30' : 'bg-primary/10'}`}>
                                    <td className="w-1/2 px-4 py-3">
                                        <div className="flex items-center gap-4 flex-row">
                                            <div className="w-[100px] h-[70px] inline-block">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
                                            </div>
                                            <div className="w-[250px]">
                                                <h3 className="text-md font-semibold text-slate-700">{item.title}</h3>
                                                <p className="text-sm text-slate-700">{item.location}</p>
                                                <h3 className="text-md text-slate-700">${item.price}</h3>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">02/09/2024</td>
                                    <td className="px-4 py-3   font-medium"><span className="bg-green-100 text-green-800 p-2 rounded-xl">Active</span></td>
                                    <td className="w-full flex justify-center items-center gap-2.5 text-2xl text-balance mt-10"><RiEdit2Line /><MdDeleteOutline /></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ManageListings;