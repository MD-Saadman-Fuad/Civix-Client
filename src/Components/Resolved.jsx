import React, { useEffect } from 'react';
import { useState } from 'react';
const Resolved = () => {
    const [task, setTask] = useState([]);
        useEffect(() => {
            fetch('http://localhost:3000/issues/resolved')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTask(data);
            });
        }, []);
    return (
        <div className='text-center w-1/3 bg-orange-200 p-5 rounded-lg shadow-lg'>
            <p className='font-bold text-2xl'> Total <span >Resolved Tasks</span> </p>
            <p className='font-bold text-4xl text-orange-500'>{task.length}</p>
        </div>
    );
};

export default Resolved;