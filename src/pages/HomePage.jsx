import React from 'react';
import Slider from '../Components/Slider.jsx';
import CategorySection from '../Components/CategorySection.jsx';
import RecentComplaints from '../Components/RecentComplaints.jsx';
import States from '../Components/States.jsx';
import CallUp from '../Components/CallUp.jsx';
const HomePage = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <RecentComplaints></RecentComplaints>
            <States></States>
            <CallUp></CallUp>
        </div>
    );
};

export default HomePage;