import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE } from '../lib/apiBase';
const User = ({ className = '' }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE}/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            });
    }, []);
    return (
        <div className={`${className} text-center bg-emerald-200 p-5 rounded-lg shadow-lg flex flex-col justify-between`}>
            <p className='font-bold text-2xl'> Total <span >Users</span> </p>
            <p className='font-bold text-4xl text-emerald-500'>{users.length}</p>
        </div>
    );
};

export default User;