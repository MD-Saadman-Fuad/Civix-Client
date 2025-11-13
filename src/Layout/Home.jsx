import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import TitleUpdater from '../Components/TitleUpdater.jsx';
const Home = () => {
    return (
        <div className=' '>
            <TitleUpdater />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;