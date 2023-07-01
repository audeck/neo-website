import { minDistance, Point } from "./geometry";

// Uses the best candidate algorithm to find a point, which when
// added to `points` makes the entire array deviate from a normal
// distribution the least.
export const findBestPoint = (points: Point[], maxWidth: number, maxHeight: number) => {
    const ITERATIONS = 20;
    let bestCandidate: Point = { x: maxWidth / 2, y: maxHeight / 2 };
    let bestDistance = 0;

    for (let i = 0; i < ITERATIONS; i += 1) {
        let randomPoint = {
            x: Math.random() * maxWidth,
            y: Math.random() * maxHeight,
        };
        let randomDistance = minDistance(points, randomPoint);

        if (randomDistance > bestDistance) {
            bestDistance = randomDistance;
            bestCandidate = randomPoint;
        }
    }

    return bestCandidate;
}

