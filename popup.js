

var startButton = document.getElementById("Start")
var stopButton = document.getElementById("Stop")

startButton.addEventListener("click",startRecording)
stopButton.addEventListener("click",stopRecording)
//feature : add rms tuning to make a desired sensitivity
var audioCtx;
var Scriptprocessor;
var source;
var rec;
var streamSrc;

function startRecording(){
  console.log("Starting")
  startButton.disabled = true
  stopButton.disabled = true;
  navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
    streamSrc = stream;
    console.log("Got Stream from media device")
    
    audioCtx = new AudioContext();
    Scriptprocessor = audioCtx.createScriptProcessor(4096,1,1);
    source = audioCtx.createMediaStreamSource(stream)
    
    Scriptprocessor.onaudioprocess = function(event){
      var inputBuffer = event.inputBuffer;
      var outputBuffer = event.outputBuffer;
      var inputData = inputBuffer.getChannelData(0)
      var outputData = outputBuffer.getChannelData(0)
      if(rms(inputData) > 6){
        for (var sample = 0; sample < inputBuffer.length; sample++) {
          outputData[sample] = inputData[sample]
        }
     
      }
      else{
        console.log("tooo low")
      }
    }
    
   //idea: create new analysis node that allows me to see whats going on at the stream level
   //if stream is not apparent then dont record?
   //tbc
    source.connect(Scriptprocessor)
    rec = new Recorder(Scriptprocessor)
    
    rec.record()
    console.log("Recording started")
  })
  .catch((err)=>{
    console.log(err)
  })
  stopButton.disabled = false
}

  
  
  //load all the recordings to be exported
  //if stopped turn the start button on and disable the stop button

function stopRecording(){
  console.log("stopButton clicked");
  //console.log(Scriptprocessor)
  stopButton.disabled = true
  source.disconnect(Scriptprocessor)
  rec.stop()
  streamSrc.getAudioTracks()[0].stop()
  rec.exportWAV(createDownloadLink)
  startButton.disabled = false


}
 
function createDownloadLink(blob){
  var url = URL.createObjectURL(blob)
  var au = document.createElement('audio')
  var li = document.createElement('li')
  var link = document.createElement('a')

  var filename = new Date().toISOString()

  au.controls = true;
  au.src = url
  link.href = url
  link.download = filename+".wav"
  link.innerHTML = "Save to Disk"
  li.appendChild(au);
	
	//add the filename to the li
	li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	li.appendChild(link);
	


	li.appendChild(document.createTextNode (" "))//add a space in between
	//add the upload link to li

	//add the li element to the ol
	recordingsList.appendChild(li);

}

function rms(timeSlice){
  if(timeSlice){
    let Squares = timeSlice.map((val) => (val * val));
    let Sum = Squares.reduce((acum, val) => (acum + val))
    Mean = Sum / Array.length
    return Math.sqrt(Mean)
  }
  return 0
  
}




