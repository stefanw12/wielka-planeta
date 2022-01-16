let Planeta = function(x, y, rozmiar) {
    this.x = x;
    this.y = y;
    this.planetaRozmiar = rozmiar;
};

Planeta.prototype.rysuj = function() {
    ctx.save();
    let szerokoscPaska = 20;
    let iloscPaskow = Math.ceil(this.planetaRozmiar / szerokoscPaska);
    for (let i = 0; i < iloscPaskow; i++) {
        let rozmiar = this.planetaRozmiar - i * szerokoscPaska;
        let kolor = i % 2 == 0 ? "Brown" : "Orange";
        okrag(this.x, this.y, kolor, rozmiar, true);
    }
    ctx.restore();
};

Planeta.prototype.sprawdzCzyJestesWiekszyOdSceny = function() {
    return gwiazdy.length === 0
};

Planeta.prototype.przesun = function(kierunek, timeDiff) {
    asteroidy.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.rozmiar) &&
            this.planetaRozmiar > element.rozmiar) {
            this.planetaRozmiar += element.rozmiar / 3;
            usun(element, asteroidy);
        }
    });

    ksiezyce.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.rozmiar) &&
            this.planetaRozmiar > element.rozmiar) {
            this.planetaRozmiar += element.rozmiar / 5;
            usun(element, ksiezyce);
        }
    });

    planety.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.planetaRozmiar) &&
            this.planetaRozmiar > element.planetaRozmiar) {
            this.planetaRozmiar += element.planetaRozmiar / 6;
            usun(element, planety);
        }
    });

    gwiazdy.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.rozmiar) &&
            asteroidy.length === 0 & ksiezyce.length === 0 & planety.length === 0) {
            this.planetaRozmiar += 200;
            usun(element, gwiazdy);
        }
    });

    if (!this.sprawdzCzyJestesWiekszyOdSceny()) {
        if (kierunek === "gora") {
            this.y -= predkoscRuchu * timeDiff;
        } else if (kierunek === "dol") {
            this.y += predkoscRuchu * timeDiff;
        } else if (kierunek === "prawa") {
            this.x += predkoscRuchu * timeDiff;
        } else if (kierunek === "lewa") {
            this.x -= predkoscRuchu * timeDiff;
        }
    } else {
        window.cancelAnimationFrame(reqId);
        wyswietltekst("Jesteś większy od sceny!", 650, ekranCenterX, ekranCenterY);
        wyswietltekst("Poczekaj chiwle na odświeżenie...", 500, ekranCenterX, ekranCenterY + 670);
        return "Tak"
    }
    if (kierunek === "odswiez") {
        odswiez();
    }

    if (kierunek === "zatrzymaj") {
        if (koniecGry = false) {
            koniecGry = true;
            //laczMenu();
        } // else {
        //    koniecgry = false;
        //}
    }
};

let mouseX = 0;
let mouseY = 0;

//$("body").bind("vmousemove", function(event) {
//    mouseY = event.clientY;
//    mouseX = event.clientX;
//});

$("body").bind("vmousedown", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

$("body").bind("vmouseup", function() {
    mouseX = 0;
    mouseY = 0;
});

let porownaj = function(strzalkaX, strzalkaY, strzalkaRozmiar) {
    return (strzalkaX <= mouseX && strzalkaX + strzalkaRozmiar >= mouseX) &&
        (strzalkaY <= mouseY && strzalkaY + strzalkaRozmiar >= mouseY);
}

Planeta.prototype.przesuwaniePalcem = function(timeDiff) {
    if (porownaj(prawaStrzalkaX, prawaStrzalkaY, rozmiarKwadratu) === true) {
        this.x += predkoscRuchu * timeDiff;
    } else if (porownaj(lewaStrzalkaX, lewaStrzalkaY, rozmiarKwadratu) === true) {
        this.x -= predkoscRuchu * timeDiff;
    } else if (porownaj(dolnaStrzalkaX, dolnaStrzalkaY, rozmiarKwadratu) === true) {
        this.y += predkoscRuchu * timeDiff;
    } else if (porownaj(gornaStrzalkaX, gornaStrzalkaY, rozmiarKwadratu) === true) {
        this.y -= predkoscRuchu * timeDiff;
    }
};

Planeta.prototype.sprawdzKolizje = function(x, y, promien, drugiObjektX, drugiObjektY, drugiObjektPromien) {
    return Math.sqrt(Math.pow(x - drugiObjektX, 2) + Math.pow(y - drugiObjektY, 2)) < promien + drugiObjektPromien;
};