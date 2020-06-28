chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.sync.set({number: 1}, function() {
        console.log('The number is set to 1.');
      });
    if (details.reason.search(/install/g) === -1) {
        return
    }
    chrome.browserAction.setIcon({path: 'icons/icon2.png'})
    chrome.tabs.create({
        url: chrome.extension.getURL("welcome.html"),
        active: true
    })
})
titleArr = ["Recording...","Click Me to Record"];
function update() {
    chrome.storage.sync.get('number', function(data) {
      var current = data.number;
      chrome.browserAction.setIcon({path: 'icons/icon' + current + '.png'});
      console.log(titleArr[current -1 ])
      chrome.browserAction.setTitle({
          title : titleArr[current - 1]
      })
     
      if(current == 1){
        
        console.log("hello, looks like we are starting...")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {message: "start"}, function(response) {
            console.log(response.farewell);
          });
        });
      }
      if(current == 2){
        console.log("hello, looks like we are stopping...")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {message: "stop"}, function(response) {
            console.log(response.farewell);
          });
        });
      }
    //   if(current == 1){
    //     console.log("hello?")
  
    //     chrome.runtime.sendMessage({message:"start"},function(response){
    //         console.log(response.res)
    //     })
    // }
    // if(current == 2){
    //      console.log("lets goo")
    //     chrome.runtime.sendMessage({message:"stop"},function(response){
    //         console.log(response.res)
    //     })
    // }
      current++;
      if (current > 2)
        current = 1;
      chrome.storage.sync.set({number: current}, function() {
        console.log('The number is set to ' + current);
      });
    });
  };
  

  
chrome.browserAction.onClicked.addListener(update)


