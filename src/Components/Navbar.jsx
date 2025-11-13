import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import logo from '../assets/civixPNG.png'
import userPNG from '../assets/user.png';
import Button from './Button/Button.jsx';

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
            <div className="navbar bg-base-100 shadow-sm h-20 p-2">
                <div className="navbar-start">

                    <img src={logo} alt="Logo" className="w-30 h-30  rounded-full" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600 '}`}>
                            <span className="inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 1.5a1 1 0 0 0-1.414 0L2 8.793V18a1 1 0 0 0 1 1h5v-5h4v5h5a1 1 0 0 0 1-1V8.793L10.707 1.5z" /></svg>
                                <span>Home</span>
                            </span>
                        </NavLink>
                        <NavLink to="/issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                            <span className="inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.257 3.099c.366-1.018 1.82-1.018 2.186 0l1.2 3.337a1 1 0 00.95.69h3.507c1.07 0 1.52 1.372.66 1.988l-2.84 2.066a1 1 0 00-.364 1.118l1.2 3.337c.366 1.018-.91 1.86-1.788 1.222L10 15.347l-2.968 2.51c-.878.638-2.154-.204-1.788-1.222l1.2-3.337a1 1 0 00-.364-1.118L2.24 8.114C1.38 7.498 1.83 6.126 2.9 6.126h3.507a1 1 0 00.95-.69l1.2-3.337z" /></svg>
                                <span>Issues</span>
                            </span>
                        </NavLink>
                        {user ? (
                            <>
                                <NavLink to="/add-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" /></svg>
                                        <span>Add Issue</span>
                                    </span>
                                </NavLink>
                                <NavLink to="/my-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V6.414A2 2 0 0014.586 5L11 1.414A2 2 0 009.586 1H6z" /></svg>
                                        <span>My Issues</span>
                                    </span>
                                </NavLink>
                                <NavLink to="/my-contributions" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 8a5 5 0 0110 0v1h1a2 2 0 012 2v3H1v-3a2 2 0 012-2h1V8z" /></svg>
                                        <span>Contribute</span>
                                    </span>
                                </NavLink>

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

                    {/* Theme toggle (animated) */}
                    <div className="flex items-center mr-2">
                        <Button compact />
                    </div>

                    <div className="dropdown">
                        {/* use a label trigger so focus-within styles from DaisyUI work reliably */}
                        <label tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow gap-3">
                            <li>
                                <NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 1.5a1 1 0 0 0-1.414 0L2 8.793V18a1 1 0 0 0 1 1h5v-5h4v5h5a1 1 0 0 0 1-1V8.793L10.707 1.5z" /></svg>
                                        <span>Home</span>
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.257 3.099c.366-1.018 1.82-1.018 2.186 0l1.2 3.337a1 1 0 00.95.69h3.507c1.07 0 1.52 1.372.66 1.988l-2.84 2.066a1 1 0 00-.364 1.118l1.2 3.337c.366 1.018-.91 1.86-1.788 1.222L10 15.347l-2.968 2.51c-.878.638-2.154-.204-1.788-1.222l1.2-3.337a1 1 0 00-.364-1.118L2.24 8.114C1.38 7.498 1.83 6.126 2.9 6.126h3.507a1 1 0 00.95-.69l1.2-3.337z" /></svg>
                                        <span>Issues</span>
                                    </span>
                                </NavLink>
                            </li>
                            {user ? (
                                <>
                                    <li>
                                        <NavLink to="/add-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                            <span className="inline-flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" /></svg>
                                                <span>Add Issue</span>
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-issues" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                            <span className="inline-flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V6.414A2 2 0 0014.586 5L11 1.414A2 2 0 009.586 1H6z" /></svg>
                                                <span>My Issues</span>
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-contributions" className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                            <span className="inline-flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 8a5 5 0 0110 0v1h1a2 2 0 012 2v3H1v-3a2 2 0 012-2h1V8z" /></svg>
                                                <span>Contribute</span>
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={handleSignOut} className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                            <span className="inline-flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 10a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z" /></svg>
                                                <span>Sign Out</span>
                                            </span>
                                        </NavLink>
                                    </li>

                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" className={({ isActive }) => `rounded-full flex md:hidden px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>Login</NavLink>
                                    <NavLink to="/register" className={({ isActive }) => `rounded-full flex md:hidden px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>Register</NavLink>
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
                            <div className='hidden lg:flex'>
                                <NavLink onClick={handleSignOut} className={({ isActive }) => `rounded-full px-4 py-2 shadow font-semibold transition-colors duration-200 ${isActive ? 'bg-linear-to-r from-emerald-600 to-sky-500 text-white' : 'bg-base-100 text-emerald-600 border border-emerald-600'}`}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h9a1 1 0 011 1v18h-2v-7H6v7H4V3a1 1 0 011-1zm8 10a1 1 0 100-2 1 1 0 000 2z" /></svg>
                                        <span>Sign Out</span>
                                    </span>
                                </NavLink>
                            </div>


                            {/* <button  className="btn bg-orange-500 hover:bg-orange-600 text-white">Sign Out</button> */}
                            <img
                                className='w-15 h-15 rounded-full object-cover border-2 border-emerald-300'
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
                            <NavLink to="/login" className="hidden sm:flex  items-center gap-2 rounded-full text-white px-4 py-2 shadow font-semibold bg-linear-to-r from-emerald-600 to-sky-500 hover:from-emerald-700 hover:to-sky-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v3H4v4h6v3zM20 3h-8v2h8v14h-8v2h8a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
                                <span>Login</span>
                            </NavLink>
                            <NavLink to="/register" className="hidden sm:flex  items-center gap-2 rounded-full text-white px-4 py-2 shadow font-semibold bg-linear-to-r from-emerald-600 to-sky-500 hover:from-emerald-700 hover:to-sky-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5zm13-9h-2v2h-2v-2h-2v-2h2V8h2v2h2v2z" /></svg>
                                <span>Register</span>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;