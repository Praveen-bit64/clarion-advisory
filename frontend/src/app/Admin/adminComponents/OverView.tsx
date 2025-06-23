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

const OverView = () => {
    // Register necessary ChartJS components
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const dummyVisitorData = [
        { month: "Jan", visitor_count: 120 },
        { month: "Feb", visitor_count: 95 },
        { month: "Mar", visitor_count: 135 },
        { month: "Apr", visitor_count: 150 },
        { month: "May", visitor_count: 175 },
        { month: "Jun", visitor_count: 200 },
        { month: "Jul", visitor_count: 180 },
        { month: "Aug", visitor_count: 160 },
        { month: "Sep", visitor_count: 145 },
        { month: "Oct", visitor_count: 170 },
        { month: "Nov", visitor_count: 190 },
        { month: "Dec", visitor_count: 220 },
    ];
    const labels = dummyVisitorData.map(item => item.month);
    const data = dummyVisitorData.map(item => item.visitor_count);
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
            <div className="w-full flex justify-start items-center gap-4 mt-4 pr-2">
                <div className="w-full rounded-2xl flex justify-center items-center bg-slate-50 py-4 px-2 border border-slate-200">
                    <div className="w-1/2">
                        <h4 className="text-sm text-slate-500">All Properties</h4>
                        <h2 className="text-5xl text-slate-800 font-semibold font-mono">320</h2>
                    </div>
                    <span className="w-[80px] h-[80px] rounded-full bg-primary/30 justify-center items-center inline-flex"><TbHomeStar className="text-4xl" /></span>
                </div>
                <div className="w-full rounded-2xl flex justify-center items-center bg-slate-50 py-4 px-2 border border-slate-200">
                    <div className="w-1/2">
                        <h4 className="text-sm text-slate-500">Total Visitor</h4>
                        <h2 className="text-5xl text-slate-800 font-semibold font-mono">433</h2>
                    </div>
                    <span className="w-[80px] h-[80px] rounded-full bg-primary/30 justify-center items-center inline-flex"><LuChartNoAxesCombined className="text-4xl" /></span>
                </div>
                <div className="w-full rounded-2xl flex justify-center items-center bg-slate-50 py-4 px-2 border border-slate-200">
                    <div className="w-1/2">
                        <h4 className="text-sm text-slate-500">Total Favorites</h4>
                        <h2 className="text-5xl text-slate-800 font-semibold font-mono">120</h2>
                    </div>
                    <span className="w-[80px] h-[80px] rounded-full bg-primary/30 justify-center items-center inline-flex"><GrFavorite className="text-4xl" /></span>
                </div>



            </div>

            {/** Chart area */}
            <div className="w-full flex justify-start items-start py-8">
                <div className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Visitors Overview</h2>
                    <Bar data={chartData} options={options} />
                </div>
                <div className="w-[25%] bg-slate-100 flex justify-start items-start flex-col m-2 mt-0 p-2 rounded-lg">
                    <h2 className="w-full text-xl text-slate-800 text-center font-semibold">Previous Listings</h2>
                    <ul className="w-full flex justify-start items-center flex-col">
                        {propertyData.slice(0, 4).map((item, ndx) => {
                            return (
                                <li key={ndx} className="w-full rounded-lg bg-slate-50 p-3 flex justify-center items-center">
                                    <span className="w-[150px] h-[80px] rounded-md bg-white p-2 inline">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </span>
                                    <span className="w-[72%] flex justify-center items-center flex-col">
                                        <h5 className="text-md">{item.title}</h5>
                                        <h5 className="text-sm text-primary font-semibold text-start w-full">{item.saleType}</h5>
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    <button className="w-full p-2 bg-primary rounded-lg text-white">Manage Listings</button>
                </div>
            </div>

        </div>
    );
}

export default OverView;