
var rows = document.getElementsByClassName("lolomoRow lolomoRow_title_card");
for(var j = 0; j < rows.length; j++){
    var cards = "";
    var i = 0;
    cards = document.getElementById('title-card-' + (j+1) + '-' + 0);
    while(cards != null){

        var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
        var titleString = document.createTextNode(titles);
        if(cards.id === "title-" + j + "-" + i){
        } else{
            keepValues(cards, titleString);
            cards.setAttribute("id", "title-" + j + "-" + i);
        }

        i = i + 1;
        cards = document.getElementById('title-card-' + (j+1) + '-' + i);
    }
}

function keepValues(keepCard, keepTitleString){
    chrome.storage.local.get([keepTitleString.textContent], function(result) {
        if(result[keepTitleString.textContent] == undefined){
            console.log("everything is undefined :(")
            var data = null;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    var jsonObject = JSON.parse(this.responseText);
                    var data = null;


                    var colour = findColour(jsonObject.rating);
                    var textToAppend = ('IMDb Rating: ' + jsonObject.rating + '/10');
                    keepCard.style.color = colour;
                    keepCard.append(textToAppend);
                    chrome.storage.local.set({[keepTitleString.textContent]: jsonObject.rating}, function(){

                    });
                }
            });
            xhr.open("GET", "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" + keepTitleString.textContent, true);
            xhr.setRequestHeader("x-rapidapi-host", "imdb-internet-movie-database-unofficial.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", "f405d039efmsh195ced3d4de15ffp1f7e62jsnce21185cd8a6");

            xhr.send(data);
            
        } else{
            var colour = findColour(result[keepTitleString.textContent]);
            keepCard.style.color = colour;
            var textToAppend = ('IMDb Rating: ' + result[keepTitleString.textContent] + '/10');
            keepCard.append(textToAppend);
            console.log('title already exists in storage!');           
        }
    });
}

function findColour(rating){
    var colour = "white";
    if(parseFloat(rating) > 7.5){
        colour = "green";
    } else if(parseFloat(rating) > 5.5){
        colour = "yellow";
    } else {
        colour = "red";
    }
    return colour;
}