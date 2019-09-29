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
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  r = floor(random(0,6));

}

function gotPoses(poses) {
  if (poses.length > 0) {
    let hX = poses[0].pose.keypoints[0].position.x //머리x =코 포지션
    let hY = poses[0].pose.keypoints[0].position.y //머리y =코 포지션
    let nX = poses[0].pose.keypoints[0].position.x //코x
    let nY = poses[0].pose.keypoints[0].position.y //코y
    let fX =  poses[0].pose.keypoints[0].position.x
    let fY =  poses[0].pose.keypoints[0].position.x
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

    noseX = lerp(noseX, nX, 0.5); //코
    noseY = lerp(noseY, nY, 0.5); //코
    faceX = lerp(noseX, fX, 0.5); //얼굴
    faceY= lerp(noseY, fY, 0.5);  //얼굴
    headX = lerp(headX, hX, 0.5); //머리
    headY = lerp(headY, hY, 0.5); //머리
    rightEyeX = lerp(rightEyeX, reX, 0.5); //오른눈
    rightEyeY = lerp(rightEyeY, reY, 0.5); //오른눈
    leftEyeX = lerp(leftEyeX, reX, 0.5); //왼눈
    leftEyeY = lerp(leftEyeY, reY, 0.5); //왼눈
    mouthsX = lerp(mouthsX, mX, 0.5); //입
    mouthsY = lerp(mouthsY, mY, 0.5); //입
    leftEarX = lerp(leftEarX, leX, 0.5); //왼귀
    leftEarY = lerp(leftEarY, leY, 0.5); //왼귀
    rightEarX = lerp(rightEarX, reX, 0.5); //오른귀
    rightEarY = lerp(rightEarY, reY, 0.5); //오른귀
    rightWristX = lerp(rightWristX, rwX, 0.5); //오른손
    rightWristY = lerp(rightWristY, rwY, 0.5); //오른손
    leftWristX = lerp(leftWristX, lwX, 0.5); //왼손
    leftWristY = lerp(leftWristY, lwY, 0.5); //왼손
  }
}

function modelReady() {
  console.log('model ready');
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

  let d = dist(noseX, noseY, leftEyeX, leftEyeY, rightEyeX, rightEyeY);

    imageMode(CENTER);
    image(head, noseX, noseY - 120 ); //머리=코 y축 마이너스



    image(rears[r], rightEarX, rightEarY ); //오른귀

		image(lears[r], leftEarX, leftEarY ); //왼귀


    image(noses[r], noseX, noseY, d); //코

    image(reyes[r], rightEyeX, rightEyeY, d); //오른눈

    image(leyes[r], leftEyeX, leftEyeY, d); //왼눈


    image(rwrist[r],rightWristX, rightWristY ); //오른손
    image(lwrist[r], leftWristX, leftWristY ); //왼손


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
