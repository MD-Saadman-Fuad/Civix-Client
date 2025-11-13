import React from 'react';
import User from './User';
import Pending from './Pending';
import Resolved from './Resolved';
const States = () => {
    return (
        <div className='max-w-7xl mx-auto flex items-center justify-center gap-5 my-4'>
            <User className='w-1/3' />
            <Pending className='w-1/3' />
            <Resolved className='w-1/3' />
        </div>
    );
};

export default States;