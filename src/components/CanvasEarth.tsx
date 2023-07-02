import React, { CSSProperties, useEffect, useRef } from "react";
import { Circle, Cloud, Land } from '../utils/canvasPainter.types';
import { drawCircle, drawCloud, drawLand } from '../utils/canvasPainter';
import { Point } from '../utils/geometry';
import { findBestPoint } from "../utils/bestCandidateSampler";

export const CanvasEarth = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const cloudsRef = useRef<Cloud[]>([]);
    const landsRef = useRef<Land[]>([]);
    const earthRef = useRef<Circle | null>(null);
    const atmosphereRef = useRef<Circle | null>(null);

    const clearCanvas = () => {
        if (contextRef.current) {
            const context = contextRef.current;
            const canvas = context.canvas;
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    const drawEarth = () => {
        if (contextRef.current) {
            const context = contextRef.current;
            const canvas = context.canvas;
            const [ centerX, centerY ] = [ canvas.width / 2, canvas.height / 2 ];
            const radius = Math.min(canvas.width, canvas.height) / 2;

            // Outer circle #3
            drawCircle(context, {
                x: centerX,
                y: centerY,
                r: radius * 1,
                color: 'rgba(7, 17, 36, 0.5)',
            });

            // Outer circle #2
            drawCircle(context, {
                x: centerX,
                y: centerY,
                r: radius * 0.88,
                color: 'rgba(6, 23, 49, 0.5)',
            });

            // Outer circle #1
            drawCircle(context, {
                x: centerX,
                y: centerY,
                r: radius * 0.72,
                color: 'rgba(5, 26, 57, 0.5)',
            });

            const atmosphere: Circle = {
                x: centerX,
                y: centerY,
                r: radius * 0.56,
                color: 'rgb(28, 40, 86)',
            }
            drawCircle(context, atmosphere);
            atmosphereRef.current = atmosphere;

            const earth: Circle = {
                x: centerX,
                y: centerY,
                r: radius * 0.5,
                color: 'rgb(25, 118, 181)',
            }
            drawCircle(context, earth);
            earthRef.current = earth;
        }
    }

    const populateClouds = (amount: number) => {
        const distributedPoints: Point[] = [];

        for (let i = 0; i < amount; i += 1) {
            if (landsRef.current.length >= i) continue;  // DEV
            // TODO: Don't allow overlaps.
            const bestLocation = findBestPoint(distributedPoints);
            const cloud: Cloud = {
                x: bestLocation.x,
                y: bestLocation.y,
                dx: Math.random() * 0.0005 + 0.0005,
                width: Math.random() * 0.1 + 0.05,
                length: Math.random() * 0.25,
                color: 'white',
            }

            cloudsRef.current.push(cloud);
            distributedPoints.push(bestLocation);
        }
    }

    const drawClouds = () => {
        if (contextRef.current && atmosphereRef.current) {
            const context = contextRef.current;
            const atmosphere = atmosphereRef.current;
            cloudsRef.current.forEach(cloud => {
                drawCloud(context, cloud, atmosphere);
            });
        }
    }

    const populateLands = (amount: number) => {
        const distributedPoints: Point[] = [];

        for (let i = 0; i < amount; i += 1) {
            if (landsRef.current.length >= i) continue;  // DEV
            // TODO: Don't allow overlaps.
            const bestLocation = findBestPoint(distributedPoints);
            const land: Land = {
                x: bestLocation.x,
                y: bestLocation.y,
                dx: 0.0005,
                width: Math.random() * 0.1 + 0.05,
                length: Math.random() * 0.25,
                color: '#85cc66',
            }

            landsRef.current.push(land);
            distributedPoints.push(bestLocation);
        }
    }

    const drawLands = () => {
        if (contextRef.current && earthRef.current) {
            const context = contextRef.current;
            const earth = earthRef.current;
            landsRef.current.forEach(land => {
                drawLand(context, land, earth);
            });
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');

        // Resize according to element's dimensions (ease-ins, etc.)
        const resizeCanvas = () => {
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            console.log("Resized!");
        }

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(canvas);

        // Populate drawable objects
        populateLands(8);
        populateClouds(12);

        // Animate contents
        const animate = () => {
            clearCanvas();
            drawEarth();
            drawLands();
            drawClouds();
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            resizeObserver.unobserve(canvas);
        };
    }, []);

    const style: CSSProperties = {
        width: '500px',
        height: '500px',
    }

    return <canvas ref={canvasRef} style={style} />
}

