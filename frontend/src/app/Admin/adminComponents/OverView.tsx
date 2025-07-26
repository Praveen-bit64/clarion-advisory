'use client'
import { GrFavorite } from "react-icons/gr";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { TbHomeStar } from "react-icons/tb";
import propertyData from '@/app/data/propertyData.json'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import { useEffect, useState } from "react";
import { useListedProperties } from "@/app/context/ListedProperties";

const OverView = (props: { getViewCallback: (value: string) => void }) => {
    const { getViewCallback } = props
    const { properties } = useListedProperties()
    console.log(properties, "properties");

    const [dashboardData, setDashboardData] = useState({
        monthlyVisitors: [],
        totalVisitors: 0,
        totalProperties: 0,
        totalEnquiries: 0
    });
    console.log(dashboardData, "dashboardData");

    useEffect(() => {
        fetch('/api/dashboard-summary')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDashboardData(data);
                }
            });
    }, []);

    // Register necessary ChartJS components
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const month = [
        { month: "Jan" },
        { month: "Feb" },
        { month: "Mar" },
        { month: "Apr" },
        { month: "May" },
        { month: "Jun" },
        { month: "Jul" },
        { month: "Aug" },
        { month: "Sep" },
        { month: "Oct" },
        { month: "Nov" },
        { month: "Dec" },
    ];
    const labels = month.map(item => item.month);
    const data = dashboardData?.monthlyVisitors?.map(item => item);
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Monthly Visitors',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ],
    };


    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Now it's valid
            },
            title: {
                display: true,
                text: 'Monthly Visitor Count',
            },
        },
    };

    return (
        <div className="w-full">
            {/**Counter Area */}
            <div className="w-full flex justify-start items-center gap-4 mt-4 pr-2 overflow-x-auto ">
                <div className="w-full rounded-2xl flex justify-center items-center bg-slate-50 py-4 px-2 border border-slate-200">
                    <div className="w-1/2">
                        <h4 className="lg:text-sm text-xs text-slate-500">All Properties</h4>
                        <h2 className="lg:text-5xl text-2xl text-slate-800 font-semibold font-mono">{dashboardData?.totalProperties}</h2>
                    </div>
                    <span className="lg:w-[80px] lg:h-[80px] w-[40px] h-[40px] rounded-full bg-primary/30 justify-center items-center inline-flex"><TbHomeStar className="lg:text-4xl text-2xl" /></span>
                </div>
                <div className="w-full rounded-2xl flex justify-center items-center bg-slate-50 py-4 px-2 border border-slate-200">
                    <div className="w-1/2">
                        <h4 className="lg:text-sm text-xs text-slate-500">Total Visitor</h4>
                        <h2 className="lg:text-5xl text-2xl text-slate-800 font-semibold font-mono">{dashboardData.totalVisitors}</h2>
                    </div>
                    <span className="lg:w-[80px] lg:h-[80px] w-[40px] h-[40px] rounded-full bg-primary/30 justify-center items-center inline-flex"><LuChartNoAxesCombined className="lg:text-4xl text-2xl" /></span>
                </div>
                <div className="w-full rounded-2xl flex justify-center items-center bg-slate-50 py-4 px-2 border border-slate-200">
                    <div className="w-1/2">
                        <h4 className="lg:text-sm text-xs text-slate-500">Total Enquiries</h4>
                        <h2 className="lg:text-5xl text-2xl text-slate-800 font-semibold font-mono">{dashboardData.totalEnquiries}</h2>
                    </div>
                    <span className="lg:w-[80px] lg:h-[80px] w-[40px] h-[40px] rounded-full bg-primary/30 justify-center items-center inline-flex"><MdOutlineAddToHomeScreen className="lg:text-4xl text-2xl" /></span>
                </div>



            </div>

            {/** Chart area */}
            <div className="w-full flex justify-start items-start py-8 overflow-x-auto lg:flex-row flex-col">
                <div className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Visitors Overview</h2>
                    <Bar data={chartData} options={options} />
                </div>
                <div className="lg:w-[25%] w-full lg:gap-0 gap-1.5 bg-slate-100 flex justify-start items-start flex-col m-2 mt-0 p-2 rounded-lg">
                    <h2 className="w-full text-xl text-slate-800 text-center font-semibold">Previous Listings</h2>
                    <ul className="w-full flex justify-start items-center flex-col">
                        {[...properties].reverse().slice(0, 4)?.map((item, ndx) => (
                            <li key={ndx} className="w-full rounded-lg bg-slate-50 p-3 flex justify-center items-center">
                                <span className="w-[150px] h-[80px] rounded-md bg-white p-2 inline">
                                    <img
                                        src={`${item.thumbnailImage}`}
                                        alt={item?.altTag || item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </span>
                                <span className="w-[72%] flex justify-center items-center flex-col">
                                    <h5 className="text-md">{item.title}</h5>
                                    <h5 className="text-sm text-primary font-semibold text-start w-full">{item.propertyType}</h5>
                                </span>
                            </li>
                        ))}

                    </ul>
                    <button onClick={() => getViewCallback('managelistings')} className="w-full p-2 bg-primary rounded-lg text-white">Manage Listings</button>
                </div>
            </div>

        </div>
    );
}

export default OverView;