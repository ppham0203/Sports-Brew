var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['store']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
=======
function search() {
    $(".div").empty();
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
            var box = $("<div class='infobox' class='gameinfo'>");
            var divCol1 = $("<div>");
            divCol1.addClass("col-md-4");
            var divCol2 = $("<div class='col-md-4'>");
            var divCol3 = $("<div class='col-md-4' id='map-canvas'>");
            var name = $("<p class='name'>").text(response._embedded.events[i].name);
            var eventDate = (response._embedded.events[i].dates.start.localDate);
            var eventTime = (response._embedded.events[i].dates.start.localTime);
            var timeZone = $("<p class='timezone'>").text("Eastern: " + "  ");
            var stadium = $("<p class='venue'>").text(response._embedded.events[i]._embedded.venues[0].name);
            var newImage1 = $("<img class='pic' src='" + response._embedded.events[i].images[4].url + "'/>");
            var urlTix = $("<p><a class='tix' href='" + response._embedded.events[i].url + "'>Get Tickets!</a></p>");
            var map = $('<iframe width="305" height="203" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=' + location + '&key=AIzaSyBbNS_dqTDm6hDfSP6MpPWeiwGJTuo0Qto" allowfullscreen></iframe>');

            var formattedDate = new Date(eventDate);
            var mm = formattedDate.getMonth() + 1;
            var dd = formattedDate.getDate();
            var yyyy = formattedDate.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            };
            if (mm < 10) {
                mm = '0' + mm
            };
            var formattedDate = mm + '/' + dd + '/' + yyyy;
            var date = $("<p class='date'>").text(formattedDate);

            function timeTo12HrFormat(time) {
                // Take a time in 24 hour format and format it in 12 hour format
                var time_part_array = time.split(":");

                if (time_part_array[0] > 12) {
                    time_part_array[0] = time_part_array[0] - 12;
                }

                formatted_time = time_part_array[0] + ':' + time_part_array[1] + " ";

                return formatted_time;
            }

            var time = timeTo12HrFormat(eventTime);

            $(".div").append(newDiv);
            newDiv.append(box);
            box.append(divCol1);
            box.append(divCol2);
            box.append(divCol3);

            divCol1.append(newImage1);
            divCol2.append(name);
            divCol2.append(stadium);
            divCol2.append(date);
            divCol2.append(timeZone);
            divCol2.append(time);
            divCol2.append(urlTix);
            divCol3.append(map);

            console.log(response._embedded.events[i].name);
            console.log(response._embedded.events[i].dates.start.localDate);
            console.log(response._embedded.events[i].dates.start.localTime);
            console.log(timeZone);
            console.log(response._embedded.events[i]._embedded.venues[0].name);

            $("input").val("");
        }

    });

}


$("#buttonsearch").on("click", search);

$(document).keypress(function(enter) {
    if (enter.which == 13) {
        search();

    }

});
>>>>>>> c0d14695dfca00a85fffbc00e1916fcf1140d3c8
