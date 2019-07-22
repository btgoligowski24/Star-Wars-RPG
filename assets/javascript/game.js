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
        var row1Elem = $("<div>");
        var col1Elem = $("<div>");
        var row2Elem = $("<div>")
        var availCharsElem = $("#availChars");
        $(row1Elem).attr("class", "row row1");
        $(col1Elem).attr("class", "col-xl-7 column1");
        $(row2Elem).attr("class", "row mx-0 mb-2 row2");
        $(availCharsElem).append(row1Elem);
        $(row1Elem).append(col1Elem);
        $(col1Elem).append(row2Elem);
        $.each(chars, makeCards)
    }

    function removeChar(value) {
        $(value).detach();
    }

    function changeBGColor(value) {
        $(value).children().removeClass("bgNormal").addClass($(value).parents().eq(3).attr("data-bgColor"));
    }

    function getStats(val, stats) {
        var charName = $(val).children().children().children(".playerName").text();
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
        var findRow2Elem = $(".row2")
        var col2Elem = $("<div>");
        var cardDiv = $("<div>");
        var cardBodyDiv = $("<div>");
        var cardHeader = $("<h5>");
        var cardImg = $("<img>");
        var cardFooter = $("<p>");
        $(col2Elem).attr("class", "col-xl-3 col-md-4 col-sm-6 p-sm-1 p-md-0 mt-2 column2");
        $(cardDiv).attr("class", "card text-center m-1 mx-md-1 my-md-0 bgNormal");
        $(findRow2Elem).append(col2Elem);
        $(col2Elem).append(cardDiv);
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
        $(cardFooter).text("HP " + key.hp);
        $(cardBodyDiv).append(cardFooter);
    }

    function charInteraction(value) {
        var oldRow1Elem = $("#availChars .row1");
        var row1Elem = $("<div>");
        var col1Elem = $("<div>");
        var row2Elem = $("<div>");
        var hideAvailCharsElem = $("#availChars");
        var yourCharElem = $("#yourChar");
        var enemiesElem = $("#enemies");
        var fightElem = $("#fight");
        $(row1Elem).attr("class", "row row1");
        $(col1Elem).attr("class", "col-xl-7 column1");
        $(row2Elem).attr("class", "row mx-0 mb-2 row2");
        if ($("#availChars .row1").length > 0) {
            $(hideAvailCharsElem).css("display", "none");
            yourStats = getStats(this);
            removeChar(this);
            $("#yourChar h3").attr("class", "mb-0");
            $(yourCharElem).append(row1Elem);
            $(row1Elem).append(col1Elem);
            $(col1Elem).append(row2Elem);
            $(row2Elem).append(this);
            $(oldRow1Elem).detach();
            $(enemiesElem).append(oldRow1Elem);
            toggleChooseEnemy();
            $("#enemies .column2").each(function (index, value) {
                changeBGColor(value);
            })
        }
        if ($(this).parents().eq(3).attr("id") !== "yourChar" && $(this).parents().eq(3).attr("id") !== "fight") {
            if ($("#enemies .column2").length > 0 && $("#fight .column2").length === 0) {
                removeChar(this);
                enemyStats = getStats(this);
                $(fightElem).append(row1Elem);
                $(row1Elem).append(col1Elem);
                $(col1Elem).append(row2Elem);
                $(row2Elem).append(this);
                toggleChooseEnemy();
                if ($("#myAttack").text()) {
                    $("#myAttack").text("");
                }
                changeBGColor(this);
            } else {
                alert("You already have an enemy to fight!");
            }
        }
    }

    function attacking() {
        var myAttackElem = $("#myAttack");
        var thierAttackElem = $("#theirAttack");
        if (!$("#yourChar .column2").length) {
            alert("You must choose a character first!");
        } else {
            if (!$("#fight .column2").length) {
                $("#myAttack").text("No enemy to attack");
                $("#theirAttack").text("");
            } else {
                if (yourStats.hp <= 0) {
                    return
                } else {
                    newAttackPower = newAttackPower + yourStats.attack;
                    enemyStats.hp = enemyStats.hp - newAttackPower;
                    if (enemyStats.hp <= 0) {
                        $("#fight .column2").detach();
                        if (!$("#fight .column2").length && !$("#enemies .column2").length) {
                            $(myAttackElem).text("Game over, you win!!! You are a TRUE JEDI MASTER! Click restart to play as someone else.");
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
    }

    $($.makeArray($("#availChars .column2"))).each(function (index, value) {
        $(value).on("click", charInteraction)
    });

    $("#attack").on("click", attacking);

    $("#restart").on("click", pageReload);
})