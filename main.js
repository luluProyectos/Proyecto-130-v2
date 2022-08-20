var cancion1="";
var cancion2="";

var mix="";
var miy="";
var mdx="";
var mdy="";

var score1=0;
var score2=0;
var cancion1_status="";
var cancion2_status="";

function preload(){
    cancion1=loadSound("music.mp3");
    cancion2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    modelo=ml5.poseNet(video,modelLoaded);
    modelo.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,400,400);
    cancion1_status = cancion1.isPlaying();
	cancion2_status = cancion2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(score1 > 0.02)
	{ 
		circle(mix,miy,20);

			cancion2.stop();

		if(cancion1_status == false)
		{
			cancion1.play();
			document.getElementById("cancion").innerHTML = "Reproduciendo: Canción de Harry Potter";
		}
	}

	if(score2 > 0.02)
	{
		circle(mdx,mdy,20);

			cancion1.stop();

		if(cancion2_status == false)
		{
			cancion2.play();
			document.getElementById("cancion").innerHTML = "Reproduciendo: Canción de Peter Pan"
		}
	}
}
function modelLoaded(){
    console.log("modelo caragado");
}

function gotPoses(results){
    if(results.length>0){
        score1 =  results[0].pose.keypoints[9].score;
		score2 =  results[0].pose.keypoints[10].score;
        console.log(results);
		mix=results[0].pose.leftWrist.x;
        miy=results[0].pose.leftWrist.y;
        mdx=results[0].pose.rightWrist.x;
        mdy=results[0].pose.rightWrist.y;

        console.log(mix+" , "+ miy +" , "+ mdx +" , "+mdy);
    }
}