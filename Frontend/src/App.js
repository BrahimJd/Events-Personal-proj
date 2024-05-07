import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import ForgetPassward from './pages/ForgetPassward.jsx';
import Documentation from './pages/Documentation.jsx';
import Profile from './pages/Profile.jsx';
import View from './pages/View.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<Profile/>} />
          <Route path="/ForgetPassward" element={<ForgetPassward />} />
          <Route path="/Documentation" element={<Documentation />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;