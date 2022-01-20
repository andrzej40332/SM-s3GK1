var statek = document.getElementById("statek");
var board = document.getElementById("board");

window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(statek).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 0) {
        statek.style.left = left - 20 + "px";
    }
   
    else if (e.key == "ArrowRight" && left <= 460) {
        statek.style.left = left + 20 + "px";
    }

    if (e.key == "ArrowUp" || e.keyCode == 32) {        //strzelanie strzalka do gory i spacja
       
        var pocisk = document.createElement("div");
        pocisk.classList.add("pociski");
        board.appendChild(pocisk);

        var ruchpocisk = setInterval(() => {
            var kosmici = document.getElementsByClassName("kosmici");

            for (var i = 0; i < kosmici.length; i++) {
                var kosmita = kosmici[i];
                if (kosmita != undefined) {
                    var kosmitabound = kosmita.getBoundingClientRect();
                    var pociskbound = pocisk.getBoundingClientRect();

                    //sprawdzanie czy kosmita i pocisk sa w tej samej pozycji
                    //niszczenie kosmitow

                    if (
                        pociskbound.left >= kosmitabound.left &&
                        pociskbound.right <= kosmitabound.right &&
                        pociskbound.top <= kosmitabound.top &&
                        pociskbound.bottom <= kosmitabound.bottom
                    ) {
                        kosmita.parentElement.removeChild(kosmita); 
                        //liczenie punktów
                        document.getElementById("punkty").innerHTML =
                            parseInt(document.getElementById("punkty").innerHTML) + 1;
                    }
                }
            }
            var pociskbottom = parseInt(
                window.getComputedStyle(pocisk).getPropertyValue("bottom")
            );

            //zabezpieczenie zeby pocisk nie wychodzil z ramki
            if (pociskbottom >= 500) {
                clearInterval(ruchpocisk);
            }

            pocisk.style.left = left + 18 + "px"; //z ktorej pozycji bedzie wystrzeliwany pocisk
            pocisk.style.bottom = pociskbottom + 8 + "px";
        });
    }
});

var generkosmici = setInterval(() => {           
    var kosmita = document.createElement("div");
    kosmita.classList.add("kosmici");                                                             
    var kosmitaleft = parseInt(
        window.getComputedStyle(kosmita).getPropertyValue("left")
    );                                                                  //miejsca pojawiania sie kosmitow
    kosmita.style.left = Math.floor(Math.random() * 450) + "px";                
    board.appendChild(kosmita);
}, 1000);                                       

var ruchkosmici = setInterval(() => {
    var kosmici = document.getElementsByClassName("kosmici");

    if (kosmici != undefined) {
        for (var i = 0; i < kosmici.length; i++) {
            //poruszanie sie w dol
            var kosmita = kosmici[i];
            var kosmitatop = parseInt(
                window.getComputedStyle(kosmita).getPropertyValue("top")
            );
            if (kosmitatop >= 475) {                //wysokosc ramki - wysokosc kosmity + 25 =475
                alert("Koniec Gry");
                clearInterval(ruchkosmici);
                window.location.reload();
            }
            kosmita.style.top = kosmitatop + 25 + "px";
        }
    }
}, 450);
