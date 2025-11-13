import React, { useEffect, useRef, useState } from 'react';
import './Button.css';

// A React wrapper around the existing vanilla button animation
// Usage: import Button from './Components/Button/Button.jsx' and render <Button compact />
const Button = ({ compact = false }) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const [time, setTime] = useState(() => {
        try {
            const t = localStorage.getItem('theme');
            return t === 'dark' ? 'night' : 'day';
        } catch {
            return 'day';
        }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let stars = [];

        function resizeCanvas() {
            const rect = wrapperRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }

        class Star {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 0;
                this.growth = 0.1;
                this.isIncreasing = true;
            }
            update() {
                if (this.size > 2.5) this.isIncreasing = false;
                if (this.isIncreasing) this.size += this.growth;
                else this.size -= this.growth * 0.5;
                this.draw();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.closePath();
            }
        }

        // light-weight floating circle (placeholder for cat sprite)
        class Cat {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 16;
                this.speed = 0.5;
            }
            update() {
                this.y -= this.speed;
                if (this.y < -200) {
                    this.y = Math.random() * 200 + canvas.height;
                    this.x = Math.random() * (canvas.width * 0.6);
                }
                this.draw();
            }
            draw() {
                ctx.beginPath();
                ctx.fillStyle = '#ffffff55';
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const cat = new Cat(canvas.width * 0.5, canvas.height * 0.5);

        function spawnStar() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            stars.push(new Star(x, y));
        }

        const starInterval = setInterval(spawnStar, 150);

        function flicker() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = stars.length - 1; i >= 0; i--) {
                const s = stars[i];
                s.update();
                if (!s.isIncreasing && s.size < 0.25) stars.splice(i, 1);
            }
            cat.update();
            rafRef.current = requestAnimationFrame(flicker);
        }

        resizeCanvas();
        flicker();

        function onResize() {
            resizeCanvas();
        }

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(starInterval);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        // persist theme via data-theme
        if (wrapperRef.current) wrapperRef.current.dataset.time = time;
        const mapped = time === 'night' ? 'dark' : 'light';
        try {
            localStorage.setItem('theme', mapped);
            document.documentElement.setAttribute('data-theme', mapped);
        } catch {
            /* ignore storage errors */
        }
    }, [time]);

    const containerStyle = compact
        ? { position: 'relative', width: 56, margin: 0, display: 'inline-block', verticalAlign: 'middle', height: 32 }
        : { position: 'relative', width: 320, margin: '24px auto' };

    return (
        <div style={containerStyle}>
            <button
                id="button-wrapper"
                ref={wrapperRef}
                data-time={time}
                data-compact={compact ? 'true' : 'false'}
                onClick={() => setTime(t => (t === 'day' ? 'night' : 'day'))}
                style={{ width: '100%', height: compact ? 32 : 80 }}
                aria-label="Theme toggle button"
            >
                <span id="button" />
                <canvas id="stars" ref={canvasRef} />
            </button>
        </div>
    );
};

export default Button;
