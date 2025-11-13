import React, { useContext, useState } from 'react';
import { API_BASE } from '../lib/apiBase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const AddIssues = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Garbage');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const categories = [
        'Garbage',
        'Illegal Construction',
        'Broken Public Property',
        'Road Damage'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user?.email) {
            alert('You must be logged in to submit an issue.');
            return;
        }

        const issue = {
            title: title.trim(),
            category,
            location: location.trim(),
            description: description.trim(),
            image: image.trim() || null,
            amount: amount ? Number(amount) : 0,
            status: 'ongoing',
            date: new Date().toISOString(),
            email: user.email,
        };

        setSubmitting(true);

        fetch(`${API_BASE}/issues`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issue)
        })
            .then(res => res.json())
            .then(() => {
                // expect backend to return created document or success flag
                // alert('Issue submitted successfully.');
                // reset form or navigate

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTitle('');
                setCategory('Garbage');
                setLocation('');
                setDescription('');
                setImage('');
                setAmount('');
                navigate('/my-issues');
            })
            .catch(err => {
                console.error('Failed to submit issue:', err);
                Swal.fire('Error', 'Failed to submit issue. Please try again.', 'error');
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Report an Issue</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium mb-1">Issue Title</label>
                    <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Short descriptive title" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded px-3 py-2">
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input required value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g. Mirpur 10, Dhaka" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={5} className="w-full border rounded px-3 py-2" placeholder="Describe the issue and any important details" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input value={image} onChange={e => setImage(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Optional image URL" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Suggested Fix Budget (Amount)</label>
                        <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" className="w-full border rounded px-3 py-2" placeholder="e.g. 300" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <label className="block text-sm font-medium mb-1">Reporter's Email</label>
                        <input readOnly value={user?.email || ''} className="w-full border rounded px-3 py-2 bg-gray-50" />
                    </div>

                    <div className="text-sm text-gray-600">
                        <div>Status: <span className="font-semibold">Ongoing</span></div>
                        <div>Date: <span className="font-semibold">{new Date().toLocaleString()}</span></div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={submitting} className="bg-linear-to-r from-emerald-600 to-sky-500 hover:from-emerald-700 hover:to-sky-600 text-white px-4 py-2 rounded">
                        {submitting ? 'Submitting...' : 'Submit Issue'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddIssues;