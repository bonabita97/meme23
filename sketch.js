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
var mouths = []; //입
var reyes = []; //오른눈
var leyes = []; //왼눈
var noses = []; //코

var rears = []; //오른귀
var lears = []; //왼귀
var rwrist = []; //오른 손목
var lwrist = []; //왼손목
////포즈넷 키포인트///
let x = 0;
let y = 0;

let img;
function preload() {
  for (var  i = 0; i <2; i++) {
  mouths[i] = loadImage('mouths/m' + i + '.png');
  reyes[i] = loadImage('reyes/re' + i + '.png');
  leyes[i] = loadImage('leyes/le' + i + '.png');
  noses[i] = loadImage('noses/n' + i + '.png');

  rears[i] = loadImage('rears/rear' + i + '.png');
  lears[i] = loadImage('lears/lear' + i + '.png');
  rwrist[i] = loadImage('rwrists/rwrist' + i + '.png');
  lwrist[i] = loadImage('lwrists/lwrist' + i + '.png');
    //이미지 로드 정확한 파일명 적을 것


  head = loadImage('hair.png');

  }
}

function setup() {
  createCanvas(640, 480);
  //§createCanvas(windowWidth, windowHeight);
  //video.size(width, height);
  video = createCapture(VIDEO);
  r = floor(random(0,6));

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
   //x = width/2
  //y = height/2

}
function gotPoses(poses) {
  if (poses.length > 0) {


  let hX = poses[0].pose.keypoints[0].position.x //머리x =코 포지션
  let hY = poses[0].pose.keypoints[0].position.y //머리y =코 포지션
  let nX = poses[0].pose.keypoints[0].position.x //코x
  let nY = poses[0].pose.keypoints[0].position.y //코y
  let elX = poses[0].pose.keypoints[1].position.x //왼눈x
  let elY = poses[0].pose.keypoints[1].position.y //왼눈y
  let erX = poses[0].pose.keypoints[2].position.x //오른눈x
  let erY = poses[0].pose.keypoints[2].position.y //오른눈y
  let mX = poses[0].pose.keypoints[0].position.x //입x= 코 포지션
  let mY = poses[0].pose.keypoints[0].position.y //입y =코 포지션
  let reX = poses[0].pose.keypoints[4].position.x //오른귀x
  let reY = poses[0].pose.keypoints[4].position.y //오른귀y
  let rwX = poses[0].pose.keypoints[10].position.x //오른손목x
  let rwY = poses[0].pose.keypoints[10].position.y //오른손목y
  let lwX = poses[0].pose.keypoints[9].position.x //왼손목x
  let lwY = poses[0].pose.keypoints[9].position.y //왼손목y
  let leX = poses[0].pose.keypoints[3].position.x //왼귀x
  let leY = poses[0].pose.keypoints[3].position.y //왼귀y

  pose.nose.x = lerp(pose.nose.x, nX, 0.5); //코
  pose.nose.y = lerp(pose.nose.y, nY, 0.5); //코
  pose.nose.x = lerp(pose.nose.x, fX, 0.5); //얼굴
  pose.nose.y = lerp(pose.nose.y, fY, 0.5);  //얼굴
  pose.nose.x = lerp(pose.nose.x, hX, 0.5); //머리
  pose.nose.y = lerp(pose.nose.y, hY, 0.5); //머리
  pose.rightEye.x = lerp(pose.rightEye.x, reX, 0.5); //오른눈
  pose.rightEye.y = lerp(pose.rightEye.y, reY, 0.5); //오른눈
  pose.leftEye.x = lerp(pose.leftEye.x, reX, 0.5); //왼눈
  pose.leftEye.y = lerp(pose.leftEye.y, reY, 0.5); //왼눈
  pose.nose.x = lerp(pose.nose.x, mX, 0.5); //입
  pose.nose.y = lerp(pose.nose.y, mY, 0.5); //입
  pose.leftEar.x = lerp(pose.leftEar.x, leX, 0.5); //왼귀
  pose.leftEar.y = lerp(pose.leftEar.y, leY, 0.5); //왼귀
  pose.rightEar.x = lerp(pose.rightEar.x, reX, 0.5); //오른귀
  pose.rightEar.y = lerp(pose.rightEar.y, reY, 0.5); //오른귀
  pose.rightWrist.x = lerp(pose.rightWrist.x, rwX, 0.5); //오른손
  pose.rightWrist.y = lerp(pose.rightWrist.y, rwY, 0.5); //오른손
  pose.leftWrist.x = lerp(pose.leftWrist.x, lwX, 0.5); //왼손
  pose.leftWrist.y = lerp(pose.leftWrist.y, lwY, 0.5); //왼손


  }
}
poseNet = ml5.poseNet(modelReady, options);
function modelReady() {
  select('#status').html('Model Loaded');

}

function draw() {


  push();
  scale(-1, 1);
  translate(-width, 0);
  //background(0,0,0);
  image(video, 0, 0, width, height);
  pop();
  imageMode(CORNER);
  image(video, 0, 0);
  if (mouseIsPressed) {
  r = floor(random(0,6));
  random(loadImage);
} else { }





  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

  let d = dist(pose.nose.x, pose.nose.y, pose.rightEye.x, pose.rightEye.y, pose.rightEar.x, pose.rightEar.y, pose.leftEar.x, pose.leftEar.y, pose.leftEye.x, pose.leftEye.y, pose.rightWrist.x, pose.rightWrist.y, pose.leftWrist.x, pose.leftWrist.y  );

    imageMode(CENTER);
    image(head, pose.nose.x, pose.nose.y - 120, d * 4, d * 3); //머리=코 y축 마이너스



    image(rears[r], pose.rightEar.x - 10, pose.rightEar.y, d * 1.25, d * 1.25); //오른귀

		image(lears[r], pose.leftEar.x + 5, pose.leftEar.y - 10, d * 1.25, d * 1.25); //왼귀


    image(noses[r], pose.nose.x, pose.nose.y - 15, d * 1.5, d * 1.5); //코

    image(reyes[r], pose.rightEye.x, pose.rightEye.y, d * 1.75, d * 1.75); //오른눈

    image(leyes[r], pose.leftEye.x, pose.leftEye.y, d * 1.5, d * 1.5); //왼눈

    image(mouth[r], pose.nose.x, pose.nose.y + 50, d * 1.25, d * 1.25); //입= 코 y축 플러스

    image(rwrist[r], pose.rightWrist.x, pose.rightWrist.y, d * 4, d * 6 ); //오른손
    image(lwrist[r], pose.leftWrist.x, pose.leftWrist.y, d * 4, d * 6 ); //왼손


  }

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
}

let logged = false;
function drawKeypoints()  {
	if (poses.length > 0 && !logged) {
		console.log(poses);
		logged = true;
	}}
// A function to draw ellipses over the detected keypoints
