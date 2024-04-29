// import React from 'react';
import Home from './components/Home';
// import AuthContextProvider from './contexts/AuthContect'
import './App.css';
//import PrivateRoute from './auth/PrivateRoute';
//import AdminRoute from './auth/AdminRoute';
// import UserDashboard from './components/UserDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import UserProfile from './components/UserProfile';
import Signin from './components/Signin';
import Signup from './components/Signup';
//import PublicRoute from './auth/PublicRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';
import Read from './components/Read';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    // <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} /> 
        <Route path="/user/profile" element={<UserProfile />} />     */}
        <Route path='/create' element={<Create />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/read/:id' element={<Read />} />
      </Routes>
    </BrowserRouter>
    // </AuthContextProvider>

  );
}

export default App;

