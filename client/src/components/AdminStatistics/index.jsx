import { useSelector } from "react-redux";
import "./AdminStatistics.css";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    ResponsiveContainer
  } from "recharts";


function AdminStatistics () {
    
    const statisticsData = useSelector(state => state.statisticsData);

    return (
        <div>
            <div className="chartContainer">
                <h4>Turnover</h4>
                <div className="chart">
                    <ResponsiveContainer>
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
                    </ResponsiveContainer>
                </div>

            </div>
            <div className="chartContainer">
                <h4>Top selling products</h4>
                <div className="chart">
                    <ResponsiveContainer>
                        <BarChart
                            width={500}
                            height={300}
                            data={statisticsData.topSelling}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="unitsSold" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}


export default AdminStatistics;