function setup(){
    canvas=createCanvas(450, 450)
    canvas.position(500, 220)
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotResults )
}
song_1=""
song_2=""
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftScore=0
status=""
function preload(){
    song_1=loadSound("music.mp3")
    song_2=loadSound("music2.mp3")
}
function draw(){
    image(video,0,0,450,450)

    status=song_1.isPlaying()
    
    fill(200, 0 ,0 )
    stroke(200, 0 ,0 )

    if(leftScore>0.2){
        circle(leftWristX,leftWristY,20)
        song_2.stop()
    }
    if(status==false){
        song_1.play()
        document.getElementById("song").innerHTML="Song 1"
        
    }
}
function modelLoaded(){
    console.log("Model Is loaded")
}
function gotResults(results){


    if(results.length>0){
        
        leftScore=results[0].pose.keypoints[9].score
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x - " + leftWristX + "left wrist y - " + leftWristY )

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x - " + rightWristX + "right wrist y - " + rightWristX )
    }
}
