// Initial array of Celebrities
var celebs = ["Floyd Mayweather", "George Clooney", "Kylie Jenner", "Judy Sheindlin", "Dwayne Johnson", "Lionel Messey", "Ed Sheeran", "Cristiano Ronaldo", "Bruno Mars", "Conor McGregor", "Howard Stern", "Ellen DeGeneres", "LeBron James", "Katy Perry", "Robert Downey Jr.", "Taylor Swift", "Stephen Curry", "Jay-Z", "Ryan Seacrest", "Matt Ryan", "Kim Kardashian West", "Chris Hemsworth", "Sean Combs", "Gordon Ramsay", "Beyonce Knowles", "Matthew Stafford", "Kendrick Lamar", "Jerry Seinfeld", "Kevin Hart"];



// Function to display celeb name
function renderButtons() {

  // Deleting the celebs prior to adding new ones
  $("#buttons-view").empty();

  // Loop through the array of celebs
  for (var i = 0; i < celebs.length; i++) {
    // Dynamically generate buttons for each celeb
    var b = $("<button>");
    b.addClass("celeb");
    b.attr("data-name", celebs[i]);
    b.text(celebs[i]);
    $("#buttons-view").append(b);
  }
}


// Function handles the event of when a button is clicked: prevent form submission, trim the new value, push the new value into the array, call the function to display the new button
$("#add-celeb").on("click", function (event) {
  event.preventDefault();
  var celeb = $("#celeb-input").val().trim();
  celebs.push(celeb);
  renderButtons();
});

renderButtons();


// Event listener for button elements
$("body").on("click", ".celeb", function giftastic() {
  var celebName = $(this).attr("data-name");

  // URL to search Giphy
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    celebName + "&api_key=OSQ8htvC1AtFS3qQjLBX9SXiH3HODMFR&limit=10";

  // Performing AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data comes back from the API
    .then(function (response) {
      // Storing results array
      var results = response.data;
      // Loop for results
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var personImage = $("<img>");
        personImage.attr("class", "gif");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var stateAnimate = results[i].images.fixed_height.url;
        var stateStill = results[i].images.fixed_height_still.url;
        personImage.attr("src", stateAnimate);
        personImage.attr("data-state", "animate");
        personImage.attr("data-animate", stateAnimate);
        personImage.attr("data-still", stateStill);

        gifDiv.append(personImage);
        gifDiv.append(p);

        // Show where the gifs appear
        $("#gifs-appear-here").prepend(gifDiv);

        // Animate
        $(".gif").on("click", function () {
          var state = $(this).attr("data-state");

          if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", stateStill);
          } else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", stateAnimate);
          }
        });

      }

    });




});

