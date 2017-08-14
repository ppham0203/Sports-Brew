function search() {
    $(".div").empty();
    var userInput = $("#search_key").val().trim();

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInput + "&countryCode=US&apikey=8Tvqs6GD3WAR3yzGQutUM67fbguu78VT";

    $.ajax({
        url: queryURL,
        methond: "GET"
    }).done(function(response) {
        console.log(response);

        for (var i = 0; i < 20; i++) {
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
            var location = (response._embedded.events[i]._embedded.venues[0].name);
            var map = $('<iframe width="305" height="203" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=' + location + 'sportbars&key=AIzaSyBbNS_dqTDm6hDfSP6MpPWeiwGJTuo0Qto" allowfullscreen></iframe>');

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
            var formattedDate = mm + '/' + dd + '/' + yyyy;
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
            divCol3.append(map);

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