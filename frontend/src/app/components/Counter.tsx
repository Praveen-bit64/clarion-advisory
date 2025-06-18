const Counter = () => {
    return (
        <div className="w-full h-auto py-10 pb-16">
            <ul className="w-full flex justify-center items-center gap-10 flex-wrap">
                <li className="w-[20%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative overflow-hidden">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">1000+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">Listing for sale</p>
                    <img src="/apartment-1.webp" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
                <li className="w-[20%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">2400+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">Property for sold</p>
                    <img src="/villa-1.jpg" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
                <li className="w-[20%] h-[200px] border-2 border-slate-200 rounded-lg flex justify-center items-center flex-col shadow-lg relative">
                    <h2 className="text-3xl font-semibold bg-white/50 w-full flex justify-center items-center p-1">850+</h2>
                    <p className="text-md capitalize bg-white/50 w-full flex justify-center items-center p-1 font-semibold">Listing for rent</p>
                    <img src="/villa-2.png" className="w-full h-full object-cover absolute top-0 left-0 z-[-2] " alt="" />
                    <div className="w-full h-full object-cover absolute top-0 left-0 z-[-1] bg-primary/40"></div>
                </li>
            </ul>
        </div>
    );
}

export default Counter;