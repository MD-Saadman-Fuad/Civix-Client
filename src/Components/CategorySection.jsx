import React from 'react';
import { NavLink } from 'react-router-dom';
import Garbage from '../assets/garbage.jpg';
import Illegal_Construction from '../assets/Construction.jpg';
import Road_Damage from '../assets/Broken_Road.jpeg';
import Broken_Public_Property from '../assets/Broken_public_property.jpg';

const categories = [
    {
        title: 'Garbage',
        img: Garbage,
        slug: 'garbage',
        desc: 'Report overflowing bins, illegal dumping and neighborhood trash problems.'
    },
    {
        title: 'Illegal Construction',
        img: Illegal_Construction,
        slug: 'illegal-construction',
        desc: 'Flag unauthorized builds and construction that violates regulations.'
    },
    {
        title: 'Broken Public Property',
        img: Broken_Public_Property,
        slug: 'broken-public-property',
        desc: 'Parks, benches, signs or other public assets that need repair.'
    },
    {
        title: 'Road Damage',
        img: Road_Damage,
        slug: 'road-damage',
        desc: 'Potholes, cracks and other road hazards that endanger drivers and pedestrians.'
    }
];

const CategorySection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">Categories</h2>
                <p className="text-sm text-gray-500 mt-1">Quickly browse issues by category</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <NavLink
                        key={cat.slug}
                        to={`/issues?category=${encodeURIComponent(cat.slug)}`}
                        aria-label={`View ${cat.title} issues`}
                        className="group"
                    >
                        <article className="relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transform transition duration-300 will-change-transform hover:-translate-y-1 motion-reduce:transform-none">
                            <img src={cat.img} alt={cat.title} className="w-full h-40 sm:h-44 object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white text-lg font-semibold drop-shadow">{cat.title}</h3>
                                <p className="text-white text-sm mt-1 opacity-90 hidden md:block">{cat.desc}</p>
                                <div className="mt-3">
                                    <span className="inline-flex items-center gap-2 bg-white/90 text-emerald-600 font-medium px-3 py-1 rounded-full text-xs shadow-sm transition-transform transform group-hover:translate-x-1">Explore
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </span>
                                </div>
                            </div>
                        </article>
                    </NavLink>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;