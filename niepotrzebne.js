// W tym pliku przechowywany jest kod, który nie jest nigdzie potrzebny. \\
//
// $("body").bind("vmousedown", function(event) {
//     let x = event.clientX;
//     let y = event.clientY;
//     ustawKierunek(x, y);
// });

// $("body").bind("vmouseup", function() {
//     kierunek = "";
// });

// $("body").bind("vmousemove", function(event) {
//     let x = event.clientX;
//     let y = event.clientY;
//     if (kierunek !== "") {
//         ustawKierunek(x, y);
//     }
//     //    console.log(x + " " + y);
//     //    kierunek = "";
// });

// function ustawKierunek(x, y) {
//     if (x < szerokoscEkranu / 3) {
//         kierunek = "lewa";
//     } else if (x > szerokoscEkranu * 2 / 3) {
//         kierunek = "prawa";
//     } else {
//         if (y < ekranCenterY) {
//             kierunek = "gora";
//         } else {
//             kierunek = "dol";
//         }
//     }
// }
//
// if (strona === "prawo") {
//     plotnoCtx.beginPath()
//     plotnoCtx.moveTo(x, y);
//     let xTrojkata = x + 30
//     plotnoCtx.lineTo(x + 30, y);
//     plotnoCtx.stroke();
//     plotnoCtx.beginPath();
//     plotnoCtx.moveTo(xTrojkata, y)
//     plotnoCtx.lineTo(xTrojkata, y + 10);
//     plotnoCtx.lineTo(xTrojkata + 15, y);
//     plotnoCtx.lineTo(xTrojkata, y - 10);
//     plotnoCtx.lineTo(xTrojkata, y);
//     plotnoCtx.fill();
// } else if (strona === "lewo") {
//     plotnoCtx.beginPath();
//     plotnoCtx.moveTo(x, y);
//     plotnoCtx.lineTo(x - 30, y)
//     xTrojkata = x - 30;
//     plotnoCtx.stroke();
//     plotnoCtx.beginPath();
//     plotnoCtx.moveTo(xTrojkata, y);
//     plotnoCtx.lineTo(xTrojkata, y - 10);
//     plotnoCtx.lineTo(xTrojkata - 15, y);
//     plotnoCtx.lineTo(xTrojkata, y + 10);
//     plotnoCtx.lineTo(xTrojkata, y);
//     plotnoCtx.fill();
// } else if (strona === "dol") {
//     plotnoCtx.beginPath();
//     plotnoCtx.moveTo(x, y);
//     let yTrojkata = y + 30
//     plotnoCtx.lineTo(x, y + 30);
//     plotnoCtx.stroke();
//     plotnoCtx.beginPath();
//     plotnoCtx.moveTo(x, yTrojkata);
//     plotnoCtx.fill();
// }