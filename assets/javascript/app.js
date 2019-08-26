$(document).ready(function() {

    const topics = ['corgi', 'wolf'];

    function renderButtons() {
        $("#buttons").empty();
        for (let i=0; i < topics.length; i++) {
            $("#buttons").append(`<button data-dog='${topics[i]}'>${topics[i]}</button>`);
        }

    }

    $("#add-dog").on("click", function(event) {
        event.preventDefault();
        let dogInput = $("#dog-input").val().trim();
        topics.push(dogInput);
        renderButtons();
    });



    $(document).on("click","button", function() {
        $("#images").empty();
        let dog = $(this).attr("data-dog");
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CirucykHGzeIGsP6elqaIVUsqTllQ1OG&q=" + dog + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
                let gifDiv = $("<div>");
                let rating = results[i].rating;
                let h4 = $("<h4>").text(rating);
                let dogImage = $("<img>");
                dogImage.attr("src", results[i].images.fixed_height_still.url);
                dogImage.attr("class", "gif");
                dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                dogImage.attr("data-animate", results[i].images.fixed_height.url);
                dogImage.attr("data-state", "still");

                gifDiv.append(h4);
                gifDiv.append(dogImage);

                $("#images").append(gifDiv);
            }
        })
    })

    $(document).on("click",".gif", function() {

        let state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
    })

    renderButtons();

});