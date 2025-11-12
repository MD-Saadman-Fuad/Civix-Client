import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import logo from '../assets/user.png'
import userPNG from '../assets/user.png';

const Navbar = () => {
    const { user, signOutUser, loading } = useContext(AuthContext);
    // console.log('Current user in Navbar:', user);
    // console.log('Auth loading state:', loading); 
    const handleSignOut = () => {
        signOutUser()
            .then(() => {

            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm h-20">
                <div className="navbar-start">

                    <a className="btn btn-ghost text-xl"><img src={logo} alt="Logo" className="h-10 md:h-16  rounded-full" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500 '}`}>Home</NavLink>
                        <NavLink to="/issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Issues</NavLink>
                        {user ? (
                            <>
                                <NavLink to="/add-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Add Issues</NavLink>
                                <NavLink to="/my-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>My Issues</NavLink>
                                <NavLink to="/my-contributions" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>My Contribution</NavLink>

                            </>
                        ) : (
                            <>
                                {/* <NavLink to="/login" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Login</NavLink>
                                <NavLink to="/register" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Register</NavLink> */}
                            </>
                        )}
                    </ul>
                </div>
                <div className="navbar-end gap-3 ">

                    <div className="dropdown">
                        {/* use a label trigger so focus-within styles from DaisyUI work reliably */}
                        <label tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow gap-3">
                            <li><NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Home</NavLink></li>
                            <li><NavLink to="/issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Issues</NavLink></li>
                            {user ? (
                                <>
                                    <NavLink to="/add-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Add Issues</NavLink>
                                    <NavLink to="/my-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>My Issues</NavLink>
                                    <NavLink to="/my-contributions" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>My Contribution</NavLink>

                                </>
                            ) : (
                                <>
                                    {/* <NavLink to="/login" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Login</NavLink>
                                <NavLink to="/register" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Register</NavLink> */}
                                </>
                            )}
                        </ul>
                    </div>
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <div className="skeleton w-12 h-12 rounded-full"></div>
                            <div className="skeleton h-4 w-20"></div>
                        </div>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <NavLink onClick={handleSignOut} className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Sign Out</NavLink>

                            {/* <button  className="btn bg-orange-500 hover:bg-orange-600 text-white">Sign Out</button> */}
                            <img
                                className='w-12 h-12 rounded-full object-cover border-2 border-orange-300'
                                src={user.photoURL || userPNG}
                                alt={user.displayName || "User"}
                                onError={(e) => {
                                    console.log("Image failed to load:", user.photoURL);
                                    e.target.src = userPNG;
                                }}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <NavLink to="/login" className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-full">Login</NavLink>
                            <NavLink to="/register" className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-full">Register</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;