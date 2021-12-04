// W tym pliku przechowywany jest kod, który nie jest nigdzie potrzebny. \\

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