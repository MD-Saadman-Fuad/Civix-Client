import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import IssueCard from './IssueCard.jsx';


const RecentComplaints = () => {

    const [card, setCard] =useState([]);

    //     amount
    // : 
    // 300
    // category
    // : 
    // "Drainage"
    // date
    // : 
    // "2025-10-29"
    // description
    // : 
    // "Waterlogging occurs after light rain due to blocked drains."
    // email
    // : 
    // "farhana@mail.com"
    // image
    // : 
    // "https://i.ibb.co/6mVj7Dh/Clogged-Drain.jpg"
    // location
    // : 
    // "Mirpur 10, Dhaka"
    // title
    // : 
    // "Clogged drainage on Mirpur Road"
    // _id
    // : 
    // "6914534c4fefa3d1a3987a8a"

    useEffect(() => {
        fetch('http://localhost:3000/issues/recent')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched recent complaints:', data);
                setCard(data);
            })
    }, []);

    return (
        
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className=" text-center items-center justify-between mb-6">
                        <h2 className="text-2xl  sm:text-3xl font-bold text-center">Recent Complaints</h2>
                        <p className="text-sm text-gray-500">Latest reported issues in your area</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {card.map(it => (
                            <IssueCard key={it._id} it={it} />
                        ))}
                    </div>
                </section>
            );

};

export default RecentComplaints;