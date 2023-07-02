export type ShootingStar = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    r: number,
    intervalId: NodeJS.Timer, 
}

export type Star = {
    cx: number,
    cy: number,
    rotation: number,
    scale: number,
}

export type Circle = {
    x: number,
    y: number,
    r: number,
    color: string,
}

export type SemiCircle = Circle;

export type EarthFeature = {
    x: number,
    y: number,
    dx: number,
    width: number,
    length: number,
    color: string,
}

export type Cloud = EarthFeature;

export type Land = EarthFeature;

