import React from 'react';
import { NavLink } from 'react-router-dom';


const IssueCard = ({ it }) => {
    return (
        <article key={it._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition duration-300 hover:-translate-y-1">
            <div className="relative h-40 sm:h-44">
                <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded">{it.category}</span>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{it.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{it.description}</p>
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">{it.location}</div>
                    <NavLink to={`/issues/${it._id}`} className="inline-flex items-center gap-2 text-sm bg-linear-to-r from-emerald-600 to-sky-500 hover:from-emerald-700 hover:to-sky-600 text-white px-3 py-1 rounded-full shadow-sm">See Details</NavLink>
                </div>
            </div>
        </article>
    );
};

export default IssueCard;