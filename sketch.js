// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
var mouths = [];
var reyes = [];
var leyes = [];
var noses = [];
var faces = [];
var rears = [];
var lears = [];
var click1;

let x = 0;
let y = 0;

let img;
function preload() {
  for (var  i = 0; i <2; i++) {
  mouths[i] = loadImage('mouths/m' + i + '.png');
  reyes[i] = loadImage('reyes/r' + i + '.png');
  leyes[i] = loadImage('leyes/l' + i + '.png');
  noses[i] = loadImage('noses/n' + i + '.png');
  faces[i] = loadImage('faces/h' + i + '.png');
  rears[i] = loadImage('rears/re' + i + '.png');
  lears[i] = loadImage('lears/le' + i + '.png');


  }
}

function setup() {
  createCanvas(640, 480);
  //§createCanvas(windowWidth, windowHeight);
  //video.size(width, height);
  video = createCapture(VIDEO);
  r = floor(random(0,3));

  //video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
   x = width/2
  //y = height/2

  click1 = new Clickable();
  click1.cornerRadius = 0;
  click1.locate(60, 60);
  click1.resize(80, 80);
  click1.onOutside = function(){
	  this.color = "#FFFFFF";
    this.text = "바꾸기";
  }
  click1.onHover = function(){
	  this.color = "#AA33AA";
  }
  click1.onPress = function(){
    r = floor(random(0,3));
    random(loadImage);
  }

}
function gotPoses(poses) {
  if (poses.length > 0) {
  let fX = poses[0].pose.keypoints[0].position.x
  let fY = poses[0].pose.keypoints[0].position.y
  let hX = poses[0].pose.keypoints[0].position.x
  let hY = poses[0].pose.keypoints[0].position.y
  let nX = poses[0].pose.keypoints[0].position.x
  let nY = poses[0].pose.keypoints[0].position.y
  let elX = poses[0].pose.keypoints[1].position.x
  let elY = poses[0].pose.keypoints[1].position.y
  let erX = poses[0].pose.keypoints[2].position.x
  let erY = poses[0].pose.keypoints[2].position.y
  let mX = poses[0].pose.keypoints[0].position.x
  let mY = poses[0].pose.keypoints[0].position.y
  let reX = poses[0].pose.keypoints[4].position.x
  let reY = poses[0].pose.keypoints[4].position.y
  //let rwX = poses[0].pose.keypoints[10].position.x
  //let rwY = poses[0].pose.keypoints[10].position.y
  let leX = poses[0].pose.keypoints[3].position.x
  let leY = poses[0].pose.keypoints[3].position.y
  pose.nose.x = lerp(pose.nose.x, nX, 0.5);
  pose.nose.y = lerp(pose.nose.y, nY, 0.5);
  pose.nose.x = lerp(pose.nose.x, fX, 0.5);
  pose.nose.y = lerp(pose.nose.y, fY, 0.5);
  pose.nose.x = lerp(pose.nose.x, hX, 0.5);
  pose.nose.y = lerp(pose.nose.y, hY, 0.5);
  pose.rightEye.x = lerp(pose.rightEye.x, reX, 0.5);
  pose.rightEye.y = lerp(pose.rightEye.y, reY, 0.5);
  pose.leftEye.x = lerp(pose.leftEye.x, reX, 0.5);
  pose.leftEye.y = lerp(pose.leftEye.y, reY, 0.5);
  pose.nose.x = lerp(pose.nose.x, mX, 0.5);
  pose.nose.y = lerp(pose.nose.y, mY, 0.5);
  //pose.nose.x = lerp(pose.nose.x, mX, 0.5);
  //pose.nose.y = lerp(pose.nose.y, mY, 0.5);
  pose.leftEar.x = lerp(pose.leftEar.x, leX, 0.5);
  pose.leftEar.y = lerp(pose.leftEar.y, leY, 0.5);
  pose.rightEar.x = lerp(pose.rightEar.x, reX, 0.5);
  pose.rightEar.y = lerp(pose.rightEar.y, reY, 0.5);
  //pose.rightWrist.x = lerp(pose.rightWrist.x, rwX, 0.5);
  //pose.rightWrist.y = lerp(pose.rightWrist.y, rwY, 0.5);


  }
}

function modelReady() {
  select('#status').html('Model Loaded');

}

function draw() {
  imageMode(CORNER);
  image(video, 0, 0);

  click1.draw();




  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

  let d = dist(pose.nose.x, pose.nose.y, pose.rightEye.x, pose.rightEye.y);

    imageMode(CENTER);
    image(faces[r], pose.nose.x, pose.nose.y - 120, d * 4, d * 3);
    //image(faces[r], pose.nose.x, pose.nose.y, d * 3.5, d * 4);
    //image(face, pose.nose.x, pose.nose.y, d * 3.5, d * 4);
    //image(rear, pose.rightEar.x - 10, pose.rightEar.y, d * 1.25, d * 1.25);
    image(rears[r], pose.rightEar.x - 10, pose.rightEar.y, d * 1.25, d * 1.25);
    //image(lears[r], pose.leftEar.x + 5, pose.leftEar.y - 10, d * 1.25, d * 1.25);
		image(lears[r], pose.leftEar.x + 5, pose.leftEar.y - 10, d * 1.25, d * 1.25);
    //image(nose, pose.nose.x, pose.nose.y - 15, d * 1.5, d * 1.5);
    image(noses[r], pose.nose.x, pose.nose.y - 15, d * 1.5, d * 1.5);
    image(reyes[r], pose.rightEye.x, pose.rightEye.y, d * 1.75, d * 1.75);
    image(leyes[r], pose.leftEye.x, pose.leftEye.y, d * 1.5, d * 1.5);
    //image(mouth, pose.nose.x, pose.nose.y + 50, d * 1.25, d * 1.25);
    image(mouths[r], pose.nose.x, pose.nose.y + 50, d * 1.25, d * 1.25);
    //image(rwrist, pose.rightWrist.x, pose.rightWrist.y - 150, d * 4, d * 6 );


  }
}
