import React, { useState } from 'react';
import logoPNG from '../assets/civixPNG.png';

const Footer = () => {
    const [email, setEmail] = useState('')

    const handleSubscribe = (e) => {
        e.preventDefault()
        // lightweight UX: show an alert / console (backend integration optional)
        if (!email) return
        console.log('Subscribe request for', email)
        setEmail('')
        alert('Thanks for subscribing!')
    }

    return (
        <footer className="bg-gray-200 text-base-content py-12 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <img src={logoPNG} alt="CIVIX" className="w-30 h-30 rounded-full object-cover" />

                    </div>
                    <div>
                        <h4 className="text-lg font-semibold">CIVIX</h4>
                        <p className="text-sm text-muted-foreground">Community-driven clean-up & civic reporting</p>
                    </div>
                    <p className="text-sm text-muted-foreground">We help citizens report local issues and contribute to cleaner neighborhoods. Join us to make a visible difference.</p>
                    <div className="flex gap-3">
                        <a className="btn btn-ghost btn-sm rounded-full" href="#" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                        <a className="btn btn-ghost btn-sm rounded-full" href="#" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                        </a>
                        <a className="btn btn-ghost btn-sm rounded-full" href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="font-semibold">Quick Links</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>
                            <a href="/issues" className="hover:underline inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 14s1-4 6-4 6 4 6 4v2H2v-2z" /></svg>
                                View Issues
                            </a>
                        </li>
                        <li>
                            <a href="/add-issues" className="hover:underline inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" /></svg>
                                Report an Issue
                            </a>
                        </li>
                        <li>
                            <a href="/my-issues" className="hover:underline inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm2 3v2h8V6H6z" /></svg>
                                My Issues
                            </a>
                        </li>
                        <li>
                            <a href="/my-contributions" className="hover:underline inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h3v6H3a1 1 0 01-1-1v-4zM9 4h4a3 3 0 013 3v7a1 1 0 01-1 1h-6V4z" /></svg>
                                My Contributions
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="font-semibold">Stay in touch</h5>
                    <p className="text-sm text-muted-foreground">Subscribe to get occasional updates and clean-up drives near you.</p>
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                        <label htmlFor="footer-news" className="sr-only">Email</label>
                        <input id="footer-news" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@domain.com" className="input input-bordered w-full" />
                        <button type="submit" className="btn text-white bg-orange-500 hover:bg-orange-700">Join</button>
                    </form>
                </div>
            </div>

            <div className="border-t border-base-300 mt-8 pt-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-2 md:px-0">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CIVIX. All rights reserved.</p>
                    <p className="text-sm text-muted-foreground">Built for community — Clean streets, stronger neighborhoods.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;