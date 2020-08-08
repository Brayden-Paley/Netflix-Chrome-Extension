//chrome.storage.local.clear(function() {
//    var error = chrome.runtime.lastError;
//    if (error) {
//        console.error(error);
//    }
//});    

var rows = document.getElementsByClassName("lolomoRow lolomoRow_title_card");
for(var j = 0; j < rows.length; j++){
    var cards = "";
    var i = 0;
    cards = document.getElementById('title-card-' + (j+1) + '-' + 0);
    while(cards != null){

        var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
        //var node = document.createElement('div');
        var titleString = document.createTextNode(titles);
        //cards.append(node);
        //console.log(cards);

        keepValue(cards, titleString);




        i = i + 1;
        cards = document.getElementById('title-card-' + (j+1) + '-' + i);
    }
}

function keepValue(keepCard, keepTitleString){
    //console.log(keepTitleString);
//    chrome.storage.local.get(null, function(items) {
//                    var allKeys = Object.keys(items);
//                    console.log(allKeys);
//                });

    chrome.storage.local.get([keepTitleString.textContent], function(result) {
        //console.log(result[keepTitleString.textContent]);
        if(result[keepTitleString.textContent] == undefined){
            //console.log(result.keepTitleString);
            chrome.storage.local.set({[keepTitleString.textContent]: 1}, function(){
                keepCard.appendChild(keepTitleString);

                //console.log('set a value for ' + titleString.toString());
            });
        } else{
            console.log('title already exists in storage, so we do not display ' + result.key +' again');           
        }
    });
}

//var cards = document.getElementById('title-card-1-0');
//var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
//var text = document.createTextNode(titles);
//cards.appendChild(text);
//var theTitle = titles[0].innerHTML.getAttribute("aria-label");
//console.log(titles);