import React, { useEffect } from 'react';
import { useState } from 'react';
const Pending = () => {
    const [task, setTask] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/issues/pending')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTask(data);
        });
    }, []);
    return (
        <div className='text-center w-1/3 bg-orange-200 p-5 rounded-lg shadow-lg'>
            <p className='font-bold text-2xl'> Total <span >Pending Tasks</span> </p>
            <p className='font-bold text-4xl text-orange-500'>{task.length}</p>
        </div>
    );
};

export default Pending;