import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE } from '../lib/apiBase';
const Resolved = () => {
    const [task, setTask] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE}/issues/resolved`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTask(data);
            });
    }, []);
    return (
        <div className='text-center w-1/3 bg-emerald-200 p-5 rounded-lg shadow-lg'>
            <p className='font-bold text-2xl'> Total <span >Resolved Tasks</span> </p>
            <p className='font-bold text-4xl text-emerald-500'>{task.length}</p>
        </div>
    );
};

export default Resolved;