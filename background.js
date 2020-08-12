chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(tab.url === "https://www.netflix.com/browse"){
        setInterval(function(){
            chrome.tabs.executeScript(null, {file: "main.js"});
        }, 2000);
    }
});