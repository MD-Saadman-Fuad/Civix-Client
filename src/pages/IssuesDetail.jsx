import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import IssuseContributions from '../Components/IssuseContributions';

const IssuesDetail = () => {
    const { _id } = useLoaderData();
    // console.log(_id);
    const { user } = use(AuthContext);
    const [issues, setIssues] = useState('');
    // const [contributions, setContributions] = useState(null);
    const contributionsRef = useRef(null);
    const [showContribModal, setShowContribModal] = useState(false);
    const [contribForm, setContribForm] = useState({ contributorName: '', amount: '', phone: '', address: '', additionalInfo: '' });

    useEffect(() => {
        fetch(`http://localhost:3000/issues/${_id}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(data1 => {
                // console.log('bids for this product', data);
                setIssues(data1);
            })
            .catch(err => {
                console.error(err);
            })



    }, [_id, user?.accessToken]);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {!issues ? (
                <div className="text-center text-gray-500 text-lg">Loading issue details...</div>
            ) : (<div>

                <article className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-500 ease-out hover:shadow-2xl">
                    <div className="md:col-span-1 flex items-center justify-center">
                        <div className="w-full h-80 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                            <img src={issues.image || 'https://via.placeholder.com/800x520?text=No+Image'} alt={issues.title} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{issues.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="text-sm md:text-base bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium shadow-sm">{issues.category}</span>
                            <span className="text-sm md:text-base bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Status: <strong className="ml-1">{issues.status || 'ongoing'}</strong></span>
                            <span className="text-sm md:text-base bg-green-50 text-green-700 px-3 py-1 rounded-full">Amount: <strong className="ml-1">৳{issues.amount ?? 0}</strong></span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-6">
                            <div><strong>Location:</strong> <span className="ml-2">{issues.location}</span></div>
                            <div><strong>Reported on:</strong> <span className="ml-2">{issues.date ? new Date(issues.date).toLocaleString() : '—'}</span></div>
                            <div><strong>Reporter's email:</strong> <span className="ml-2">{issues.email}</span></div>
                            <div><strong>Issue ID:</strong> <span className="ml-2 font-mono text-xs text-gray-500">{issues._id}</span></div>
                        </div>

                        <h2 className="text-xl font-semibold mb-3">Description</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{issues.description}</p>

                        <div className="flex items-center justify-between gap-4">
                            <div className=''>
                                <button onClick={() => window.open(issues.image || '#', '_blank')} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow mr-4">Open Image</button>

                                <button onClick={() => window.history.back()} className=" bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow">Back</button>


                            </div>

                            <div className='flex items-end justify-end'>
                                <button
                                    onClick={() => setShowContribModal(true)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow"
                                    aria-label="Pay Clean-Up Contribution"
                                >
                                    Pay Clean-Up Contribution
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
                <div>
                    {
                        <IssuseContributions issueId={issues.issueId} issue={issues} />
                    }
                </div>

                {/* Contribution modal */}
                {showContribModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                            <h3 className="text-lg font-semibold mb-3">Pay Clean-Up Contribution</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm">Issue Title</label>
                                    <input className="w-full border rounded px-2 py-1" value={issues.title || ''} readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm">Amount</label>
                                    <input type="number" className="w-full border rounded px-2 py-1" value={contribForm.amount} onChange={e => setContribForm(s => ({ ...s, amount: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm">Contributor Name</label>
                                    <input className="w-full border rounded px-2 py-1" value={contribForm.contributorName} onChange={e => setContribForm(s => ({ ...s, contributorName: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm">Email</label>
                                    <input className="w-full border rounded px-2 py-1" value={user?.email || ''} readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm">Phone number</label>
                                    <input className="w-full border rounded px-2 py-1" value={contribForm.phone} onChange={e => setContribForm(s => ({ ...s, phone: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm">Address</label>
                                    <input className="w-full border rounded px-2 py-1" value={contribForm.address} onChange={e => setContribForm(s => ({ ...s, address: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm">Additional info</label>
                                    <textarea className="w-full border rounded px-2 py-1" rows={3} value={contribForm.additionalInfo} onChange={e => setContribForm(s => ({ ...s, additionalInfo: e.target.value }))} />
                                </div>
                                <div className="text-sm text-gray-500">Date: <span className="ml-2">{new Date().toLocaleString()}</span></div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button onClick={() => setShowContribModal(false)} className="px-3 py-1 border rounded">Cancel</button>
                                <button  onClick={() => {
                                    const payload = {
                                        issueId: issues._id || issues.issueId,
                                        issueTitle: issues.title,
                                        amount: Number(contribForm.amount) || 0,
                                        contributorName: contribForm.contributorName,
                                        email: user?.email || '',
                                        phone: contribForm.phone,
                                        address: contribForm.address,
                                        date: new Date().toISOString(),
                                        additionalInfo: contribForm.additionalInfo
                                    };

                                    Swal.fire({ title: 'Submitting...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

                                    fetch('http://localhost:3000/contributions', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            authorization: `Bearer ${user?.accessToken}`
                                        },
                                        body: JSON.stringify(payload)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            Swal.close();
                                            const ok = data && (data.success || data.insertedId);
                                            if (ok) {
                                                Swal.fire('Thank you', 'Contribution recorded successfully', 'success');
                                                setShowContribModal(false);
                                                setContribForm({ contributorName: '', amount: '', phone: '', address: '', additionalInfo: '' });
                                                setTimeout(() => contributionsRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
                                            } else {
                                                Swal.fire('Error', 'Could not record contribution', 'error');
                                            }
                                        })
                                        .catch(err => {
                                            Swal.close();
                                            console.error('Contribution error', err);
                                            Swal.fire('Error', 'Submission failed', 'error');
                                        });
                                }} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow">Submit</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            )
            }
        </div>
    );
};

export default IssuesDetail;