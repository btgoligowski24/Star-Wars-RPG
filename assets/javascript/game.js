$(document).ready(function () {

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

    generateChars();

    function generateChars() {
        var cardDeckDiv = $("<div class=\"card-deck\">");
        var availCharsElem = $("#availChars");
        $(availCharsElem).append(cardDeckDiv);
        $.each(chars, makeCards)
    }

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

    function getStats(val, stats) {
        var charName = $(val).children().children(".playerName").text();
        stats = $.grep(chars, function (match) {
            return match.name === charName
        })
        return stats
    }

    function makeCards(index, key) {
        var findCardDeckElem = $(".card-deck")
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
        $(findCardDeckElem).append(cardDiv);
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
    }

    function charInteraction(value) {
        var oldCardDeckDiv = $("#availChars .card-deck");
        var newCardDeckDiv = $("<div class=\"card-deck\">");
        var hideAvailCharsElem = $("#availChars");
        var yourCharElem = $("#yourChar");
        var yourStats = [];
        var enemyStats = [];
        var enemiesElem = $("#enemies");
        var fightElem = $("#fight");
        if ($("#availChars .card-deck").length > 0) {
            $(hideAvailCharsElem).css("display", "none");
            yourStats = getStats(this);
            removeChar(this);
            $(yourCharElem).append(newCardDeckDiv);
            $(newCardDeckDiv).append(this);
            $(oldCardDeckDiv).detach();
            $(enemiesElem).append(oldCardDeckDiv);
            $("#enemies .card-deck .card").each(function (index, value) {
                changeBGColor(value);
                resetCardDeckMargin(index, value);
            })
        }
        if ($(this).parent().parent().attr("id") !== "yourChar" && $(this).parent().parent().attr("id") !== "fight") {
            if ($("#enemies .card").length > 0 && $("#fight .card").length === 0) {
                removeChar(this);
                enemyStats = getStats(this);
                $(fightElem).append(newCardDeckDiv);
                $(newCardDeckDiv).append(this);
                if ($("#enemies .card-deck .card").eq(0).hasClass("mx-1")) {
                    $("#enemies .card-deck .card").eq(0).removeClass("mx-1").addClass("mr-1");
                }
                resetCardMargin(this);
                changeBGColor(this);
            } else {
                alert("You already have an enemy to fight!");
            }
        }
    }

    function attacking() {
        var myAttackElem = $("#myAttack");
        var thierAttackElem = $("#theirAttack");
        var newAttackPower = 0;
        if (!$("#yourChar .card").length) {
            alert("You must choose a character first!");
        } else {
            if (!$("#fight .card").length) {
                $("#myAttack").text("No enemy to attack");
                $("#theirAttack").text("");
            } else {

            }
        }
    }

    $($.makeArray($("#availChars .card"))).each(function (index, value) {
        $(value).on("click", charInteraction)
    })

    $("#attack").on("click", attacking)

})