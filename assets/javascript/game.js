//Kristin

var arr = [];
var userInput = "";

function fullSearch(){
  userInput = $("#search_key").val().trim();
  search();
}

function search() {
    $(".div").empty();
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInput + "&classificationName=sports&countryCode=US&apikey=8Tvqs6GD3WAR3yzGQutUM67fbguu78VT";

    //Uses ajax to pull events from TicketMaster API
    $.ajax({
        url: queryURL,
        methond: "GET"
    }).done(function(response) {
        console.log(response);

        //Anthony
        //Input user validation

        if (!response || !response._embedded || !response._embedded.events || !response._embedded.events.length) {
            var newDiv = $("<div class='row'>");
            var box = $("<div class='infobox' class='gameinfo'>");
            $(".div").append(newDiv);
            newDiv.append(box);
            box.append("<h2> No results found for '" + userInput + "'.</h2>");
            box.append("<p> We’re sorry, but we couldn’t find any sporting events for '" + userInput + "'. Please check your spelling and try again. </p>");
            return;
        }
        //Peter/Kristin
        for (var i = 0; i < response._embedded.events.length; i++) {
            arr = response._embedded.events;

            arr.sort(function compare(a, b) {
                var dateA = new Date(a.dates.start.localDate);
                var dateB = new Date(b.dates.start.localDate);
                return dateA - dateB;
            });

            var newDiv = $("<div class='row'>");
            var box = $("<div class='infobox' class='gameinfo'>");
            var divCol1 = $("<div>");
            divCol1.addClass("col-md-4");
            var divCol2 = $("<div class='col-md-4'>");
            var divCol3 = $("<div class='col-md-4' id='map-canvas'>");
            var eventName = (response._embedded.events[i].name);
            var name = $("<p class='name'>").text(response._embedded.events[i].name);
            var eventDate = (response._embedded.events[i].dates.start.localDate);
            var eventTime = (response._embedded.events[i].dates.start.localTime);
            var timeZone = $("<p class='timezone'>").text("Eastern");
            var stadium = $("<p class='venue'>").text(response._embedded.events[i]._embedded.venues[0].name);
            var newImage1 = $("<img class='pic' src='" + response._embedded.events[i].images[4].url + "'/>");
            var urlTix = $("<p><a class='tix' href='" + response._embedded.events[i].url + "'>Get Tickets!</a></p>");
            //Ahmed
            var youTube = $("<p><a class='highlights' href='https://www.youtube.com/results?search_query=" + response._embedded.events[i].name + "' target='_blank'>Watch Past Highlights!</a></p>");
            //Uses the places library for the google API
            var location = (response._embedded.events[i]._embedded.venues[0].name);
            var mapDiv = $("<div class='mapdiv'>");
            var map = $('<iframe width="305" height="203" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=' + location + 'sportbars&key=AIzaSyBbNS_dqTDm6hDfSP6MpPWeiwGJTuo0Qto" allowfullscreen></iframe>');
            var mapText = $("<p class=maptext>Local Sports Bars</p>");

            //Anthony
            var formattedDate = new Date(eventDate);
            var mm = formattedDate.getMonth() + 1;
            var dd = formattedDate.getDate() + 1;
            var yyyy = formattedDate.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            };
            if (mm < 10) {
                mm = '0' + mm
            };

            formattedDate = mm + '/' + dd + '/' + yyyy;
            var date = $("<p class='date'>").text(formattedDate);

            function timeTo12HrFormat(time) {

                if (time == undefined) {
                    return formatted_time = "<p>TBD</p>";
                } else {
                    var time_part_array = time.split(":");

                    if (time_part_array[0] > 12) {
                        time_part_array[0] = time_part_array[0] - 12;
                        formatted_time = "<p>" + time_part_array[0] + ":" + time_part_array[1] + " " + "Eastern</p>";

                        return formatted_time;
                    }
                }
            }

            var time = timeTo12HrFormat(eventTime);
            //Peter/Ahmed
            //For each item of the object creates a repeating box for info
            $(".div").append(newDiv);
            newDiv.append(box);
            box.append(divCol1);
            box.append(divCol2);
            box.append(divCol3);
            divCol1.append(newImage1);
            divCol2.append(name);
            divCol2.append(stadium);
            divCol2.append(date);
            divCol2.append(time);
            divCol2.append(urlTix);
            divCol2.append(youTube);
            divCol3.append(mapDiv);
            mapDiv.append(map);
            mapDiv.append(mapText);

            $("input").val("");
        }

    });

}


$("#buttonsearch").on("click", fullSearch);

$(document).keypress(function(enter) {
    if (enter.which == 13) {
        fullSearch();

    }

});


$(".sports").on("click", function() {
    userInput = $(this).attr("data-name");
    search();

});