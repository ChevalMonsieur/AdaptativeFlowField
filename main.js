let nbPoints = 2000; // amount of points
let points = []; // list of all points

let speed = 0.5; // the speed represents how fast the points will move each frame 
let size = 1; // the size represents how big the points will be (better to keep at low values)
let positionScale = 200; // the scale represents how much the noise will be zoomed
let rotationScale = 1; // how much a point can change it's direction at total (1 = 2PI)
let opacity = 20; // how visible is the point (0 = invisible, 255 = opaque)
let fadeSpeed = 0; // how fast the points will fade out (0 = no fade, 255 = instant fade)
let borderRule = "randomTeleport"; // determines what happens when a point goes off-screen (randomTeleport, linkedTeleport, none)

let mainWidth, mainHeight; // size of the canvas
let currentColor; // current color of the points

function setup() {

    // get size of div
    if (window.innerWidth > 1920) {
        mainWidth = document.getElementById("main").clientWidth;
        mainHeight = window.innerHeight - 300; // test
    } else {
        mainWidth = document.getElementById("main").clientWidth;
        mainHeight = document.getElementById("setterCanvaHeight").clientHeight + 25; // + 25 is a manual offset to make canvas slightly bigger than the sidebar
    }

    // initialize canvas
    createCanvas(mainWidth, mainHeight); // set canva size
    background(0); // set background color in A
    currentColor = color(0,255,200, opacity); // set base color in RGBA
    stroke(currentColor); // set color in RGBA
    strokeWeight(size); // set size of points

    // create all points
    for (let i = 0; i < nbPoints; i++) {
        points.push(createVector(random(mainWidth), random(mainHeight))); // add a new point with random position
    }
}

function draw() {
    if (fadeSpeed > 0) {
        background(0, fadeSpeed);
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
    if (mainWidth != document.getElementById("main").clientWidth) { // check that it is not only the height that changed (we don't care in this case)
        // get new div size
        if (window.innerWidth > 1920) {
            mainWidth = document.getElementById("main").clientWidth;
            mainHeight = innerHeight - 250; // make the canva take most screen space
        } else {
            mainWidth = document.getElementById("main").clientWidth;
            mainHeight = document.getElementById("setterCanvaHeight").clientHeight + 25; // + 25 is a manual offset to make canvas slightly bigger than the sidebar
        }
        
        // resize canvas to correct size
        resizeCanvas(mainWidth, mainHeight);

        reset();
    }
}

function reset() {
    //reset values
    stroke(currentColor);
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
    // check if enter is pressed
    if (event.keyCode === 13) {

        points = []; // destroy all points
        nbPoints = document.getElementById("nbPoints").value; // get new amount of points

        // create points at random positions
        for (let i = 0; i < nbPoints; i++) {
            points.push(createVector(random(mainWidth), random(mainHeight)));
        }

        reset();
    }
}

function inputSpeed(event) {
    if (event.keyCode === 13) { // check if enter is pressed
        speed = document.getElementById("speed").value; // change speed
        reset();
    }
}

function inputSize(event) {
    if (event.keyCode === 13) { // check if enter is pressed
        console.log("inputSize");
        size = document.getElementById("size").value; // change size
        strokeWeight(size); // set size of points
        reset();
    }
}

function inputPositionScale(event) {
    if (event.keyCode === 13) { // check if enter is pressed
        console.log("inputPositionScale");
        positionScale = document.getElementById("positionScale").value; // change positionScale
        reset();
    }
}

function inputRotationScale(event) {
    if (event.keyCode === 13) { // check if enter is pressed
        console.log("inputRotationScale");
        rotationScale = document.getElementById("rotationScale").value; // change rotationScale
        reset();
    }
}

function inputOpacity(event) {
    if (event.keyCode === 13) { // check if enter is pressed
        console.log("inputOpacity");
        opacity = Math.floor(document.getElementById("opacity").value); // change opacity (USE MATH.FLOOR BECAUSE STROKE DOESN'T ACCEPT FLOATS)
        currentColor.setAlpha(opacity); // set opacity in color
        stroke(currentColor); // set color in RGBA
        reset();
    }
}

function inputFade(event) {
    if (event.keyCode === 13) { // check if enter is pressed
        console.log("inputFade");
        fadeSpeed = Math.floor(document.getElementById("fadeSpeed").value); // change fadeSpeed (USE MATH.FLOOR BECAUSE STROKE DOESN'T ACCEPT FLOATS)
        reset();
    }
}

function applyAllInputs() {
    console.log("applyAllInputs");
    // calls all inputs with correct event.keycode
    inputNbParticle({keyCode: 13});
    inputSpeed({keyCode: 13});
    inputSize({keyCode: 13});
    inputPositionScale({keyCode: 13});
    inputRotationScale({keyCode: 13});
    inputOpacity({keyCode: 13});
    inputFade({keyCode: 13});
}