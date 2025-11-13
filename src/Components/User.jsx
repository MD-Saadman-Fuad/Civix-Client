import React, { useEffect } from 'react';
import { useState } from 'react';
const User = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsers(data);
        });
    }, []);
    return (
        <div className='text-center w-1/3 bg-orange-200 p-5 rounded-lg shadow-lg'>
            <p className='font-bold text-2xl'> Total <span >Users</span> </p>
            <p className='font-bold text-4xl text-orange-500'>{users.length}</p>
        </div>
    );
};

export default User;