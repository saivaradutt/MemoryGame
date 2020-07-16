'use strict'

const imagesOriginal = ['back.png','next.png','diagonal-arrow-down.png','diagonal-arrow-up.png','download.png','up-arrow.png','double-arrow.png','move.png',
              'back.png','next.png','diagonal-arrow-down.png','diagonal-arrow-up.png','download.png','up-arrow.png','double-arrow.png','move.png'];
let imagesCopy = ['back.png','next.png','diagonal-arrow-down.png','diagonal-arrow-up.png','download.png','up-arrow.png','double-arrow.png','move.png',
    'back.png','next.png','diagonal-arrow-down.png','diagonal-arrow-up.png','download.png','up-arrow.png','double-arrow.png','move.png'];

let matchingPairs = 0;
let interval;
let gameRunningTime;
let selectedFirstElement = undefined;

function startGame () {
    document.getElementById('newGameBtn').innerHTML = ''
    const stopBtn = '<button class="btn-Button first-button" onclick="stopGame();">Stop Game</button>'
    document.getElementById('newGameBtn').innerHTML = stopBtn;
    //.getElementById('generateImages').style.display = "flex";

    setTimer()
}
function stopGame () {
    document.getElementById('newGameBtn').innerHTML = ''
    const stopBtn = '<button class="btn-Button first-button" onclick="toggleBtn();">New Game</button>'
    document.getElementById('newGameBtn').innerHTML = stopBtn
    stopTimer()
}
function setTimer() {

    var second = 0,
        minute = 0;
    var timer = document.querySelector(".time");

    interval = setInterval(function () {
        gameRunningTime = minute + "mins " + second + "secs";
        time.innerHTML = gameRunningTime;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }

    }, 1000);
}

function stopTimer() {
    clearInterval(interval)
}
function randomImageGenerator(){
    let minValue = 0;
    let ranNums = [];
    let flipped = 0;

    while (imagesCopy.length !== 0) {

        let randomPosition = Math.floor(Math.random() * (imagesCopy.length));
        //ranNums.push(images[i]);
        let ranImage = imagesCopy.splice(randomPosition,1);

        document.getElementById('generateImages').innerHTML += '<div class="arrowImage"><img class="randomlyGeneratedImages" data-match="images/arrows/'+ranImage+'" id="img'+imagesCopy.length+'" src="images/arrows/question.png"></div>';
    }

    $(".randomlyGeneratedImages").click(function(){


            var flipImagePath = $(this).attr('data-match')
            console.log(flipImagePath);
            $(this).attr('src',flipImagePath);

            if (selectedFirstElement === undefined)
            {
                selectedFirstElement = $(this)
            }
            else
            {
                console.log($(this));
                matchPairs($(this));
            }


        console.log("I GOT CLICKED");
        console.log(selectedFirstElement);

    });
}

function matchPairs(selectedSecondElement){
    var selectFirst = selectedFirstElement.attr('src');
    var selectSecond = selectedSecondElement.attr('src');
    if(selectFirst === selectSecond){
        ++matchingPairs;
        document.getElementById('totalPairs').innerHTML = matchingPairs;
        disableImagesClick(selectedFirstElement, selectedSecondElement);
        selectedFirstElement = undefined;
        if ((matchingPairs == 8))
        {
            stopTimer();
            document.getElementById('bestScore').innerHTML = gameRunningTime;
        }
    }
    else
    {
        setTimeout(turnImages, 1000);


        console.log(selectFirst + selectSecond);

        console.log('!!!!');
    }
    function turnImages(){
        selectedFirstElement.delay("slow").attr('src',"images/arrows/question.png");
        selectedSecondElement.delay("slow").attr('src',"images/arrows/question.png");
        selectedFirstElement = undefined;
    }
}
function disableImagesClick(firstElement, secondElement) {
    firstElement.off("click");
    secondElement.off("click");
}


$(document).ready(function(){
    randomImageGenerator();
});
