$(window).on("load", sidenVisses);

/* funcktionen starter når siden er loadet
når der trykkes på burgermenuens kryds går den til funktion trykPåMenubutton */
function sidenVisses() {
    console.log("sidenvises");
    $(".menubutton").on("click", trykPåMenubutton);
}

/*funcktionen starter når der trykkes på burgemenuen
funktionen skjuler den midterste streg og viser burgermuens indhold*/
function trykPåMenubutton() {
    console.log("tryk på menubutton");
    $("nav").toggleClass("hidden");
    $(".menubutton").toggleClass("kryds");
}

let modal = document.querySelector("#modal");

/*variabel til indlæsning af retter  */
let retter = [];

/*variabler som viser hvilken egenskab der filtreres på */
let kategoriFilter = "alle";

/*starter når DOM-indholdet er loadet */
document.addEventListener("DOMContentLoaded", start);

function start() {
    hentJson();
    forberedFiltrering();
}

function forberedFiltrering() {
    document.querySelectorAll("nav button").forEach(knap => {
        knap.addEventListener("click", () => {


            kategoriFilter = knap.getAttribute("data-menu");
            visRetter();
        });
    });

}



async function hentJson() {
    let jsonData = await fetch("menu1.json");
    retter = await jsonData.json();
    visRetter();
}



function visRetter() {
    // globale variabeler
    let display = document.querySelector(".ret-display");
    let temp = document.querySelector(".ret-template");

    display.textContent = "";

    retter.forEach(ret => {

        if (ret.kategori == kategoriFilter || kategoriFilter == "alle") {
            console.log(ret.kategori, kategoriFilter);

            //lav en klon af template
            let klon = temp.cloneNode(true).content;

            //indsæt data i html
            klon.querySelector("h2").textContent = ret.navn;

            klon.querySelector(".ret-beskrivelse").addEventListener("click", () => {
                visModal(ret);
            });
            klon.querySelector(".ret-beskrivelse").textContent = ret.beskrivelse;
            klon.querySelector(".ret-pris").textContent = ret.pris;



            //placer klon i html
            display.appendChild(klon);
        }
    });
}

function visModal(retten) {

    //ved klik på billedet vises modal vindu med indhold.
    modal.classList.add("vis");
    modal.querySelector(".modal-navn").textContent = retten.navn;
    modal.querySelector(".modal-pris").textContent = retten.pris;
    modal.querySelector(".modal-beskrivelse").textContent = retten.beskrivelse;
    modal.querySelector(".modal-billede").src = "billedemenu/" + retten.billede + ".jpg";
    modal.querySelector(".modal-billede").alt = "Foto af" + retten.navn;

    //ved klik fjernes modal vindu med indholdet.
    modal.querySelector("button").addEventListener("click", skjulModal);

}

function skjulModal() {
    modal.classList.remove("vis");
}
