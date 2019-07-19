$(document).ready(function () {

    var cardDeckDiv = $("<div class=\"card-deck\">");
    var availCharsElem = $("#availChars");
    var yourCharElem = $("#yourChar");
    var charName = "";
    var yourStats = [];
    var enemyStats = [];
    var enemiesElem = $("#enemies");
    var fightElem = $("#fight");
    var attackElem = $("#attack");
    var myAttackElem = $("#myAttack");
    var thierAttackElem = $("#theirAttack");
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
        $(availCharsElem).append(cardDeckDiv);
        $.each(chars, function (index, key) {
            var cardDiv = $("<div>");
            var cardBodyDiv = $("<div>");
            var cardHeader = $("<h5>");
            var cardImg = $("<img>");
            var cardFooter = $("<p>");
            if (index === 0) {
                $(cardDiv).attr("class", "card text-center mr-1 my-2 bgNormal");
            } else {
                $(cardDiv).attr("class", "card text-center mx-1 my-2 bgNormal");
            }
            $(cardDeckDiv).append(cardDiv);
            $(cardBodyDiv).attr("class", "card-body py-1 px-2");
            $(cardDiv).append(cardBodyDiv);
            $(cardHeader).attr("class", "card-title playerName mb-2");
            $(cardHeader).text(key.name);
            $(cardBodyDiv).append(cardHeader);
            $(cardImg).attr({
                src: key.img,
                class: "card-img-top playerImg rounded",
                alt: key.name + " image was supposed to go here."
            });
            $(cardBodyDiv).append(cardImg);
            $(cardFooter).attr("class", "card-title playerHP mt-2 mb-0");
            $(cardFooter).text("hp: " + key.hp);
            $(cardBodyDiv).append(cardFooter);
        })
    }
    generateChars();

    var charElems = $.makeArray($(".card"));

    function removeChar(value) {
        $(value).detach();
        if ($(value).hasClass("mx-1")) {
            $(value).removeClass("mx-1");
        }
    }

    function resetCardMargin(value) {
        if ($(value).hasClass("mx-1")) {
            $(value).removeClass("mx-1").addClass("mr-1");
        }
    }

    function resetCardDeckMargin(index, value) {
        if (index === 0) {
            resetCardMargin(value);
        }
    }

    function changeBGColor(value) {
        $(value).removeClass("bgNormal").addClass($(value).parent().parent().attr("data-bgColor"));
    }

    function charStats(charName, stats) {

    }

    function getStats(val, stats) {
        charName = $(val).children().children(".playerName").text();
        stats = $.grep(chars, function (match) {
            return match.name === charName
        })
        return stats
    }

    $(charElems).each(function (index, value) {
        $(value).on("click", function () {
            var newCardDeckDiv = $("<div class=\"card-deck\">");
            if ($("#availChars .card-deck").length > 0) {
                $(availCharsElem).css("display", "none");
                yourStats = getStats(value);
                console.log("ys1: ", yourStats);
                removeChar(value);
                $(yourCharElem).append(newCardDeckDiv);
                $(newCardDeckDiv).append(value);
                $(cardDeckDiv).detach();
                $(enemiesElem).append(cardDeckDiv);
                $("#enemies .card-deck .card").each(function (index, value) {
                    changeBGColor(value);
                    resetCardDeckMargin(index, value);
                })
            } else if ($("#enemies .card").length > 0 && $("#fight .card").length === 0) {
                removeChar(value);
                enemyStats = getStats(value);
                console.log("es1: ", enemyStats);
                $(fightElem).append(newCardDeckDiv);
                $(newCardDeckDiv).append(value);
                if ($("#enemies .card").hasClass("mx-1")) {
                    $("#enemies .card").removeClass("mx-1").addClass("mr-1");
                }
                resetCardMargin(value);
                changeBGColor(value);
            }
        })
    })

    $(attackElem).on("click", function () {
        if (!$("#yourChar .card").length) {
            alert("You must choose a character first!")
        } else {
            if (!$("#fight .card").length) {
                $("myAttack").text("No enemy to attack");
                $("theirAttack").text("");
            } else {

            }
        }
    })

})