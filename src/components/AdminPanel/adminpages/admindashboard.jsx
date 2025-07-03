import React, { useState } from 'react';
import AdminSidebar from '../admin.sidebar';
import '../adminpanel.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockSalesData = {
  day: {
    labels: ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
    today: [200000, 180000, 220000, 170000, 150000, 160000, 175000, 180000],
    yesterday: [190000, 170000, 210000, 160000, 140000, 150000, 165000, 170000],
  },
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    today: [1200000, 1300000, 1100000, 1400000, 1350000, 1500000, 1450000],
    yesterday: [1100000, 1200000, 1000000, 1300000, 1250000, 1400000, 1350000],
  },
  month: {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    today: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000000) + 1000000),
    yesterday: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000000) + 900000),
  },
};

function Admindashboard() {
  const [filter, setFilter] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const salesData = mockSalesData[filter];

  const data = {
    labels: salesData.labels,
    datasets: [
      {
        label: 'Today',
        data: salesData.today,
        backgroundColor: '#222',
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: 'Yesterday',
        data: salesData.yesterday,
        backgroundColor: '#ff9800',
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 11, weight: '400' },
          color: '#666',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₱${context.parsed.y.toLocaleString()}`;
          },
        },
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#222',
        borderColor: '#eee',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#aaa', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f2f2f2' },
        ticks: {
          color: '#aaa',
          font: { size: 11 },
          callback: function(value) {
            return `₱${value / 1000}K`;
          },
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
  };

  // Mock summary cards
  const totalSales = salesData.today.reduce((a, b) => a + b, 0);
  const orderCount = salesData.today.length * 1000;
  const customerCount = salesData.today.length * 2500;

  // Mock top products data
  const topProducts = [
    {
      name: 'Caramel Macchiato',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=64&h=64',
      sold: 120,
      satisfaction: 95,
    },
    {
      name: 'Classic Latte',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=facearea&w=64&h=64',
      sold: 110,
      satisfaction: 92,
    },
    {
      name: 'Iced Americano',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=64&h=64',
      sold: 98,
      satisfaction: 90,
    },
    {
      name: 'Mocha Frappe',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=64&h=64',
      sold: 85,
      satisfaction: 88,
    },
    {
      name: 'Spanish Latte',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=facearea&w=64&h=64',
      sold: 80,
      satisfaction: 87,
    },
  ];

  return (
    <div className="adminpanel-root">
      <AdminSidebar />
      <main className="adminpanel-main" style={{ background: '#fafbfc' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: 16 }}>
          <button onClick={() => setFilter('day')} className={filter === 'day' ? 'active' : ''} style={{ fontSize: 13, padding: '4px 14px', borderRadius: 6, border: '1px solid #eee', background: filter === 'day' ? '#f5f5f5' : '#fff', color: '#222' }}>Today</button>
          <button onClick={() => setFilter('week')} className={filter === 'week' ? 'active' : ''} style={{ fontSize: 13, padding: '4px 14px', borderRadius: 6, border: '1px solid #eee', background: filter === 'week' ? '#f5f5f5' : '#fff', color: '#222' }}>This Week</button>
          <button onClick={() => setFilter('month')} className={filter === 'month' ? 'active' : ''} style={{ fontSize: 13, padding: '4px 14px', borderRadius: 6, border: '1px solid #eee', background: filter === 'month' ? '#f5f5f5' : '#fff', color: '#222' }}>This Month</button>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ marginLeft: 'auto', fontSize: 13, border: '1px solid #eee', borderRadius: 6, padding: '3px 8px', background: '#fff', color: '#222' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: 18 }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: 10, boxShadow: 'none', border: '1px solid #f2f2f2', minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 400 }}>Total Sales</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#222' }}>₱{totalSales.toLocaleString()}</div>
            <div style={{ color: '#4caf50', fontSize: 11, fontWeight: 400 }}>▲ +5%</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: 10, boxShadow: 'none', border: '1px solid #f2f2f2', minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 400 }}>Order Count</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#222' }}>{orderCount.toLocaleString()}</div>
            <div style={{ color: '#4caf50', fontSize: 11, fontWeight: 400 }}>▲ +5%</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: 10, boxShadow: 'none', border: '1px solid #f2f2f2', minWidth: 0 }}>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 400 }}>Total Customer Count</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#222' }}>{customerCount.toLocaleString()}</div>
            <div style={{ color: '#4caf50', fontSize: 11, fontWeight: 400 }}>▲ +5%</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 6, padding: 12, border: '1px solid #f2f2f2', boxShadow: 'none', minHeight: 0, marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>Order / Sales</span>
            <div style={{ marginLeft: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#222' }}><span style={{ width: 10, height: 10, background: '#222', display: 'inline-block', borderRadius: 2 }}></span> Today</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#222' }}><span style={{ width: 10, height: 10, background: '#ff9800', display: 'inline-block', borderRadius: 2 }}></span> Yesterday</span>
            </div>
          </div>
          <div style={{ height: 260, width: '100%' }}>
            <Bar data={data} options={options} />
          </div>
        </div>
        {/* Top Products Today Section */}
        <div style={{ background: '#fff', borderRadius: 6, padding: 16, border: '1px solid #f2f2f2', marginTop: 24 }}>
          <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 15, marginBottom: 18, color: '#222' }}>
            Top Products Today (Best Seller)
          </div>
          <div>
            {topProducts.map((prod, idx) => (
              <div key={prod.name} style={{ display: 'flex', alignItems: 'center', marginBottom: idx !== topProducts.length - 1 ? 18 : 0, paddingBottom: 12, borderBottom: idx !== topProducts.length - 1 ? '1px solid #f4f4f4' : 'none' }}>
                <img src={prod.image} alt={prod.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', marginRight: 16, border: '1.5px solid #eee' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 14, color: '#222' }}>{prod.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Sold: <b style={{ color: '#222' }}>{prod.sold}</b></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ background: '#f5f5f5', borderRadius: 16, padding: '4px 14px', minWidth: 70, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#222', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 700 }}>{prod.satisfaction}%</span>
                    <span style={{ fontSize: 11, color: '#888', fontWeight: 400 }}>Satisfaction</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admindashboard; 