window.onload = () => {

    var faktoriálisR = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriálisR(n - 1)
        }
    }

    function szamitas() {
        let n = document.getElementById("nTb").value;
        let n2 = parseInt(n)
        if (n2) {
            let er = faktoriálisR(n)
            document.getElementById("eredmenydiv").innerText = er

        }
        else {
            document.getElementById("eredmenydiv").innerText = "Rossz paraméter"
        }
        
    }

    let hova = document.getElementById("ide")
    hova.innerHTML = ""

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        hova.appendChild(sor)
        sor.classList.add("egymás_mellé")

        for (var o = 0; o < 10; o++) {
            let szám = document.createElement("div")
            sor.appendChild(szám)
            szám.innerText = (s + 1) * (o + 1)
            szám.classList.add("doboz")
            szám.style.color = `rgb(${255-(255 / 10 * s)},0,${255-(255 / 10 * o)})`
        }
    }
}