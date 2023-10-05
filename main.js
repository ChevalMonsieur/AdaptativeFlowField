let nbPoints = 1000; // amount of points
let points = []; // list of all points

let speed = 1; // the speed represents how fast the points will move each frame 
let size = 1; // the size represents how big the points will be (better to keep at low values)
let positionScale = 300; // the scale represents how much the noise will be zoomed
let rotationScale = 1; // how much a point can change it's direction at total (1 = 2PI)
let fadeSpeed = 0; // how fast the points will fade out (0 = no fade, 255 = instant fade)
let opacity = 40; // how visible is the point (0 = invisible, 255 = opaque)
let borderRule = "randomTeleport"; // determines what happens when a point goes off-screen (randomTeleport, linkedTeleport, none)

let mainWidth;
let mainHeight;


function setup() {
    // get size of div
    mainWidth = document.getElementById("main").clientWidth;
    mainHeight = document.getElementById("main").clientHeight + 100;

    // initialize canvas
    createCanvas(mainWidth, mainHeight); // set canva size
    background(0); // set background color in A
    stroke(0, 255, 200, opacity); // set color in RGBA
    strokeWeight(size); // set size of points

    // create all points
    for (let i = 0; i < nbPoints; i++) {
        points.push(createVector(random(mainWidth), random(mainHeight))); // add a new point with random position
    }
}

function draw() {
    if (fadeSpeed > 0) {
        background(0, 0, 0, fadeSpeed);
    }
    for (vector of points) {
        // set the direction of the point with semi-random noise
        let direction = 2 * rotationScale * Math.PI * noise(vector.x / positionScale, vector.y / positionScale);

        // apply the movement
        vector.x += Math.cos(direction) * speed;
        vector.y += Math.sin(direction) * speed;

        // check if the point is off-screen and apply border rule
        switch (borderRule) {
            case "randomTeleport":
                if (vector.x < 0 || vector.x > mainWidth || vector.y < 0 || vector.y > mainHeight) {
                    vector.x = random(mainWidth);
                    vector.y = random(mainHeight);
                }
                break;
            case "linkedTeleport":
                if (vector.x < 0) vector.x = mainWidth;
                if (vector.x > mainWidth) vector.x = 0;
                if (vector.y < 0) vector.y = mainHeight;
                if (vector.y > mainHeight) vector.y = 0;
                break;
            case "none":
            default:
                break;
        }

        // draw the point
        point(vector.x, vector.y)
    }
}

function windowResized() {
    // get new div size
    mainWidth = document.getElementById("main").clientWidth;
    mainHeight = document.getElementById("main").clientHeight - 4;

    // resize canvas to correct size
    resizeCanvas(mainWidth, mainHeight);

    refresh();
}

function refresh() {
    //reset values
    background(0);
    totalOffset = 0;

    // replace all points to random positions
    for (vector of points) {
        vector.x = random(mainWidth);
        vector.y = random(mainHeight);
    }
}

///////////////////////////
//    Lien avec HTML     //
///////////////////////////

function inputNbParticle(event) {

    if (event.keyCode == 13) {
        points = []; // destroy all points
        nbPoints = document.getElementById("nbPoints").value; // get new amount of points

        // create points at random positions
        for (let i = 0; i < nbPoints; i++) {
            points.push(createVector(random(mainWidth), random(mainHeight)));
        }

        refresh();
    }
}

function inputSpeed(event) {

    if (event.keyCode == 13) {

    }
}