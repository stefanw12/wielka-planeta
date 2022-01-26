let Asteroida = function(x, y, rozmiar) {
    this.x = x;
    this.y = y;
    this.rozmiar = rozmiar;
    this.kierunekLotu = Math.floor(Math.random() * 360);
};

Asteroida.prototype.rysuj = function() {
    ctx.save();
    okrag(this.x, this.y, "gray", this.rozmiar, true);
    ctx.restore();
};

Asteroida.prototype.przesun = function() {
    this.x += 10 * Math.cos(this.kierunekLotu * Math.PI / 180);
    this.y += 10 * Math.sin(this.kierunekLotu * Math.PI / 180);
    if (this.y > bufferHeight + this.rozmiar || this.y < 0 || this.x > bufferWidth + this.rozmiar || this.x < 0) {
        this.kierunekLotu += 90;
    }
};

function pointInCircle(x1, y1, x2, y2, rozmiar, rozmiar2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < rozmiar + rozmiar2;
}

let generujAsteroide = function() {
    let newX = 0;
    let newY = 0;
    let kolizjaKsiezyce = false;
    let kolizjaAsteroidy = false;
    let kolizjaGwiazdy = false;
    let kolizjaPlanety = false;
    let rozmiar = Math.floor(Math.random() * 50);
    do {
        newX = Math.floor(Math.random() * bufferWidth);
        newY = Math.floor(Math.random() * bufferHeight);
        kolizjaKsiezyce = ksiezyce.some(ksiezyc => {
            return pointInCircle(newX, newY, ksiezyc.x, ksiezyc.y, ksiezyc.rozmiar, rozmiar);
        });
        kolizjaAsteroidy = asteroidy.some(asteroida => {
            return pointInCircle(newX, newY, asteroida.x, asteroida.y, asteroida.rozmiar, rozmiar);
        });
        kolizjaGwiazdy = gwiazdy.some(gwiazda => {
            return pointInCircle(newX, newY, gwiazda.x, gwiazda.y, gwiazda.rozmiar, rozmiar);
        });
        kolizjaPlanety = planety.some(planeta => {
            return pointInCircle(newX, newY, planeta.x, planeta.y, planeta.rozmiar, rozmiar);
        });
    } while (kolizjaKsiezyce || kolizjaAsteroidy || kolizjaPlanety || kolizjaGwiazdy);
    let asteroida = new Asteroida(newX, newY, rozmiar, Math.floor(Math.random() * 50));
    return asteroida;
};