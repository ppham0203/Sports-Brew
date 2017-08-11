$("#buttonsearch").on("click", function() {
  // $("#").empty();
  var userInput = $("#search_key").val().trim();

  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInput + "&countryCode=US&apikey=8Tvqs6GD3WAR3yzGQutUM67fbguu78VT";
  
  $.ajax({
        url: queryURL,
        methond: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(response._embedded.events[14]._embedded.venues[0].name);

    
  for (var i = 0; i < 20; i++) {
  var newDiv = $("<div class='row'>");
  var divCol1 = $("<div class='gameinfo' class='col-md-6'>");
  var divCol2 = $("<div class='col-md-6'>");

    var name = $("<p class='name'>").text(response._embedded.events[i].name);
    var date = $("<p class='date'>").text(response._embedded.events[i].dates.start.localDate);
    var time = $("<p class='time'>").text(response._embedded.events[i].dates.start.localTime);
    var timeZone = $("<p class='timezone'>").text("Eastern: " + " ");
    var stadium = $("<p class='venue'>").text(response._embedded.events[i]._embedded.venues[0].name);
    var newImage1 = $("<img class='pic' src='" + response._embedded.events[i].images[0].url + "'/>");
    var url = $();

    $(".div").append(newDiv);
    newDiv.append(divCol1);
    divCol1.append(newImage1);
    divCol1.append(name);
    divCol1.append(stadium);
    divCol1.append(date);
    divCol1.append(timeZone);
    divCol1.append(time);
      
console.log(response._embedded.events[i].name);
console.log(response._embedded.events[i].dates.start.localDate);
console.log(response._embedded.events[i].dates.start.localTime);
console.log(timeZone);
console.log(response._embedded.events[i]._embedded.venues[0].name);
}

});

  });