import React, { useState } from 'react';
import logoPNG from '../assets/civixPNG.png';
import { FaXTwitter, FaYoutube, FaSquareInstagram  } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

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
                        <a className="btn btn-ghost btn-xl rounded-full" href="#" aria-label="Twitter">
                            <FaXTwitter />
                        </a>
                        <a className="btn btn-ghost btn-xl rounded-full" href="#" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a className="btn btn-ghost btn-xl rounded-full" href="#" aria-label="Facebook">
                            <ImFacebook2 />
                        </a>
                        <a className="btn btn-ghost btn-xl rounded-full" href="#" aria-label="Instagram">
                            <FaSquareInstagram />
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
                        <button type="submit" className="btn text-white bg-linear-to-r from-emerald-600 to-sky-500 hover:from-emerald-700 hover:to-sky-600">Join</button>
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