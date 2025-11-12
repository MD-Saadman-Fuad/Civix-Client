import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">

                    <a className="btn btn-ghost text-xl">Civix</a>
                </div>
                
                <div className="navbar-end">
                    <div className=" hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/issues">Issues</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </ul>
                </div>
                    <div className="dropdown">
                        {/* use a label (focusable) as the trigger so DaisyUI's focus-within styles work */}
                        <label tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/issues">Issues</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </ul>
                    </div>
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;