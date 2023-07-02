import React, { CSSProperties, useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { findBestPoint } from '../utils/bestCandidateSampler';
import { Point } from '../utils/geometry';
import { Star, ShootingStar } from '../utils/canvasPainter.types';
import { drawStar, drawShootingStar, resetShootingStar } from '../utils/canvasPainter';



// TODO: Make amount of stars dependant on window size.
//       Add a parallax effect to background stars.
//       Polish up shooting stars (trail, where they start+end, etc.).
export const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const windowSize = useWindowSize();
    const starsRef = useRef<Star[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);

    const drawBackground = () => {
        if (!canvasRef.current || !contextRef.current) return;

        const canvas = canvasRef.current;
        const context = contextRef.current;

        context.fillStyle = '#050612';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const drawStars = () => {
        if (contextRef.current) {
            const context = contextRef.current;
            const stars = starsRef.current;
            stars.forEach(star => drawStar(context, star));
        }
    }

    const drawShootingStars = () => {
        if (contextRef.current) {
            const context = contextRef.current;
            const shootingStars = shootingStarsRef.current;
            shootingStars.forEach(star => drawShootingStar(context, star));
        }
    }

    // Populates the array references by `starsRef` with `amount` of Stars.
    // Tries to distribute close to evenly using `findBestPoint`.
    const populateStars = (amount: number) => {
        const distributedPoints: Point[] = [];

        for (let i = 0; i <= amount; i += 1) {
            if (starsRef.current.length >= i) continue; // DEV
            const bestLocation = findBestPoint(distributedPoints);
            distributedPoints.push({ x: bestLocation.x, y: bestLocation.y });

            starsRef.current.push({
                cx: bestLocation.x,
                cy: bestLocation.y,
                rotation: Math.random() * 2 * Math.PI,
                scale: Math.max(Math.random(), 0.5) / 7,
            });
        }
    }

    const populateShootingStars = (amount: number) => {
        if (!canvasRef.current || !contextRef.current) return;

        const canvas = canvasRef.current;
        const context = contextRef.current as CanvasRenderingContext2D;

        for (let i = 0; i < amount; i += 1) {
            if (shootingStarsRef.current.length >= i) continue; // DEV
            let shootingStar: ShootingStar = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * 5,
                dy: (Math.random() - 0.5) * 5,
                r: (Math.random() * 2) + 1,
                intervalId: setInterval(
                    () => resetShootingStar(context, shootingStar),
                    2500 * Math.random() + 2500,
                ),
            };
            shootingStarsRef.current.push(shootingStar);
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        contextRef.current = canvasRef.current.getContext('2d');

        populateStars(86);
        populateShootingStars(4);

        const animate = () => {
            drawBackground();
            drawStars();
            drawShootingStars();
            requestAnimationFrame(animate);
        }

        animate();

        return () => shootingStarsRef.current.forEach(star => {
            // clearInterval(star.intervalId);
        });
    }, []);

    // Update canvas size on window resize
    useEffect(() => {
        if (!canvasRef.current || !windowSize.width || !windowSize.height) return;
        canvasRef.current.width = windowSize.width;
        canvasRef.current.height = windowSize.height;
    }, [windowSize]);

    const style: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }

    return <canvas ref={canvasRef} style={style} />
}

