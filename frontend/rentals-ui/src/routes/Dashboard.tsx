import React from 'react';
import DashboarMain from '../components/dashboard-main/DashboarMain';
import { Routes, Route } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Routes>
        <Route index element={<DashboarMain />} />
        {/* Add more nested routes here if needed */}
      </Routes>
    </div>
  );
}

export default Dashboard;
