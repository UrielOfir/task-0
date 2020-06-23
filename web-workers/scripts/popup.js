import Recorder from "lib/recorder.js";



const analyser

async function _init_(){
 const stream = await navigator.mediaDevices.getUserMedia({audio:true})
 const audioCtx = new AudioContext();
 analyser = audioCtx.createAnalyser();
 audioCtx.createMediaStreamSource(stream).connect(analyser)
 analyze(stream);
}

var refresh = setInterval((analyser,buffer) => {
  analyser.getByteFrequencyData(buffer)
    if(threshold(buffer) && !rec.recording()){
        recordingData.push(buffer)
    }
    if(!threshold(buffer && rec.recording()){
      clearInterval(rerfresh)
    }
}, 10);


function analyze(stream){
  if(AnalyserNode){
    const analyserStreamBuffer = new Uint8Array(analyser.fftSize);
  }
  var recordingData = []
  refresh(analyser,analyserStreamBuffer)
  

  function threshold(data){
    const THRESHOLD = 100
    if(rms(data) >= THRESHOLD){
      return true
    }
    return false
  }

  function build(data){
    
  }
  var



  function rms(timeSlice){
    let Squares = timeSlice.map((val) => (val * val));
    let Sum = Squares.reduce((acum, val) => (acum + val))
    Mean = Sum / Array.length
    return Math.sqrt(Mean)
  }

  function _main_(){
    //turn button off
    var recording = await _init_();
    //turn button on
    //export recording 
   }


}



