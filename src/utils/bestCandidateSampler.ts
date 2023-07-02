import { minDistance, Point } from "./geometry";

// Uses the best candidate algorithm to find a point, which when
// added to `points` makes the entire array deviate from a normal
// distribution the least.
export const findBestPoint = (points: Point[]) => {
    const ITERATIONS = 20;
    let bestCandidate: Point = { x: Math.random(), y: Math.random() };
    let bestDistance = 0;

    if (points.length == 0) return bestCandidate;

    for (let i = 0; i < ITERATIONS; i += 1) {
        let randomPoint = {
            x: Math.random(),
            y: Math.random(),
        };
        let randomDistance = minDistance(points, randomPoint);

        if (randomDistance > bestDistance) {
            bestDistance = randomDistance;
            bestCandidate = randomPoint;
        }
    }

    return bestCandidate;
}

