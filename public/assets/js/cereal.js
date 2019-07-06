$(document).ready(function () {

    // Sets local storage variable only once
    // Must use JSON.parse to convert stored string into boolean
    let backgroundIsSwitched = JSON.parse(window.localStorage.getItem("backgroundIsSwitched"));
    if (backgroundIsSwitched === null || backgroundIsSwitched.length === 0) {
        window.localStorage.setItem("backgroundIsSwitched", JSON.stringify(false));
    };

    // Keeps background choice even after page refresh with CRUD operations
    if (backgroundIsSwitched) {
        $('body').css('background', 'url(/assets/img/background3.jpg)');
    } else {
        $('body').css('background', 'url(/assets/img/background2.jpg) no-repeat center center fixed');
        $("body").css("-webkit-background-size", "cover");
        $("body").css("-moz-background-size", "cover");
        $("body").css("-o-background-size: cover", "cover");
        $("body").css("background-size: cover", "cover");
    };

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        let newBowl = {
            name: $("#new-bowl").val().trim(),
            eaten: false
        };

        $.ajax("/api/new", {
            type: "POST",
            data: newBowl
        }).then(
            function () {
                console.log("New bowl sent to database");
                location.reload();
            }
        );
    });

    $(".eat").on("click", function () {
        let id = $(this).data("id");
        let isEaten = $(this).data("eaten");
        isEaten = !isEaten // Flip the boolean here. Doesn't work on server side

        $.ajax("api/" + id, {
            type: "PUT",
            data: {
                eaten: isEaten
            }
        }).then(function () {
            location.reload();
        });
    });

    $(".delete-bowl").on("click", function () {
        let id = $(this).data("id");
        $.ajax("/api/" + id, {
            type: "DELETE",
        }).then(function () {
            console.log("Bowl thrown out");
            location.reload();
        })
    });

    $("#background-switch").on("click", function() {
        let temp = JSON.parse(window.localStorage.getItem("backgroundIsSwitched"));
        temp = !temp;
        window.localStorage.setItem("backgroundIsSwitched", JSON.stringify(temp));
        if (temp) {
            $('body').css('background', 'url(/assets/img/background3.jpg)');
        } else {
            $('body').css('background', 'url(/assets/img/background2.jpg) no-repeat center center fixed');
            $("body").css("-webkit-background-size", "cover");
            $("body").css("-moz-background-size", "cover");
            $("body").css("-o-background-size: cover", "cover");
            $("body").css("background-size: cover", "cover");
        }
    });

});