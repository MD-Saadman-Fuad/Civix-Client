import React from 'react';
import User from './User';
import Pending from './Pending';
import Resolved from './Resolved';
const States = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-5 my-4 px-4'>
            {/* Each child receives a flexible class so they grow equally and remain responsive */}
            <User className='flex-1 min-w-[200px] h-full' />
            <Pending className='flex-1 min-w-[200px] h-full' />
            <Resolved className='flex-1 min-w-[200px] h-full' />
        </div>
    );
};

export default States;