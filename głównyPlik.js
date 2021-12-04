let startTime = Date.now();
let plotno = document.getElementById("plotno");
let szer = plotno.width;
let wys = plotno.height;
let plotnoCtx = plotno.getContext("2d");
let kierunki = {
    37: "lewa",
    38: "gora",
    39: "prawa",
    40: "dol",
    32: "odswiez",
    27: "zatrzymaj"
};
let kierunek = "";
let predkoscRuchu = 0.3;
let szerokoscEkranu = 1250;
let wysokoscEkranu = 840;
let bufferWidth = 2000;
let bufferHeight = 2000;
let ekranCenterX = szerokoscEkranu / 2;
let ekranCenterY = wysokoscEkranu / 2;
let centerX = bufferWidth / 2;
let centerY = bufferHeight / 2;
let worldX = 0;
let worldY = 0;
let koniecGry = false;

let bufferCanvas = document.createElement("canvas");
bufferCanvas.width = bufferWidth;
bufferCanvas.height = bufferHeight;
let ctx = bufferCanvas.getContext("2d");
let reqId;

let usun = function(obiekt, lista) {
    let obiektDoUsuniecia = lista.indexOf(obiekt);
    lista.splice(obiektDoUsuniecia, 1);
}

let gwiazdka = function(x, y, scale) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(x, y);
    ctx.transform(scale, 0, 0, scale, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(20, 20);
    ctx.lineTo(0, 20);
    ctx.lineTo(20, 40);
    ctx.lineTo(10, 60);
    ctx.lineTo(30, 50);
    ctx.lineTo(50, 60);
    ctx.lineTo(40, 40);
    ctx.lineTo(60, 20);
    ctx.lineTo(40, 20);
    ctx.fill();
    ctx.restore();
}

