let nbPoints = 100000; // amount of points
let points = []; // list of all points

let opacity = 12; // how visible is the point (0 = invisible, 255 = opaque)
let speed = 0.5; // the speed represents how fast the points will move each frame
let positionScale = 500; // the scale represents how much the noise will be zoomed
let noiseScale = 100; // how much a point can change it's direction at total (1 = 2PI)

function setup() {

    // init canva settings
    createCanvas(window.innerWidth, window.innerHeight); // set canva size
    background(0); // set background color in A
    stroke(0,255,200,opacity); // set color in RGBA

    // create all points
    for (let i = 0; i < nbPoints; i++) {
        points.push(createVector(random(innerWidth), random(innerHeight))); // add a new point with random position
    }
}

function draw() {
    for (vector of points) {
        // set the direction of the point with semi-random noise
        let direction = 2 * noiseScale * Math.PI * noise(vector.x / positionScale, vector.y / positionScale);

        // apply the movement
        vector.x += Math.cos(direction) * speed;
        vector.y += Math.sin(direction) * speed;

        // teleport point if it goes off-screen
        if (vector.x < 0) vector.x = innerWidth;
        else if (vector.x > innerWidth) vector.x = 0;
        if (vector.y < 0) vector.y = innerHeight;
        else if (vector.y > innerHeight) vector.y = 0;

        // draw the point
        point(vector.x, vector.y)
    }
}