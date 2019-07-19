$(document).ready(function () {

    var availCharsElem = $("#availChars");
    var yourCharElem = $("#yourChar");
    var enemiesElem = $("#enemies");
    var fightElem = $("#fight");
    var chars = [{
        name: "Rey",
        attack: 6,
        counterAttack: 20,
        hp: 100,
        img: "assets/images/rey.jfif"
    }, {
        name: "Luke",
        attack: 8,
        counterAttack: 25,
        hp: 150,
        img: "assets/images/luke.jpg"
    }, {
        name: "Darth Maul",
        attack: 10,
        counterAttack: 25,
        hp: 200,
        img: "assets/images/darthMaul.jpg"
    }, {
        name: "Darth vader",
        attack: 12,
        counterAttack: 30,
        hp: 250,
        img: "assets/images/darthVader.jfif"
    }];

    function generateChars() {
        var cardDeckDiv = $("<div>");
        $(cardDeckDiv).attr("class", "card-deck my-2");
        $(availCharsElem).append(cardDeckDiv);
        $.each(chars, function (index, key) {
            console.log("index: ", index);
            console.log("key: ", key);
            var cardDiv = $("<div>");
            var cardBodyDiv = $("<div>");
            var cardHeader = $("<h5>");
            var cardImg = $("<img>");
            var cardFooter = $("<p>");
            if (index === 0) {
                $(cardDiv).attr("class", "card text-center mr-1 bgNormal");
            } else {
                $(cardDiv).attr("class", "card text-center mx-1 bgNormal");
            }
            $(cardDeckDiv).append(cardDiv);
            $(cardBodyDiv).attr("class", "card-body py-1 px-2");
            $(cardDiv).append(cardBodyDiv);
            $(cardHeader).attr("class", "card-title playerName mb-2");
            $(cardHeader).text(key.name);
            $(cardBodyDiv).append(cardHeader);
            $(cardImg).attr({
                src: key.img,
                class: "card-img-top playerImg",
                alt: key.name + " image was supposed to go here."
            });
            $(cardBodyDiv).append(cardImg);
            $(cardFooter).attr("class", "card-title playerHP mt-2 mb-0");
            $(cardFooter).text(key.hp);
            $(cardBodyDiv).append(cardFooter);
        })
    }
    generateChars();
})