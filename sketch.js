let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let input, button, greeting;

var leyes0;

function draw() {

  button = createButton('start');
  button.position( 50 ,50,  65);
  button.mousePressed(start);
};

function start(){
  start = createCapture(VIDEO);
  //start.hide();
};

function setup() {
  createCanvas(640, 480);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);

}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function preload() {
  for (var  i = 0; i <1; i++) {
  leyes0 = loadImage('leyes0.png');

function draw() {

  image(video, 0, 0);

  let d = dist(noseX, noseY, eyelX, eyelY);

for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

  image('leyes0.png', noseX, noseY, d);

  }

}
  }
}
