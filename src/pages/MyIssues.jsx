import React from 'react';
import { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';


const MyIssues = () => {
    const { user } = use(AuthContext);
    const [issues, setIssues] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/issues?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIssues(Array.isArray(data) ? data : []);
                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [user?.email, user?.accessToken]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the issue",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/issues/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        // include auth header like other requests in this file
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // Accept either a { success: true } or the native Mongo result
                        const ok = data && (data.success || data.deletedCount > 0);
                        if (ok) {
                            Swal.fire('Deleted!', 'Issue has been deleted.', 'success');
                            setIssues(issue => issue.filter(i => i._id !== _id));
                        } else {
                            Swal.fire('Error', 'Could not delete issue', 'error');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error', 'Delete failed', 'error');
                    })
            }
        });
    }

    const openEdit = (issue) => {
        setEditing({ ...issue });
    }

    const handleEditChange = (k, v) => {
        setEditing(prev => ({ ...prev, [k]: v }));
    }

    const saveEdit = async () => {
        // simple, clear update flow using async/await
        if (!editing) return;
        const id = editing._id;

        // Build the update object (only allowed fields)
        const update = {
            title: editing.title || '',
            category: editing.category || '',
            amount: Number(editing.amount) || 0,
            description: editing.description || '',
            status: editing.status || 'ongoing',
            image: editing.image || null,
        };

        try {
            // show a saving indicator
            Swal.fire({ title: 'Saving...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            const res = await fetch(`http://localhost:3000/issues/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(update),
            });

            const data = await res.json();

            Swal.close();

            // Accept either { success: true } or native Mongo update result
            const ok = data && (
                data.success || data.modifiedCount > 0 || data.matchedCount > 0 || data.upsertedCount > 0
            );

            if (ok) {
                // update local list with the new values
                setIssues(prev => prev.map(it => (it._id === id ? { ...it, ...update } : it)));
                setEditing(null);
                Swal.fire('Updated', 'Issue updated successfully', 'success');
            } else {
                Swal.fire('Error', 'Update failed', 'error');
            }
        } catch (err) {
            console.error('Update error', err);
            Swal.close();
            Swal.fire('Error', 'Update failed', 'error');
        }
    }

    return (
        <div className='max-w-7xl mx-auto my-5'>
            <h2 className="text-3xl font-bold mb-4 ml-2 my-5">My Issues <span className='text-orange-500'>{issues.length}</span></h2>
            <div className="  overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((it, idx) => (
                            <tr key={it._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                                        <img src={it.image || 'https://via.placeholder.com/120x120?text=No+Image'} alt={it.title} className="h-12 w-12 object-cover" />
                                    </div>
                                </td>
                                <td>{it.title}</td>
                                <td>{it.category}</td>
                                <td>{it.amount || 0}</td>
                                <td>{it.status}</td>
                                <td>{it.location}</td>
                                <td>{new Date(it.date).toLocaleString()}</td>
                                <td className='flex gap-2'>
                                    <button onClick={() => openEdit(it)} className="btn btn-outline">Update</button>
                                    <button onClick={() => handleDelete(it._id)} className="btn btn-outline btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit modal */}
            {editing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-6 rounded shadow max-w-lg w-full">
                        <h3 className="text-lg font-semibold mb-3">Update Issue</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm">Title</label>
                                <input className="w-full border rounded px-2 py-1" value={editing.title} onChange={e => handleEditChange('title', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm">Category</label>
                                <select className="w-full border rounded px-2 py-1" value={editing.category} onChange={e => handleEditChange('category', e.target.value)}>
                                    <option>Garbage</option>
                                    <option>Illegal Construction</option>
                                    <option>Broken Public Property</option>
                                    <option>Road Damage</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm">Amount</label>
                                <input type="number" className="w-full border rounded px-2 py-1" value={editing.amount || ''} onChange={e => handleEditChange('amount', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm">Status</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center"><input type="radio" name="status" value="ongoing" checked={editing.status === 'ongoing'} onChange={e => handleEditChange('status', e.target.value)} /> <span className="ml-2">Ongoing</span></label>
                                    <label className="inline-flex items-center"><input type="radio" name="status" value="ended" checked={editing.status === 'ended'} onChange={e => handleEditChange('status', e.target.value)} /> <span className="ml-2">Ended</span></label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm">Description</label>
                                <textarea className="w-full border rounded px-2 py-1" rows={4} value={editing.description} onChange={e => handleEditChange('description', e.target.value)} />
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4 items-center">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm">Image URL</label>
                                    <input className="w-full border rounded px-2 py-1" value={editing.image || ''} onChange={e => handleEditChange('image', e.target.value)} placeholder="Optional image URL" />
                                </div>
                                <div className="flex items-center justify-center sm:col-span-1">
                                    <div className="h-24 w-24 rounded overflow-hidden bg-gray-100 border">
                                        <img src={editing.image || 'https://via.placeholder.com/160x160?text=No+Image'} alt={editing.title || 'Preview'} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setEditing(null)} className="px-3 py-1 border rounded">Cancel</button>
                            <button onClick={saveEdit} className="px-3 py-1 bg-orange-500 hover:bg-orange-800 text-white rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyIssues;