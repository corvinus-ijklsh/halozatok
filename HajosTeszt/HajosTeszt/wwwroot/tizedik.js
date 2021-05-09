var hotList = []; //az éppen gyakoroltatott kérdések listája
var questionsInHotList = 3; //ez majd 7 lesz, teszhetz jó a 3
var displayedQuestion; //a hotlistből éppen ez a kérdés van kint
var numberOfQuestions; //kérdések száma a teljes adatbázisban
var nextQuestion = 853; //a következő kérdés száma a teljes listában
var timeoutHandler;

window.onload = function () {
    init;
    utolsóKérdés();
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás válasz: ${result.status}`)
                return null;
            }
            else {
                return result.json()
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

    //Kérdések számát megadó API végpont
    fetch("questions/count")
        .then(result => { return result.text() })
        .then(n => { numberOfQuestions = parseInt(n) })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }

    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz" + i).classList.remove("jó", "rossz")
        document.getElementById(`válaszok`).style.pointerEvents = "auto";
    }
    helyesVálasz = kérdés.correctAnswer;
}

//Előre-hátra gombok
document.getElementById("előre_gomb").addEventListener("click", Előre);
document.getElementById("vissza_gomb").addEventListener("click", Vissza);

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

function Választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //to do: kérdéslista vége ellenőrzés

        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswers =0;
    }
    document.getElementById(`válaszok`).style.pointerEvents = "none";
    timeoutHandler = setTimeout(Előre, 3000);
}

function színezésOff() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.backgroundColor = "antiquewhite";
    }
}

function KattintásLetiltás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válaszok`).style.pointerEvents = "none";
    }
}

function KattintásFeloldás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "auto";
    }
}



/*function Válasz1() {
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
    timeoutHandler = setTimeout(Előre, 3000);*/
} 