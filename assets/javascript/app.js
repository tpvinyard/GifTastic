const topics = ['corgi', 'wolf'];

for (let i=0; i < topics.length; i++) {
    $("#buttons").append(`<button data-dog='${topics[i]}'>${topics[i]}</button>`);
}

$("button").on("click", function() {
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
            dogImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(h4);
            gifDiv.append(dogImage);

            $("#images").append(gifDiv);
        }
    })
})

// $("button").on("click", function() {
//     let person = $(this).attr("data-person");
//     queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       person + "&api_key=dc6zaTOxFJmzC&limit=10";
// ​
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       .then(function(response) {
//         var results = response.data;
// ​
//         for (var i = 0; i < results.length; i++) {
//           var gifDiv = $("<div>");
// ​
//           var rating = results[i].rating;
// ​
//           var p = $("<p>").text("Rating: " + rating);
// ​
//           var personImage = $("<img>");
//           personImage.attr("src", results[i].images.fixed_height.url);
// ​
//           gifDiv.prepend(p);
//           gifDiv.prepend(personImage);
// ​
//           $("#gifs-appear-here").prepend(gifDiv);
//         }
//       });
//   });

// $("#cat-button").on("click", function() {
//   let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=CirucykHGzeIGsP6elqaIVUsqTllQ1OG&tag=cats";
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     .then(function(response) {
//       var imageUrl = response.data.image_original_url;
//       var catImage = $("<img>");
//       catImage.attr("src", imageUrl);
//       catImage.attr("alt", "cat image");
//       $("#images").prepend(catImage);
//     });
// });