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
    const distributedPointsRef = useRef<Point[]>([]);
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
            const bestLocation = findBestPoint(distributedPointsRef.current);
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
            const shootingStar: ShootingStar = {
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

        populateStars(48);
        populateShootingStars(2);

        const animate = () => {
            drawBackground();
            drawStars();
            drawShootingStars();
            requestAnimationFrame(animate);
        }

        animate();

        return () => shootingStarsRef.current.forEach(star => {
            clearInterval(star.intervalId);
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

// var c = canvas.getContext('2d');
// var center = {x: canvas.width / 2, y: canvas.height / 2};
//
//
// function Circle(x,y,radius,fillColor){
//   this.x = x;
//   this.y = y;
//   this.radius = radius;
//   this.fillColor = fillColor;
//  
//   c.beginPath();
//   c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//   c.fillStyle = this.fillColor;
//   c.fill();
// }
//
//
//
// function Cloud(x,y,dx,cloudWidth,cloudLength){
// 
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.cloudWidth = cloudWidth;
//   this.cloudLength = cloudLength;
//
// 
//   this.draw = function(){
//     c.save();
//     c.beginPath();
//     c.arc(center.x, center.y, 120, 0, Math.PI * 2, false);
//     c.clip();
//     c.beginPath();
//     c.moveTo(this.x, this.y);
//     c.lineCap = 'round';
//     c.lineWidth = this.cloudWidth;
//     c.lineTo(this.x + this.cloudLength,this.y);
//     c.strokeStyle = 'white';
//     c.stroke();
//     c.restore();
//   }
//   this.update = function(){
//     if(this.x < (center.x - 240)){
//       this.x = center.x+240;
//     }
//     this.x -= this.dx;
//     this.draw();
//   }
//  
// }
//
// function Land(x,y,dx,landWidth,landLength){
//  
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.landWidth = landWidth;
//   this.landLength = landLength;
//
//  
//   this.draw = function(){
//     c.save();
//     c.beginPath();
//     c.arc(center.x, center.y, 120, 0, Math.PI * 2, false);
//     c.clip();
//     c.beginPath();
//     c.moveTo(this.x, this.y);
//     c.lineCap = 'round';
//     c.lineWidth = this.landWidth;
//     c.lineTo(this.x + this.landLength,this.y);
//     c.strokeStyle = '#85cc66';
//     c.stroke();
//     c.restore();
//   }
//   this.update = function(){
//     if(this.x < (center.x-240)){
//       this.x = center.x +240;
//     }
//     this.x -= this.dx;
//     this.draw();
//   }
//  
// }
//
// function SemiCircle(x,y,radius,fillColor){
//   this.x = x;
//   this.y = y;
//   this.radius = radius;
//   this.fillColor = fillColor;
//  
//   c.beginPath();
//   c.arc(this.x, this.y, this.radius, Math.PI * 1.5, 1.5, false);
//   c.fillStyle = this.fillColor;
//   c.fill();
// }
//
//
//
//
// //Initial object arrays
// var earthWidth = 120;
// var planets = [{x: 20,y:10}];
// var clouds = [{x: 20,y:10}];
// var land = [{x: 20,y:10}];
// var stars = [{x: 10,y:10}];
//
// function drawPlanets(a){
//   for (var i = 0; i <= a; ++i) {
//     var bestLocation = sample(planets);
//     planets.push(new Circle(bestLocation[0],bestLocation[1], Math.random() * 5,'rgb(32, 66, 136)'));
//   }
// }
//
// function drawClouds(a){
//   for (var i = 0; i <= a; ++i) {
//     var bestLocation = earthMask(clouds);
//     var cloudWidth = Math.floor(Math.random() * 20) + 5;
//     var cloudLength = Math.floor(Math.random() * 30) + 18;
//     var dx = (Math.random() + 0.2 )* 1;
//     clouds.push(new Cloud(bestLocation[0],bestLocation[1],dx,cloudWidth,cloudLength));
//   }
// }
//
//
// function drawLand(a){
//   for (var i = 0; i <= a; ++i) {
//     var bestLocation = earthMask(land);
//     var landWidth = Math.floor(Math.random() * 25) + 10;;
//     var landLength = Math.floor(Math.random() * 30) + 18;
//     dx = 0.5;
//     land.push(new Land(bestLocation[0],bestLocation[1],dx,landWidth,landLength));
//   }
// }
//
// //Use best candidate algorithm to evenly distribute across the earth mask
// function earthMask(samples) {
//   var bestCandidate, bestDistance = 0;
//   //The higher the iteration the better the distribution
//   //Performance takes a hit with higher iteration
//   for (var i = 0; i < 20; ++i) {
//     var c = [Math.floor(Math.random() * ((center.x+240) - (center.x-240) + 1)) + (center.x-240), Math.floor(Math.random() * ((center.y+120) - (center.y-120) + 1)) + (center.y-120)],
//         d = distance(findClosest(samples, c), c);
//     if (d > bestDistance) {
//       bestDistance = d;
//       bestCandidate = c;
//     }
//   }
//   return bestCandidate;
// }
//
// //Generate how many elements you want
// //drawPlanets(50);
// drawStars(20);
// drawClouds(20);
// drawLand(15);
//
// // Animate canvas
// function animate(){
//   requestAnimationFrame(animate);
//  
//   c.fillStyle = 'rgba(5, 6, 12, 0.3)';
//   c.fillRect(0, 0, canvas.width, canvas.height);
//   shootingStar.update();
//   shootingStar2.update();
//  
//   for (var i = 0; i < stars.length; i++){
//     Star(stars[i].x,stars[i].y,stars[i].spikes,stars[i].innerRadius,stars[i].outerRadius);
//   }
//   for (var i = 0; i < planets.length; i++){
//     Circle(planets[i].x,planets[i].y,planets[i].radius,planets[i].fillColor);
//   }
//   var ring3 = new Circle(center.x,center.y, 245,'rgba(7, 17, 36, 0.5)');
//   var ring2 = new Circle(center.x,center.y, 215,'rgba(6, 23, 49, 0.5)');
//   var ring1 = new Circle(center.x,center.y, 175,'rgba(5, 26, 57, 0.5)');
//   var earthBorder = new Circle(center.x,center.y, 135,'rgb(28, 40, 86)');
//   var earth = new Circle(center.x,center.y, earthWidth,'rgb(25, 118, 181)');
//   for (var i = 1; i < land.length; i++){
//     land[i].update();
//   }
//   for (var i = 1; i < clouds.length; i++){
//     clouds[i].update();
//   }
//   var semi = new SemiCircle(center.x,center.y,earthWidth,'rgba(0, 0, 0, 0.4)');
// }
//
// animate();
//