let okrag = function(x, y, kolor, promien, wypelnijOkrag) {
    ctx.beginPath();
    ctx.arc(x, y, promien, 0, Math.PI * 2, false);
    if (wypelnijOkrag) {
        ctx.fillStyle = kolor;
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

let kwadrat = function(kolor, x, y, wysokosc, szerokosc) {
    plotnoCtx.fillStyle = kolor;
    plotnoCtx.fillRect(x, y, szerokosc, wysokosc);
}

let strzalka = function(x, y, obrot) {
    plotnoCtx.save();
    plotnoCtx.translate(x + 25, y + 5);
    plotnoCtx.rotate(obrot * Math.PI / 180);
    plotnoCtx.fillStyle = "red";
    plotnoCtx.strokeStyle = "red";
    plotnoCtx.beginPath()
    let xTrojkata = 5;
    plotnoCtx.moveTo(-25, 0);
    plotnoCtx.lineTo(xTrojkata, 0);
    plotnoCtx.stroke();
    plotnoCtx.beginPath();
    plotnoCtx.moveTo(xTrojkata, 0)
    plotnoCtx.lineTo(xTrojkata, 10);
    plotnoCtx.lineTo(xTrojkata + 15, 0);
    plotnoCtx.lineTo(xTrojkata, -10);
    plotnoCtx.lineTo(xTrojkata, 0);
    plotnoCtx.fill();
    plotnoCtx.restore();
};

let wyswietltekst = function(tekst, rozmiar, x, y) {
    ctx.font = `${rozmiar}px Courier`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "White";
    ctx.fillText(tekst, x, y);
};

function odswiez() {
    window.location.reload(true);
};

function wlaczMenu() {
    wyswietltekst("HEJ", 1000, ekranCenterX, ekranCenterY)
}

let gwiazda = new Gwiazda();
let gwiazdy = [gwiazda];

let generujPlanete = function() {
    let newX = 0;
    let newY = 0;
    let kolizjaGwiazdy = false;
    let kolizjaPlanety = false;
    let rozmiar = Math.floor(100 + Math.random() * 50);
    do {
        newX = Math.floor(Math.random() * bufferWidth);
        newY = Math.floor(Math.random() * bufferHeight);
        kolizjaGwiazdy = gwiazdy.some(gwiazda => {
            return pointInCircle(newX, newY, gwiazda.x, gwiazda.y, gwiazda.rozmiar, rozmiar);
        });
        kolizjaPlanety = planety.some(planeta => {
            return pointInCircle(newX, newY, planeta.x, planeta.y, planeta.rozmiar, rozmiar);
        });
    } while (kolizjaGwiazdy || kolizjaPlanety);
    let planeta = new Planeta(newX, newY, rozmiar, Math.floor(50 + Math.random() * 50));
    return planeta;
};

let planety = [];
for (let i = 0; i < 10; i++) {
    planety.push(generujPlanete());
}

let ksiezyce = [];
for (let i = 0; i < 10; i++) {
    ksiezyce.push(generujKsieżyc());
}

let asteroidy = [];
for (let i = 0; i < 10; i++) {
    asteroidy.push(generujAsteroide());
}

let kwadratZeStrzalka = function(strona) {
    if (strona === "prawo") {
        kwadrat("orange", szerokoscEkranu - 70, wysokoscEkranu - 50, 50, 50);
        strzalka(szerokoscEkranu - 67, wysokoscEkranu - 27, 0);
    } else if (strona === "lewo") {
        kwadrat("orange", szerokoscEkranu - 190, wysokoscEkranu - 50, 50, 50);
        strzalka(szerokoscEkranu - 193, wysokoscEkranu - 27, 180);
    } else if (strona === "dol") {
        kwadrat("orange", szerokoscEkranu - 130, wysokoscEkranu - 50, 50, 50);
        strzalka(szerokoscEkranu - 130, wysokoscEkranu - 27, 90);
    } else if (strona === "gora") {
        kwadrat("orange", szerokoscEkranu - 130, wysokoscEkranu - 107, 50, 50);
        strzalka(szerokoscEkranu - 130, wysokoscEkranu - 88, -90);
    }
}

$("body").keydown(function(zdarzenie) {
    kierunek = kierunki[zdarzenie.keyCode];
});

$("body").keyup(function() {
    kierunek = "";
});

let narysujStrzalki = function() {
    kwadratZeStrzalka("prawo");
    kwadratZeStrzalka("lewo");
    kwadratZeStrzalka("dol");
    kwadratZeStrzalka("gora");
}

function ensureVehicleInBounds() {
    if (planeta.x < planeta.planetaRozmiar) {
        planeta.x = planeta.planetaRozmiar;
    } else if (planeta.x > bufferWidth - planeta.planetaRozmiar) {
        planeta.x = bufferWidth - planeta.planetaRozmiar;
    }

    if (planeta.y < planeta.planetaRozmiar) {
        planeta.y = planeta.planetaRozmiar;
    } else if (planeta.y > bufferHeight - planeta.planetaRozmiar) {
        planeta.y = bufferHeight - planeta.planetaRozmiar;
    }
}

function updateWorldCoords() {
    if (planeta.x > ekranCenterX && planeta.x < bufferWidth - ekranCenterX) {
        worldX = -planeta.x + ekranCenterX;
    } else if (planeta.x <= ekranCenterX) {
        worldX = 0;
    } else if (planeta.x > szerokoscEkranu - ekranCenterX) {
        worldX = -bufferWidth + ekranCenterX * 2;
    }
    if (planeta.y > ekranCenterY && planeta.y < bufferHeight - ekranCenterY) {
        worldY = -planeta.y + ekranCenterY;
    } else if (planeta.y <= ekranCenterY) {
        worldY = 0;
    } else if (planeta.y > bufferHeight - ekranCenterY) {
        worldY = -bufferHeight + ekranCenterY * 2;
    }
}

let planeta = new Planeta(ekranCenterX - 500, ekranCenterY, 50);

let gra = function(lastTime) {
    let time = Date.now();
    let timeDiff = time - lastTime;

    planeta.przesun(kierunek, timeDiff);
    ensureVehicleInBounds();
    updateWorldCoords();

    ctx.clearRect(0, 0, bufferWidth, bufferHeight);

    ctx.save();
    ctx.fillStyle = "Black";
    ctx.restore();

    gwiazdka(50, 50, 0.7);
    gwiazdka(500, 300, 1.2);

    for (let i = 0; i < gwiazdy.length; i++) {
        gwiazdy[i].rysuj();
    }

    for (let i = 0; i < planety.length; i++) {
        planety[i].rysuj();
    }

    for (let i = 0; i < ksiezyce.length; i++) {
        ksiezyce[i].rysuj();
    }

    for (let i = 0; i < asteroidy.length; i++) {
        asteroidy[i].rysuj();
    }

    planeta.rysuj();
    plotnoCtx.clearRect(0, 0, plotno.width, plotno.height);
    plotnoCtx.drawImage(bufferCanvas, worldX, worldY);
    if (!koniecGry) {
        reqId = window.requestAnimationFrame(function() {
            gra(time);
        });

        narysujStrzalki();
    }
};

gra(startTime);

setInterval(function() {
    asteroidy.forEach(element => {
        element.przesun();
    });
}, 700);