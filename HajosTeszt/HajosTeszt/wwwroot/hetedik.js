var ID = 1;

window.onload = function () {
   
kérdésload(ID);
}
var kérdések;
var kérdésSzáma;
var helyesVálasz;

function letöltés() {
    function letöltésBefejeződött(d) {
        console.log("Sikeres letöltés!")
        console.log(d)
        kérdések = d;
        kérdésMegjelenítésRégi(1);
        kérdésSzáma = 1;
    }
}

function kérdésload(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error('Hibás válasz: ${response.status}')
            }
            else {
                return response.json()
            }

        })
        .then(data => kérdésMegjelenítésÚj(data));
}

var kérdésMegjelenítés = function (kérdésSzáma) {

    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    document.getElementById("kép").innerHTML = `<img id="kép1" src="https://szoft1.comeback.hu/hajo/${kérdés.image}">`;
    helyesVálasz = kérdés.correctAnswer;
}

function Vissza_new() {
    ID = ID - 1;
    kérdésBetöltés(ID);
    színezésOff();
}

function Előr_new() {
    ID = ID + 1;
    kérdésBetöltés(ID);

    színezésOff();
}

function Válasz1_new() {
    document.getElementById("válasz1").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";
}

function Válasz2_new() {
    document.getElementById("válasz2").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";
}

function Válasz3_new() {
    document.getElementById("válasz3").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";
}


window.onload = () => {

    letöltés();

    document.getElementById("vissza").onclick = () => {

        document.getElementById("válasz1").style.backgroundColor = "peachpuff";
        document.getElementById("válasz2").style.backgroundColor = "peachpuff";
        document.getElementById("válasz3").style.backgroundColor = "peachpuff";

        document.getElementById("válasz1").style.pointerEvents = 'auto';
        document.getElementById("válasz2").style.pointerEvents = 'auto';
        document.getElementById("válasz3").style.pointerEvents = 'auto';

        if (kérdésSorszám == 0) {
            kérdésSorszám = kérdések.length - 1
            kérdésMegjelenítés(kérdésSorszám);
        }
        else {
            kérdésMegjelenítés(--kérdésSorszám);
        }

    }

    document.getElementById("előre").onclick = () => {

        document.getElementById("válasz1").style.backgroundColor = "peachpuff";
        document.getElementById("válasz2").style.backgroundColor = "peachpuff";
        document.getElementById("válasz3").style.backgroundColor = "peachpuff";

        document.getElementById("válasz1").style.pointerEvents = 'auto';
        document.getElementById("válasz2").style.pointerEvents = 'auto';
        document.getElementById("válasz3").style.pointerEvents = 'auto';

        if (kérdésSorszám == kérdések.length - 1) {
            kérdésSorszám = 0;
            kérdésMegjelenítés(kérdésSorszám);
        }
        else {
            kérdésMegjelenítés(++kérdésSorszám);
        }

    }


    document.getElementById("válasz1").onclick = () => {

        if (kérdések[kérdésSorszám].correctAnswer == 1) {
            document.getElementById("válasz1").style.background = "darkgreen";
        }
        else {
            document.getElementById("válasz1").style.background = "lightcoral";
            document.getElementById("válasz" + kérdések[kérdésSorszám].correctAnswer).style.background = "darkgreen";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';

    }

    document.getElementById("válasz2").onclick = () => {

        if (kérdések[kérdésSorszám].correctAnswer == 2) {
            document.getElementById("válasz2").style.background = "darkgreen";
        }
        else {
            document.getElementById("válasz2").style.background = "lightcoral";
            document.getElementById("válasz" + kérdések[kérdésSorszám].correctAnswer).style.background = "darkgreen";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';
    }

    document.getElementById("válasz3").onclick = () => {

        if (kérdések[kérdésSorszám].correctAnswer == 3) {
            document.getElementById("válasz3").style.background = "darkgreen";
        }
        else {
            document.getElementById("válasz3").style.background = "lightcoral";
            document.getElementById("válasz" + kérdések[kérdésSorszám].correctAnswer).style.background = "darkgreen";
        }

        document.getElementById("válasz1").style.pointerEvents = 'none';
        document.getElementById("válasz2").style.pointerEvents = 'none';
        document.getElementById("válasz3").style.pointerEvents = 'none';
    }
}
