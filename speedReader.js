/*
This file is the JavaScript code for the speedreader HTML code.
*/

"use strict";

//initializes variables.
var speed = 171;
var stopIsClicked = false;
var startIsClicked = false;
var updateSpeed = false;

window.onload= function() {

    document.getElementById("playbuttonstart").onclick = start;
    document.getElementById("medium").onclick = changeSize;
    document.getElementById("big").onclick = changeSize;
    document.getElementById("bigger").onclick = changeSize;
    document.getElementById("speedchoices").onchange = changeSpeed;
    document.getElementById("playbuttonstop").onclick = stop;
    document.getElementById("inputtextbox").disabled = false;
    document.getElementById("playbuttonstart").disabled = false;
    document.getElementById("playbuttonstop").disabled = true;
};

//change the size of the output text.
function changeSize() {
    var whichSize = document.getElementsByName("sizetext");
    var len = whichSize.length;
    var sizes = ["36pt", "48pt", "60pt"];
    
    for(var i = 0; i<len; i++) {
        if (whichSize[i].checked) {
            document.getElementById("userinterface").style.fontSize = sizes[i];
        }
    }
}

//updates whether the user has changed the speed that the text is shown at.
function changeSpeed() {
    updateSpeed = true;
}

//changes the speed that the text is shown at.
function changeSpeed2(){
    var whichSpeed = document.getElementById("speedchoices");
    var len = whichSpeed.length;
    var speeds = [500, 200, 171, 150, 133, 120];
    for (var i = 0; i < len; i++) {
        if (whichSpeed[i].selected) {
            speed = speeds[i];
        }
    }
}

//when the user presses start, the input words flash on the page one at a time.
function start() {
    document.getElementById("playbuttonstart").disabled = true;
    stopIsClicked = false;
    startIsClicked = true;
    document.getElementById("playbuttonstop").disabled = false;
    document.getElementById("inputtextbox").disabled = true;
    var text = document.getElementById("inputtextbox").value;
    var result = text.split(/[ \t\n]+/); 
    var i = 0;
    var timer = setInterval(function() {
        document.getElementById("userinterface").innerHTML = result[i];
        if (updateSpeed) {
            document.getElementById("speedchoices").onchange = changeSpeed2;  
            console.log(speed);
        }
        updateSpeed = false;
        if (i >= result.length || stopIsClicked) {
            clearInterval(timer);
            document.getElementById("userinterface").innerHTML = "";
            stop();
        } 
        i++;
    }, speed);
}

//when the user presses stop, the words stop showing on the page.
function stop() {
    startIsClicked = false;
    stopIsClicked = true;
    document.getElementById("playbuttonstop").disabled = true;
    document.getElementById("playbuttonstart").disabled = false;
    document.getElementById("inputtextbox").disabled = false;
}
