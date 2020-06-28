

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     
//     
//     
//     
//     
      
//     
//     
//     
//     
//     
//     
//     
//     sendResponse({res : "yo"})
//   });
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if(request.message == "start"){
      
      startRecording()
      console.log('activated');
      
    }
    if(request.message == "stop"){
      console.log('deactivated');
      stopRecording()
    }
    sendResponse({farewell: "goodbye"});
   
  });