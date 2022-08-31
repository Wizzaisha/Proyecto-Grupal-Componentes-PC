import { useSelector } from "react-redux";
import "./AdminStatistics.css";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
  } from "recharts";


function AdminStatistics () {
    
    const statisticsData = useSelector(state => state.statisticsData);

    console.log(statisticsData);
    return (
        <div>
            <div>
                <p>Daily Sales</p>
                <AreaChart 
                    width={500}
                    height={400}
                    data={statisticsData.dailyData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
        </div>
    )
}


export default AdminStatistics;