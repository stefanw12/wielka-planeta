let Gwiazda = function () {
    this.x = centerX;
    this.y = centerY;
    this.rozmiar = Math.floor(250 + Math.random() * 50);
};

Gwiazda.prototype.rysuj = function () {
    ctx.save();
    okrag(this.x, this.y, "yellow", this.rozmiar, true);
    ctx.restore();
};