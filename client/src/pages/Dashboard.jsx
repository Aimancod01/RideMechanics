import React from "react";
import Sidebar from "../pages/Sidebar";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Mock data for cards
  const stats = [
    { title: "Total Cars", value: 12 },
    { title: "Bookings Today", value: 5 },
    { title: "Mechanics", value: 7 },
    { title: "Tours", value: 9 },
  ];

  // Data for the graph
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Bookings",
        data: [15, 25, 35, 45, 55, 65, 75],
        borderColor: "#FF7600",
        backgroundColor: "rgba(255, 118, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-100 to-white">
      {/* Sidebar Container */}
      <div className="w-full lg:w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-12">
        {/* Welcome Header */}
        <h2 className="text-3xl lg:text-4xl font-bold text-orange-800 mb-8">Welcome to Your Dashboard</h2>
        <p className="text-gray-700 text-lg mb-6">Here you can manage your cars, view bookings, and much more! Use the sidebar to navigate to different sections.</p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-orange-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-orange-800 mb-4">Monthly Bookings Overview</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
