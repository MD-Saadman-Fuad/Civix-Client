import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './SwiperStyles.css';
import B1 from '../assets/b1.jpg';
import B2 from '../assets/b2.jpg';
import B3 from '../assets/b3.webp';
// import B4 from '../assets/b4.png';

const Carousel = () => {
    const images = [
        { src: B1, alt: 'Pet Care Service 1' },
        { src: B2, alt: 'Pet Care Service 2' },
        { src: B3, alt: 'Pet Care Service 3' },
        // { src: B4, alt: 'Pet Care Service 4' }
    ];

    return (
        <div className='max-w-4xl mx-auto' data-aos="zoom-out" data-aos-duration="1200">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                className="rounded-lg overflow-hidden shadow-lg"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-120 object-cover"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <div className="swiper-button-next">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </Swiper>


        </div>
    );
};

export default Carousel;