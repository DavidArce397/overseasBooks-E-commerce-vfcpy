import { Link } from "react-router-dom";
import React, { Component } from 'react';
import './Sidebar.css'



function Sidebar() {

    return (
        <div>
            <div className="sidebar">
                <img src="\img\logo.png" alt="logoOverseas"/>
                <ul>
                <Link to='/'><li>Analytics</li></Link>
                <Link to='/products'><li>Products</li></Link>
                <Link to='/users'><li>Users</li></Link>
                </ul>
            </div>
        </div>

    )
}

export default Sidebar;