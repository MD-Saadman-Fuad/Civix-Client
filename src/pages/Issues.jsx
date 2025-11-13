import React, { useEffect, useState } from 'react';
import { API_BASE } from '../lib/apiBase';
import { NavLink } from 'react-router-dom';
import IssueCard from '../Components/IssueCard.jsx';

const RecentComplaints = () => {

    const [card, setCard] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

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
        fetch(`${API_BASE}/issues`)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched recent complaints:', data);
                setCard(data);
            })
    }, []);

    //search
    const categories = Array.from(new Set(card.map(c => c.category).filter(Boolean)));
    const statuses = Array.from(new Set(card.map(c => c.status).filter(Boolean)));

    const filtered = card.filter(item => {
        if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
        if (statusFilter !== 'All' && (item.status || 'ongoing') !== statusFilter) return false;
        return true;
    });

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">All Issues</h2>
                <p className="text-sm text-gray-500">All reported issues in your area</p>
            </div>

            <div className="flex gap-3 items-center mb-6">
                <label className="text-sm">Category:</label>
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="select select-sm select-bordered">
                    <option>All</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <label className="text-sm">Status:</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="select select-sm select-bordered">
                    <option>All</option>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <button onClick={() => { setCategoryFilter('All'); setStatusFilter('All'); }} className="btn btn-sm ml-auto">Reset</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(it => (
                    <IssueCard key={it._id} it={it} />
                ))}
            </div>
        </section>
    );
};

export default RecentComplaints;