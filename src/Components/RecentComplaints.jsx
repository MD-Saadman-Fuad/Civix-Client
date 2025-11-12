import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


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
        // build items from the JSON shape in the commented block above without changing outer code
        (() => {
            

            return (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold">Recent Complaints</h2>
                        <p className="text-sm text-gray-500">Latest reported issues in your area</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {card.map(it => (
                            <article key={it._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition duration-300 hover:-translate-y-1">
                                <div className="relative h-40 sm:h-44">
                                    <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">{it.category}</span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-1">{it.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{it.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-gray-500">{it.location}</div>
                                        <NavLink to={`/issues/${it._id}`} className="inline-flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full shadow-sm">See Details</NavLink>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            );
        })()
    )
};

export default RecentComplaints;