
//establishing our variables
var gifSearch = "";
var gifArray = ["eye roll", "facepalm", "high five", "lol", "okay", "whatever", "oh snap", "bye felicia"];


//function that will eventually return our gif selection
function displayGifs() {
  $("#gifDisplay").empty();
console.log($(this).attr("gif-name"))
var gifSearch = $(this).attr("gif-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=bupDeVHxY04IjX3I84ZkPu1k6WLNdFS0&q=" + gifSearch + "&limit=10&offset=0&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response.data[0]);
  for(i=0; i<response.data.length; i++){
    var gifDiv = $("<div>");
    gifDiv.addClass("col-lg-4 col-md-6 col-sm-6 col-xs-12 center-block text-center pt-3 pb-3")
    var gifImg = $("<img>");
    gifImg.addClass("gif");
    gifImg.attr("src", response.data[i].images.original_still.url);
    gifImg.attr("gifPause", response.data[i].images.original_still.url);
    gifImg.attr("gifPlay", response.data[i].images.original.url);
    gifImg.attr("rating", response.data[i].rating);
    gifImg.attr("state", "pause");
    gifImg.attr("width", 240);
    gifDiv.html("Rating: " + response.data[i].rating + "<br>");
    gifDiv.append(gifImg);
    $("#gifDisplay").append(gifDiv);
  }
  
});

$(document).on("click", ".gif", function() {
  console.log($(this).attr("gifPlay"));
  console.log($(this).attr("gifPause"));
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "pause") {
    $(this).attr("src", $(this).attr("gifPlay"));
    $(this).attr("state", "play");
    console.log($(this));
  } else {
    $(this).attr("src", $(this).attr("gifPause"));
    $(this).attr("state", "pause");
    console.log($(this));
  }
});

}

function generateButtons() {
  $("#gifButtons").empty();
//for loop to generate our buttons with class and attributes that we can call on later to pass to the API
  for (var i = 0; i < gifArray.length; i++) {
    var btn = $("<button>");
    btn.addClass("gif-btn");
    btn.addClass("btn-primary");
    btn.addClass("ml-1")
    btn.addClass("mr-1")
    btn.addClass("mb-1")
    btn.addClass("mt-1")
    btn.attr("gif-name", gifArray[i]);
    btn.text(gifArray[i]);
    //append our new element, with it's class and attributes, to the button div
    $("#gifButtons").append(btn);
  }
}

$("#btn-add").on("click", function(event)
{
  //keep the submit from loading the next page
  event.preventDefault();
  var gif = $("#buttonInput").val().trim();

  gifArray.push(gif);

  generateButtons();
});

$(document).on("click", ".gif-btn", displayGifs);

generateButtons();

