import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
// import { useEffect } from 'react';

const IssuseContributions = ({ issue }) => {
    const { user } = use(AuthContext);
    const { _id } = issue;
    const [contributions, setContributions] = useState(null);
    // console.log(issue);
    useEffect(() => {
        fetch(`http://localhost:3000/contributions/${_id}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log('bids for this product', data);
                setContributions(data);
            })
            .catch(err => {
                console.error(err);
            })



    }, [_id, user?.accessToken]);
    return (
        <div>
            {
                console.log(contributions)
            }
        </div>
    );
};

export default IssuseContributions;