import React from 'react';
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import './Dashboard.css';



const Dashboard = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/view");
    };
    const members = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
            email: 'john@example.com',
            role: 'Admin',
            disabled: false
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '9876543210',
            email: 'jane@example.com',
            role: 'User',
            disabled: true
        },
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
            email: 'john@example.com',
            role: 'Admin',
            disabled: false
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '9876543210',
            email: 'jane@example.com',
            role: 'User',
            disabled: true
        }
        
        
    ];
    return (
        <div className="dashboard-container">
            <h1 className='dash-title'>Dashboard</h1>
            <div>
                {members.map(member => (
                    <div key={member.id} className="member-card">
                        <div className="member-avatar">
<img
className='profileimage'
    src={`url_de_l_avatar_de_${member.firstName}`}
    alt="Avatar"
    onError={(e) => {
        e.target.src = "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
    }}
/>

                            </div>
                        <h3>{member.firstName} {member.att}{member.lastName}</h3>
                        <div className="member-details">
                            
                            <div className='detailles'>
                                <p><strong>Phone Number:</strong> {member.phoneNumber}</p>
                                <p><strong>Email:</strong> {member.email}</p>
                                <p><strong>Role:</strong> {member.role}</p>
                                <p className={`member-disabled ${member.disabled ? 'member-disabled-text' : ''}`}>
                                    {member.disabled ? 'Disabled' : 'Active'}
                                </p>
                            </div>
                        </div>
                        <div className="member-actions">
                            <button ><MdDelete className='icone iconedelete' /></button>
                            <button onClick={handleLoginClick}><IoEye className='icone iconeview' /></button>
                            <button ><FaEdit className='icone iconeedit'/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
