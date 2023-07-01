export type Point = {
    x: number,
    y: number,
}

export const distance = (a: Point, b: Point) => {
    let dx = a.x - b.x;
    let dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);
}

export const minDistance = (points: Point[], b: Point) => {
    let minDistance = Number.MAX_VALUE;

    points.forEach((point) => {
        minDistance = Math.min(distance(point, b), minDistance);
    })

    return minDistance;
}

export const findClosestPoint = (points: Point[], b: Point) => {
  // var distance = null;
  // var closestPoint;
  // for (let i = 1; i < points.length; i += 1) {
  //     var dx = points[i].x - b[0];
  //     var dy = points[i].y - b[1];
  //     if (distance == null) {
  //         distance = Math.sqrt(dx * dx + dy * dy);
  //         closestPoint = points[i];
  //     } else if(distance > Math.sqrt(dx * dx + dy * dy)){
  //         distance = Math.sqrt(dx * dx + dy * dy);
  //         closestPoint = points[i];
  //     }
  // }
 
    let closestPoint: Point = points[0];
    let minDistance = distance(closestPoint, b);

    for (let point of points) {
        let newDistance = distance(point, b);

        if (newDistance < minDistance) {
            minDistance = newDistance;
            closestPoint = point;
        }
    }

    return closestPoint;
}

