import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from 'lucide-react';
import { PulseLoader } from 'react-spinners';
const Reports = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [dailyResponse, monthlyResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/reports/daily'),
          axios.get('http://localhost:5000/api/reports/monthly')
        ]);

        setDailyReport(dailyResponse.data);
        setMonthlyReport(monthlyResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('Error fetching reports');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#F97316" size={15} />
    </div>
  ); if (error) return <p>{error}</p>;
  return (<div className="max-w-7xl mx-auto p-4">
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="flex items-center mb-6">
        <BarChart size={32} className="text-orange-700 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-orange-700">Booking Reports</h1>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-orange-700  mb-2">Daily Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Bookings</th>
                <th className="px-4 py-2 text-left">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dailyReport.map((report) => (
                <tr key={`${report._id.year}-${report._id.month}-${report._id.day}`} className="transition-all duration-300 ease-in-out hover:bg-orange-100">
                  <td className="border px-4 py-2">{`${report._id.year}-${report._id.month}-${report._id.day}`}</td>
                  <td className="border px-4 py-2">{report.bookings}</td>
                  <td className="border px-4 py-2">Rs {report.totalRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-semibold text-orange-700 mb-4 mt-8">Monthly Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Bookings</th>
                <th className="px-4 py-2 text-left">Total Revenue</th>
              </tr>
            </thead>
            <tbody> {monthlyReport.map((report) => (
              <tr key={`${report._id.year}-${report._id.month}`} className="transition-all duration-300 ease-in-out hover:bg-orange-100">
                <td className="border px-4 py-2">{`${report._id.year}-${report._id.month}`}</td>
                <td className="border px-4 py-2">{report.bookings}</td>
                <td className="border px-4 py-2">Rs {report.totalRevenue.toFixed(2)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Reports;