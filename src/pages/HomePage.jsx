import React from 'react';
import Slider from '../Components/Slider.jsx';
import CategorySection from '../Components/CategorySection.jsx';
import RecentComplaints from '../Components/RecentComplaints.jsx';
const HomePage = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <RecentComplaints></RecentComplaints>
        </div>
    );
};

export default HomePage;