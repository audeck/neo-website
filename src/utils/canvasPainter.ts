import { ShootingStar, Star } from "./canvasPainter.types";

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

