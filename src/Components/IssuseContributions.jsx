import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { API_BASE } from '../lib/apiBase';
import userPNG from '../assets/user.png';

const IssuseContributions = ({ issue, refresh = 0 }) => {
    const { user } = useContext(AuthContext);
    const _id = issue?._id;
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (!_id) return;
        setLoading(true);
        fetch(`${API_BASE}/issues/contributions/${_id}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setContributions(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error('Failed to load contributions:', err);
                setContributions([]);
            })
            .finally(() => setLoading(false));

    }, [_id, user?.accessToken, refresh]);

    console.log('Contributions for issue', _id, contributions);

    return (
        <div className="mt-6">
            <h3 className="font-semibold mb-3">Contributors</h3>

            {loading ? (

                <p>Loading contributors...</p>
            ) : contributions.length === 0 ? (
                <p className="text-sm text-gray-500">No contributions yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Contributor</th>
                                <th className="text-right">Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions.map((c) => {
                                const imgSrc = c.contributorPhoto || c.photoURL || c.photo || c.avatar || user?.photoURL || userPNG;
                                return (
                                    <tr key={c._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={imgSrc}
                                                    alt={c.contributorName || 'Contributor'}
                                                    className="w-10 h-10 rounded-full object-cover border"
                                                    onError={(e) => { e.currentTarget.src = userPNG; }}
                                                    crossOrigin="anonymous"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div>
                                                    <div className="font-medium">{c.contributorName || c.contributorEmail || 'Anonymous'}</div>
                                                    {c.contributorEmail && <div className="text-xs text-gray-500">{c.contributorEmail}</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right font-semibold">{c.amount} BDT</td>
                                        <td>{c.date ? new Date(c.date).toLocaleDateString() : '-'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default IssuseContributions;