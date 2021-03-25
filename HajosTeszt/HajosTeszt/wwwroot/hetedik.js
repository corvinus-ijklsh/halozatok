var kérdések;
var kérdéssorszám = 0;

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d
    KérdésMegjelenítés(0);
}



var KérdésMegjelenítés = function (KérdésSzáma) {

    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let kép = document.getElementById("kép1");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");

    kérdés_szöveg.innerHTML = kérdések[kérdéssorszám].questionText
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdéssorszám].image
    válasz1.innerText = kérdések[kérdéssorszám].answer1
    válasz2.innerText = kérdések[kérdéssorszám].answer2
    válasz3.innerText = kérdések[kérdéssorszám].answer3
}

window.onload = {} => {
    letöltés();

    document.getElementById("Vissza").onclick = () => {
        console.log(kérdéssorszám)
        kérdéssorszám--;
        KérdésMegjelenítés(kérdéssorszám)
    }
    document.getElementById("Előre").onclick = () => {
        console.log(kérdéssorszám)
        kérdéssorszám++;
        KérdésMegjelenítés(kérdéssorszám)
    }



}