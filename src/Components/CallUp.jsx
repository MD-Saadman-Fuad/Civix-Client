import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CallUp = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleJoin = (e) => {
        e?.preventDefault();
        if (email && !isValidEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (email) {
                toast.success(`Thanks! We'll contact you at ${email}`);
                setEmail('');
            } else {
                toast.success('Thanks for joining the Clean Drive! We will contact you with next steps.');
            }
        }, 700);
    };

    return (
        <section className="relative overflow-hidden bg-linear-to-r from-emerald-50 to-white/70 py-16 px-6">
            <svg className="pointer-events-none absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-30 w-72 h-72 md:w-96 md:h-96" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="g1" x1="0%" x2="100%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                </defs>
                <path fill="url(#g1)" d="M41.1,-60.9C52.6,-50.7,60.7,-39.2,65,-27.2C69.3,-15.2,69.9,-2.7,67.4,9.2C65,21.1,59.6,32.5,50.8,42.6C42,52.6,30,61.2,16.5,67.9C3,74.6,-11.1,79.5,-24.5,76.2C-37.9,73,-50.6,61.6,-61.5,49.1C-72.4,36.6,-81.5,23.2,-84.3,8.8C-87.1,-5.6,-83.6,-21.1,-74.1,-31.7C-64.6,-42.3,-49.9,-48.1,-36.1,-54.1C-22.2,-60.1,-11.1,-66.4,1.8,-69.2C14.6,-72,29.2,-71.1,41.1,-60.9Z" transform="translate(100 100)" />
            </svg>

            <div className="relative max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-6 md:p-8 bg-white/80 backdrop-blur rounded-2xl shadow-2xl">
                        <h3 className="text-3xl md:text-4xl font-extrabold text-emerald-700">Join Our Clean Drive</h3>
                        <p className="mt-3 text-sm text-neutral-600">Volunteer a few hours to help clean and beautify our community. We provide all supplies and training — just bring your energy.</p>

                        <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-700">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">Community Events</span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800">Free Supplies</span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">Certificates</span>
                        </div>
                    </div>

                    <form onSubmit={handleJoin} className="p-6 md:p-8 bg-linear-to-b from-white to-white/90 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex flex-col gap-4">
                            <label className="text-xs text-neutral-600">Get event invites & updates</label>
                            <div className="flex gap-3">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Your email (optional)"
                                    className="input input-bordered w-full"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 btn bg-linear-to-r from-emerald-600 to-sky-500 hover:from-emerald-700 hover:to-sky-600 text-white px-4 py-2 rounded-lg shadow-md transform transition-transform hover:-translate-y-0.5"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-5-9-5-9 5 9 5z" />
                                    </svg>
                                    {loading ? 'Joining...' : 'Join'}
                                </button>
                            </div>

                            <p className="text-xs text-neutral-500">No obligation — you can join any single event that fits your schedule.</p>
                        </div>
                    </form>
                </div>
            </div>

            <Toaster position="top-right" />
        </section>
    );
};

export default CallUp;