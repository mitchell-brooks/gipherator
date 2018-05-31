
//establishing our variables
var gifSearch = "";
var gifArray = [];

//initial buttons in array
gifArray = ["Eye roll", "Facepalm", "High five"]

function generateButtons() {
  $("#gifButtons").empty();
//for loop to generate our buttons with class and attributes that we can call on later to pass to the API
  for (var i=0; i < gifArray.length; i++) {
    var btn = $("<button>");
    btn.addClass("gif-btn");
    btn.attr("gif-name", gifArray[i]);
    btn.text(gifArray[i]);
    //append our new element, with it's class and attributes, to the button div
    $("gifButtons").append(btn);
  }
}

$("#btn-add").on("click", function(event)
{
  //keep the submit from loading the next page
  event.preventDefault();
})

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=bupDeVHxY04IjX3I84ZkPu1k6WLNdFS0&q=" + gifSearch + "&limit=10&offset=0&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});