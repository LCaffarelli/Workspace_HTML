var finishState = localStorage.getItem('finishState');
var result = [];

if (document.getElementById('page-number') && document.getElementById('page-number').value === "1") {
    window.onload = init;

    var nbQuestions = 15;

    var finishState = false;

    //*********************************************** */
    //****     A configurer si nécessaire       ***** */
    var duration = 15; //Durée de l'épreuve en minutes
    //*********************************************** */
} else if (finishState) {
    let resultString = localStorage.getItem('result');
    result = resultString.split(',');
    finish();
}




function init() {

    for (i = 1; i < nbQuestions + 1; i++) {
        let index = i.toString();

        document.getElementById(index).addEventListener('change', function() {
            verif(index);
        });

    }

    document.querySelector('button').addEventListener('click', function() {
        redirection();
    });

    countdown();
}


let redirection = function() {
    finishState = true;
    localStorage.setItem('finishState', finishState);
    localStorage.setItem('result', result);
    window.location.replace('final.html');
}

function finish() {
    result.sort();
    console.log(result);
    let image = document.getElementById('image');
    document.querySelector('h3').textContent = "Score : " + result.length + "/15";
    if (result.length <= 5) {
        image.setAttribute('src', 'assets/images/smiley-red.png');
    } else if (result.length <= 10) {
        image.setAttribute('src', 'assets/images/smiley-orange.png');
    } else {
        image.setAttribute('src', 'assets/images/smiley-green.png');
    }

    for (let i = 1; i <= 15; i++) {
        document.getElementById('rep' + i.toString()).innerText = window.atob(soluce[i]);
        if (result.includes(i.toString())) {
            document.getElementById("state" + i.toString()).innerText = "Bonne réponse";
        }
    }

}

/**
 * Function validation
 */
function verif(index) {
    let question = document.getElementById(index);
    if (question.value == window.atob(soluce[index])) {
        console.log('gagné')
        result.push(index);
        console.log(result);
    }
}


function countdown() {
    duration = duration * 60;
    var timer = duration,
        minutes, seconds;

    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('time').textContent = minutes + ":" + seconds;

        if (timer < 1 * 60) {
            document.getElementById('time').className = 'red';
        } else if (timer < 5 * 60) {
            document.getElementById('time').className = 'orange';
        }

        if (--timer < 0) {
            redirection();
        }
    }, 1000);
}