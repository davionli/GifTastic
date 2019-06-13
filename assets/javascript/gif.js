var farm = ["dog", "cat", "horse", "duck", "chicken", "elephant", "panda", "tiger", "lion", "kangaroo", "giraffe", "jellyfish", "cow", "rabbit", "dragon", "snake", "sheep", "pig"];
$(document).ready(function() {
    postButton();
    $("#animalGifsContainer").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-move"));
              $(this).attr("data-state", "move");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
    })
    function postButton() {
        $(".animalFamily").empty();
        for (var i = 0; i < farm.length; i++) {
            var a = $("<button>");
            a.addClass("animalBtn btn btn-outline-dark");
            a.attr("data-name", farm[i]);
            a.text(farm[i]);
            $(".animalFamily").append(a);
        }
    
        $(".animalBtn").on("click", function() {
            var name = $(this).attr("data-name");
            var api_key = "4O9aQzYORGqb22cBeKdYlUDmpSVRkZFf";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + api_key + "&limit=15";
            $(".animalGifs").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response){
                for (var i = 0; i < response.data.length; i++){
                    var imgDiv = $("<div>");
                    var rate = $("<p>");
                    var gif = $("<img>");
                    var stillSrc = response.data[i].images.fixed_height_still.url;
                    var moveSrc = response.data[i].images.fixed_height.url
                    rate.text(`Rating: ${response.data[i].rating}`);
                    gif.attr("src", stillSrc);
                    gif.attr("data-still", stillSrc);
                    gif.attr("data-move", moveSrc);
                    gif.attr("data-state", "still");
                    gif.addClass("gif");
                    imgDiv.attr("class", "imgDiv");
                    imgDiv.append(gif).append(rate);
                    imgDiv.prependTo($(".animalGifs"));
                }
            });   
            
        })

    }
    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        if ($("#animal-input").val() !== "" && farm.indexOf($("#animal-input").val()) === -1)
            farm.push($("#animal-input").val());
        console.log(farm);
        postButton();
    })
    $("#clear").on("click", function() {
        $(".animalGifs").empty();
    })
       
});
        