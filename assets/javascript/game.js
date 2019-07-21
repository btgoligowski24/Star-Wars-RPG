$(document).ready(function () {

    var yourStats;
    var enemyStats;
    var newAttackPower = 0;
    var chars = [{
        name: "Rey",
        attack: 10,
        counterAttack: 18,
        hp: 130,
        img: "assets/images/rey.jfif"
    }, {
        name: "Luke",
        attack: 12,
        counterAttack: 10,
        hp: 150,
        img: "assets/images/luke.jpg"
    }, {
        name: "Darth Maul",
        attack: 6,
        counterAttack: 20,
        hp: 180,
        img: "assets/images/darthMaul.jpg"
    }, {
        name: "Darth vader",
        attack: 3,
        counterAttack: 24,
        hp: 220,
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
        stats = stats.shift();
        return stats
    }

    function toggleChooseEnemy() {
        var chooseEnemyElem = $("#chooseEnemy");
        if ($(chooseEnemyElem).css("display") === "none") {
            $(chooseEnemyElem).prev().removeClass("mb-0");
            $(chooseEnemyElem).css("display", "block");
        } else {
            $(chooseEnemyElem).prev().addClass("mb-0");
            $(chooseEnemyElem).css("display", "none");
        }
    }

    function pageReload() {
        location.reload();
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
            toggleChooseEnemy();
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
                toggleChooseEnemy();
                if ($("#myAttack").text()) {
                    $("#myAttack").text("");
                }
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
        if (!$("#yourChar .card").length) {
            alert("You must choose a character first!");
        } else {
            if (!$("#fight .card").length) {
                $("#myAttack").text("No enemy to attack");
                $("#theirAttack").text("");
            } else {
                newAttackPower = newAttackPower + yourStats.attack;
                enemyStats.hp = enemyStats.hp - newAttackPower;
                if (enemyStats.hp <= 0) {
                    $("#fight .card").detach();
                    if (!$("#fight .card").length && !$("#enemies .card").length) {
                        $(myAttackElem).text("Game over, you win!!! You are a TRUE JEDI MASTER! Click restart to Cosplay someone else.");
                        $(thierAttackElem).text("");
                        $("#restart").text("Restart");
                        $("#restart").css("display", "block");
                    } else {
                        $(myAttackElem).text("You have defeated " + enemyStats.name + ", you can choose another enemy to fight now.");
                        $(thierAttackElem).text("");
                    }
                } else {
                    yourStats.hp = yourStats.hp - enemyStats.counterAttack;
                    $("#yourChar .playerHP").text("hp: " + yourStats.hp);
                    $("#fight .playerHP").text("hp: " + enemyStats.hp);
                    $(myAttackElem).text("You attacked " + enemyStats.name + " for " + newAttackPower + " damage.");
                    $(thierAttackElem).text(enemyStats.name + " attacked you back for " + enemyStats.counterAttack + " damage.");
                    if (yourStats.hp <= 0) {
                        $(myAttackElem).text("Jedi Master, you are not! Back to training with Yoda, you shall go. Come back after you have mastered the ways of The Force!");
                        $(thierAttackElem).text("");
                        $("#restart").css("display", "block");
                    }
                }
            }

        }
    }

    $($.makeArray($("#availChars .card"))).each(function (index, value) {
        $(value).on("click", charInteraction)
    });

    $("#attack").on("click", attacking);

    $("#restart").on("click", pageReload);
})