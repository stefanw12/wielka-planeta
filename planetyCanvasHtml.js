let Planeta = function (x, y, rozmiar) {
    this.x = x;
    this.y = y;
    this.planetaRozmiar = rozmiar;
};

Planeta.prototype.rysuj = function () {
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

Planeta.prototype.przesun = function (kierunek, timeDiff) {
    asteroidy.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.rozmiar)
            && this.planetaRozmiar > element.rozmiar) {
            this.planetaRozmiar += element.rozmiar / 3;
            usun(element, asteroidy);
        }
    });

    ksiezyce.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.rozmiar)
            && this.planetaRozmiar > element.rozmiar) {
            this.planetaRozmiar += element.rozmiar / 5;
            usun(element, ksiezyce);
        }
    });

    planety.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.planetaRozmiar)
            && this.planetaRozmiar > element.planetaRozmiar) {
            this.planetaRozmiar += element.planetaRozmiar / 6;
            usun(element, planety);
        }
    });

    gwiazdy.forEach(element => {
        if (this.sprawdzKolizje(this.x, this.y, this.planetaRozmiar, element.x, element.y, element.rozmiar)
            && this.planetaRozmiar > element.rozmiar && asteroidy.length === 0 & ksiezyce.length === 0 & planety.length === 0) {
            this.planetaRozmiar += 200;
            usun(element, gwiazdy);
        }
    });

    if (deviceType == "mobile") {
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
            //if (koniecGry = false) {
                koniecGry = true;
                wlaczMenu();
            /*} else {
                koniecgry = false;
            }*/
        }
    } else {
        //coś
    }
};

Planeta.prototype.sprawdzKolizje = function (x, y, promien, drugiObjektX, drugiObjektY, drugiObjektPromien) {
    return Math.sqrt(Math.pow(x - drugiObjektX, 2) + Math.pow(y - drugiObjektY, 2)) < promien + drugiObjektPromien;
};

Planeta.prototype.sprawdzCzyJestesWiekszyOdSceny = function () {
    return gwiazdy.length === 0
};
