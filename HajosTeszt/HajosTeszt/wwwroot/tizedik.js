var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 853;
var timeoutHandler;

window.onload = function () {
    init();
    utolsóKérdés();
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }

        }
        )
        .then(data => {
            hotList[destination].question = data;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let data = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = data;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    document.getElementById("kép").innerHTML = `<img id="kép1" src="https://szoft1.comeback.hu/hajo/${kérdés.image}">`;
    helyesVálasz = kérdés.correctAnswer;
}

function Vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) {
        displayedQuestion = questionsInHotList - 1;
    }
    kérdésMegjelenítés();
    KattintásFeloldás();
    színezésOff();
}

function Előre() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) {
        displayedQuestion = 0;
    }
    kérdésMegjelenítés();
    KattintásFeloldás();
    színezésOff();
}

function színezésOff() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.backgroundColor = "antiquewhite";
    }
}

function KattintásLetiltás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "none";
    }
}

function KattintásFeloldás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "auto";
    }
}



function Válasz1() {
    document.getElementById("válasz1").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";

    if (document.getElementById("válasz1").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    KattintásLetiltás();
    timeoutHandler = setTimeout(Előre, 3000);
}

function Válasz2() {
    document.getElementById("válasz2").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";

    if (document.getElementById("válasz2").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    KattintásLetiltás();
    timeoutHandler = setTimeout(Előre, 3000);
}

function Válasz3() {
    document.getElementById("válasz3").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";

    if (document.getElementById("válasz3").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    KattintásLetiltás();
    timeoutHandler = setTimeout(Előre, 3000);
} 