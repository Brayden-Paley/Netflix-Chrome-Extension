
var rows = document.getElementsByClassName("lolomoRow lolomoRow_title_card");
console.log(rows);
console.log(rows.length);
for(var j = 0; j < rows.length; j++){
    var cards = "";
    var i = 0;
    cards = document.getElementById('title-card-' + (j+1) + '-' + 0);
    while(cards != null){

        var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
        var titleString = document.createTextNode(titles);
        console.log(titleString);
        
        chrome.storage.sync.get([titleString.toString()], function(result) {
            if(typeof result.titleString === "undefined"){
                console.log(titleString);
                chrome.storage.sync.set({titleString: titleString}, function(){
                cards.appendChild(titleString);

                //console.log('set a value for ' + titleString.toString());
                });
            } else{
                console.log('title already exists in storage, so we do not display ' + result.value +' again');           
            }

        });
            
            
        i = i + 1;
        cards = document.getElementById('title-card-' + (j+1) + '-' + i);
    }
}
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
});

//var cards = document.getElementById('title-card-1-0');
//var titles = cards.getElementsByClassName("ptrack-content")[0].innerText;
//var text = document.createTextNode(titles);
//cards.appendChild(text);
//var theTitle = titles[0].innerHTML.getAttribute("aria-label");
//console.log(titles);