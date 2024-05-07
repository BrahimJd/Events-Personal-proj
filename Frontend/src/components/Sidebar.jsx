import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/about",
            name: "profile",
            icon: <FaUserAlt />
        },
        {
            path: "/ForgetPassward",
            name: "ForgetPassward",
            icon: <RiLockPasswordLine />
        },
        
        {
            path: "/Documentation",
            name: "Documentation",
            icon: <IoDocumentText />
        }
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                    <div style={{ marginLeft: isOpen ? "130px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;