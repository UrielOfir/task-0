

// var startButton = document.getElementById("Start")
// var stopButton = document.getElementById("Stop")

// startButton.addEventListener("click",startRecording)
// stopButton.addEventListener("click",stopRecording)



var audioCtx;
var Scriptprocessor;
const THRESHOLD = 1;
var source;
var mediaRecorder;
var rec;
async function openMic(){
    return await navigator.mediaDevices.getUserMedia({audio:true})
}


function audioEvent(event){
  var inputBuffer = event.inputBuffer, outputBuffer = event.outputBuffer;
  var inputData = inputBuffer.getChannelData(0), outputData = outputBuffer.getChannelData(0)
  RMS = rms(inputData)
  if(RMS >= THRESHOLD){
    console.log("audio detected")
    rec.record()
    for(let i = 0; i < inputData.length; i++){
        outputData[i] = inputData[i]
    }
  }
  if(rec.recording && RMS < THRESHOLD){
    eventStopped()
  }
}

function startRecording(){
  console.log("recording")
 
  openMic().then((stream) =>{
    audioCtx = new AudioContext();
    Scriptprocessor = audioCtx.createScriptProcessor(4096,1,1);
    source = audioCtx.createMediaStreamSource(stream);
    
    Scriptprocessor.onaudioprocess = audioEvent
    
    source.connect(Scriptprocessor)
    var outputNode = audioCtx.createMediaStreamDestination();
    Scriptprocessor.connect(outputNode)
    rec = new Recorder(Scriptprocessor)
  

  }).catch((e)=>{
      console.log(e)
  }) 
  
}

  
function eventStopped(){
  rec.stop()
  //rec.exportWAV(createDownloadLink)
  rec.clear()
  console.log("event detected")

  rec = new Recorder(Scriptprocessor)
  
 
}


function stopRecording(){
  //stopButton.disabled = true
  source.disconnect(Scriptprocessor)
  rec.stop()
  audioCtx.close()
  console.log("stopped")
  //startButton.disabled = false
}
 
// function createDownloadLink(blob){
//   const url = URL.createObjectURL(blob)
//   const au = document.createElement('audio')
//   const li = document.createElement('li')
//   const link = document.createElement('a')  
//   const filename = new Date().toISOString() 
//   au.controls = true;
//   au.src = url
//   link.href = url
//   link.download = filename+".wav"
//   chrome.downloads.download({
//     url:url,
//     filename: link.download
//   })
//   link.innerHTML = "Save to Disk"
//   li.appendChild(au);  
//   li.appendChild(document.createTextNode(filename+".wav "))
//   li.appendChild(link);
//   li.appendChild(document.createTextNode (" "))
//   recordingsList.appendChild(li);

// }

function rms(timeSlice){
  if(timeSlice){
    let Squares = timeSlice.map((val) => (val * val));
    let Sum = Squares.reduce((acum, val) => (acum + val))
    Mean = Sum / Array.length
    return Math.sqrt(Mean)
  }
  return 0
  
}




