$(document).ready(function () {

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        const newBowl = {
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
        const id = $(this).data("id");
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
        const id = $(this).data("id");
        $.ajax("/api/" + id, {
            type: "DELETE",
        }).then(function () {
            console.log("Bowl thrown out");
            location.reload();
        })
    })

});