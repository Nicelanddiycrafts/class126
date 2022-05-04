song= "";
lwx = 0;
lwy = 0;
rwy = 0;
rwx = 0;
scorelw =0;
scorerw =0;

function preload(){
song = loadSound("encanto.mp3");
img = loadImage('g.png');
}

function setup(){
canvas = createCanvas(600,400);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw(){
image(video,0,0,600,400);

if(scorelw > 0.2){
    image(img,lwx,lwy,50,100);

    nlwy = Number(lwy);
    r = floor(nlwy);
    c = r/400;

    song.setVolume(c);
    document.getElementById('v').innerHTML = "Volume = " + c;
}

if(scorerw>0.2){
    image(img,rwx,rwy,50,100);


if(rwy>0 && rwy<=100){
    song.rate(0.5);
    document.getElementById('sv').innerHTML = "Speed = 0.5x ";
}

if(rwy>100 && rwy<=200){
    song.rate(1);
    document.getElementById('sv').innerHTML = "Speed = 1x ";
}

if(rwy>200 && rwy<=300){
    song.rate(1.7);
    document.getElementById('sv').innerHTML = "Speed = 1.7x ";
} 

if(rwy>300 && rwy<=400){
    song.rate(2.5);
    document.getElementById('sv').innerHTML = "Speed = 2.5x ";
}  


}

}


function play(){
    song.play();
    song.setVolume(0.7);
    song.rate(1);
}

function modelLoaded(){
console.log("model is loaded");
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;
    scorelw = results[0].pose.keypoints[9].score;
    scorerw = results[0].pose.keypoints[10].score;

    rwx = results[0].pose.rightWrist.x;
    rwy = results[0].pose.rightWrist.y;

}
}