let video;
let poseNet;
let pose;
let skeleton;


// Global Variables
let ellipseSize = 16;

function setup() {
  let cnv = createCanvas(640, 480);
  background(0, 0, 0);
  cnv.parent("videoframe");

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  strokeWeight(2);
  stroke(255);
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function checkAlignment(bodyOne, bodyTwo) {
  line(bodyOne.x, bodyOne.y, bodyTwo.x, bodyTwo.y);

  if (Math.abs(bodyOne.y - bodyTwo.y) <= 20) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }

  ellipse(bodyOne.x, bodyOne.y, ellipseSize);
  ellipse(bodyTwo.x, bodyTwo.y, ellipseSize); 
}

function neckPosture() {
  let nosePositionY = pose.nose.y;
  let shoulderPositionY = (pose.rightShoulder.y + pose.leftShoulder.y)/2;
  let shoulderPositionX = (pose.rightShoulder.x + pose.leftShoulder.x)/2;

  line(pose.nose.x, pose.nose.y, shoulderPositionX, shoulderPositionY);
  if (nosePositionY - shoulderPositionY >= -100) {
    fill(255, 0, 0);
  } else {
    fill(0, 255, 0);
  }

  ellipse(pose.nose.x, pose.nose.y, ellipseSize);
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    // let eyeR = pose.rightEye;
    // let eyeL = pose.leftEye;
    // let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    // fill(255, 0, 0);
    // ellipse(pose.nose.x, pose.nose.y, d);
    // fill(0, 0, 255);
    // ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    // ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    let shoulderR = pose.rightShoulder;
    let shoulderL = pose.leftShoulder;

    neckPosture(); 
    checkAlignment(shoulderR, shoulderL);
    checkAlignment(pose.rightEar, pose.leftEar);



    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0,255,0);
    //   ellipse(x,y,16,16);
    // }
    
    // for (let i = 0; i < skeleton.length; i++) {
    //   let a = skeleton[i][0];
    //   let b = skeleton[i][1];
    //   strokeWeight(2);
    //   stroke(255);
    //   line(a.position.x, a.position.y,b.position.x,b.position.y);      
    // }
  }   



}

