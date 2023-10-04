let points = [], nbPoints = 100000, opacity = 10, speed = 0.5, positionScale = 300, noiseScale = 1;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    stroke(0,255,200,opacity);
    for (let i = 0; i < nbPoints; i++) points.push(createVector(random(innerWidth), random(innerHeight)));
}

function draw() {
    for (vector of points) {
        let direction = 2 * noiseScale * Math.PI * noise(vector.x / positionScale, vector.y / positionScale);
        vector.x += Math.cos(direction) * speed, vector.y += Math.sin(direction) * speed;
        if (vector.x < 0) vector.x = innerWidth;
        else if (vector.x > innerWidth) vector.x = 0;
        if (vector.y < 0) vector.y = innerHeight;
        else if (vector.y > innerHeight) vector.y = 0;
        point(vector.x, vector.y)
    }
}