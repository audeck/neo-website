import { Circle, Cloud, EarthFeature, Land, SemiCircle, ShootingStar, Star } from "./canvasPainter.types";

// Draws a 4-tipped `star` to the `context`.
export const drawStar = (context: CanvasRenderingContext2D, star: Star) => {
    context.save();

    // Translate to the center of the star
    context.translate(
        star.cx * context.canvas.width, 
        star.cy * context.canvas.height,
    );

    // Rotate the canvas
    context.rotate(star.rotation);

    // Scale the canvas
    context.scale(star.scale, star.scale);

    // Draw the star
    context.beginPath();
    context.moveTo(0, -25);
    context.lineTo(7, -7);
    context.lineTo(25, 0);
    context.lineTo(7, 7);
    context.lineTo(0, 25);
    context.lineTo(-7, 7);
    context.lineTo(-25, 0);
    context.lineTo(-7, -7);
    context.closePath();
    context.fillStyle = 'white';
    context.fill();

    context.restore();
}

// Updates the position of `star` and draws it to `context`.
export const drawShootingStar = (context: CanvasRenderingContext2D, star: ShootingStar) => {
    star.x += star.dx;
    star.y += star.dy;

    context.beginPath();
    context.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = '#FFFFFF'; // WHITE!!!
    context.fill();
}

// Resets `star` to a random position of the canvas given by `context`.
export const resetShootingStar = (context: CanvasRenderingContext2D, star: ShootingStar) => {
    star.x = Math.random() * context.canvas.width;
    star.y = Math.random() * context.canvas.height;
    star.dx = (Math.random() - 0.5) * 10;
    star.dy = (Math.random() - 0.5) * 10;
    star.r = (Math.random() * 2) + 1;
}

export const drawCircle = (context: CanvasRenderingContext2D, circle: Circle) => {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
    context.fillStyle = circle.color;
    context.fill();
}

export const drawSemiCircle = (context: CanvasRenderingContext2D, semiCircle: SemiCircle) => {
    context.beginPath();
    context.arc(semiCircle.x, semiCircle.y, semiCircle.r, Math.PI * 1.5, 1.5, false);
    context.fillStyle = semiCircle.color;
    context.fill();
}

const drawEarthFeature = (context: CanvasRenderingContext2D, feature: EarthFeature, featureColor: string, earthMask: Circle) => {
    const canvasWidth = context.canvas.width;
    const earthSize = earthMask.r * 2;
    const earthTop = earthMask.y - earthMask.r;
    const earthBot = earthMask.y + earthMask.r;

    if (feature.x < 0.01) {
        feature.x = 0.9;
    } else {
        feature.x -= feature.dx;
    }

    context.save();

    context.beginPath();
    context.arc(earthMask.x, earthMask.y, earthMask.r, 0, Math.PI * 2, false);
    context.clip();

    const featureY = feature.y * (earthBot - earthTop) + earthTop;

    context.beginPath();
    context.moveTo(feature.x * canvasWidth, featureY);
    context.lineCap = 'round';
    context.lineWidth = feature.width * earthSize;
    context.lineTo((feature.x * canvasWidth) + (feature.length * earthSize), featureY); //
    context.strokeStyle = featureColor;
    context.stroke();

    context.restore();
}

export const drawCloud = (context: CanvasRenderingContext2D, cloud: Cloud, earthMask: Circle) => {
    drawEarthFeature(context, cloud, cloud.color, earthMask); // 'white'
}

export const drawLand = (context: CanvasRenderingContext2D, land: Land, earthMask: Circle) => {
    drawEarthFeature(context, land, land.color, earthMask); // '#85cc66'
}

