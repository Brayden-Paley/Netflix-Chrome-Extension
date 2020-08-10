
var rows = document.getElementsByClassName("lolomoRow lolomoRow_title_card");
for(var j = 0; j < rows.length; j++){
    var cards = "";
    var i = 0;
    cards = document.getElementById('title-card-' + (j+1) + '-' + 0);
    while(cards != null){

        var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
        var titleString = document.createTextNode(titles);
                console.log(cards.id);
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
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var jsonObject = JSON.parse(this.responseText);
            //console.log(jsonObject.titles[0].id);

            var data = null;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    var jsonObjectTitle = JSON.parse(this.responseText);
                    var colour = "white";
                    if(parseFloat(jsonObjectTitle.rating) > 7.5){
                        colour = "green";
                    } else if(parseFloat(jsonObjectTitle.rating) > 5.5){
                        colour = "yellow";
                    } else {
                        colour = "red";
                    }
                    var textToAppend = ('IMDb Rating: ' + jsonObjectTitle.rating + '/10');
                    keepCard.style.color = colour;
                    keepCard.append(textToAppend);
                }
            });

            xhr.open("GET", "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" + jsonObject.titles[0].id);
            xhr.setRequestHeader("x-rapidapi-host", "imdb-internet-movie-database-unofficial.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", "f405d039efmsh195ced3d4de15ffp1f7e62jsnce21185cd8a6");

            xhr.send(data);
        }
    });
    //console.log(keepTitleString.textContent);
    xhr.open("GET", "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" + keepTitleString.textContent, true);
    xhr.setRequestHeader("x-rapidapi-host", "imdb-internet-movie-database-unofficial.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "f405d039efmsh195ced3d4de15ffp1f7e62jsnce21185cd8a6");

    xhr.send(data);
}

//function keepValue(keepCard, keepTitleString){
//
//
//    chrome.storage.local.get([keepTitleString.textContent], function(result) {
//        //console.log(result[keepTitleString.textContent]);
//        if(result[keepTitleString.textContent] == undefined){
//            //console.log(result.keepTitleString);
//            chrome.storage.local.set({[keepTitleString.textContent]: 1}, function(){
//                keepCard.appendChild(keepTitleString);
//
//                //console.log('set a value for ' + titleString.toString());
//            });
//        } else{
//            console.log('title already exists in storage, so we do not display ' + result.key +' again');           
//        }
//    });
//}

//console.log(keepTitleString);
//    chrome.storage.local.get(null, function(items) {
//                    var allKeys = Object.keys(items);
//                    console.log(allKeys);
//                });

//var cards = document.getElementById('title-card-1-0');
//var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
//var text = document.createTextNode(titles);
//cards.appendChild(text);
//var theTitle = titles[0].innerHTML.getAttribute("aria-label");
//console.log(titles);