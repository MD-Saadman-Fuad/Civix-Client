import React from 'react';
import errorImage from '../assets/error404.png';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
const Error = () => {
    return (
        <div clas>
            <Navbar />
            <div className='w-full  flex justify-center items-center ' >
                <img className='rounded-3xl w-1/3 my-5' src={errorImage} alt="Error 404" />
            </div>
            <Footer />
        </div>

    );
};

export default Error;