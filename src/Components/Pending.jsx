import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE } from '../lib/apiBase';
const Pending = ({ className = '' }) => {
    const [task, setTask] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE}/issues/pending`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTask(data);
            });
    }, []);
    return (
        <div className={`${className} text-center bg-emerald-200 p-5 rounded-lg shadow-lg flex flex-col justify-between`}>
            <p className='font-bold text-2xl'> Total <span >Pending Tasks</span> </p>
            <p className='font-bold text-4xl text-emerald-500'>{task.length}</p>
        </div>
    );
};

export default Pending;