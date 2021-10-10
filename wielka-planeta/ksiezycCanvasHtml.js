let Ksiezyc = function (x, y) {
    this.rozmiar = Math.floor(50 + Math.random() * 50);
    this.x = x;
    this.y = y;
};

Ksiezyc.prototype.rysuj = function () {
    ctx.save();
    this.czyMozeBycTenRiozmair = this.rozmiar - 5 > 50 ? 5 : 0;
    okrag(this.x, this.y, "gray", this.rozmiar, true);
    okrag(this.x - 20, this.y - 23, "black", this.rozmiar / 4 + 3, true);
    okrag(this.x + 20, this.y + 33, "black", this.rozmiar / 5 + 1, true);
    okrag(this.x + 35, this.y - 27, "black", this.rozmiar / 5 - 7, true);
    okrag(this.x - 35, this.y + 33, "black", this.rozmiar / 5 - 7, true);
    ctx.restore();
};

let generujKsieżyc = function () {
    let newX = 0;
    let newY = 0;
    let kolizjaKsiezyce = false;
    let kolizjaGwiazdy = false;
    let kolizjaPlanety = false;
    let rozmiar = Math.floor(50 + Math.random() * 50);
    do {
        newX = Math.floor(Math.random() * bufferWidth);
        newY = Math.floor(Math.random() * bufferHeight);
        kolizjaKsiezyce = ksiezyce.some(ksiezyc => {
            return pointInCircle(newX, newY, ksiezyc.x, ksiezyc.y, ksiezyc.rozmiar, rozmiar);
        });
        kolizjaGwiazdy = gwiazdy.some(gwiazda => {
            return pointInCircle(newX, newY, gwiazda.x, gwiazda.y, gwiazda.rozmiar, rozmiar);
        });
        kolizjaPlanety = planety.some(planeta => {
            return pointInCircle(newX, newY, planeta.x, planeta.y, planeta.rozmiar, rozmiar);
        });
    } while (kolizjaKsiezyce || kolizjaGwiazdy || kolizjaPlanety);
    let ksiezyc = new Ksiezyc(newX, newY, rozmiar, Math.floor(50 + Math.random() * 50));
    return ksiezyc;
};
