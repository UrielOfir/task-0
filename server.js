const express = require('express')
var app = express()

app.get('/',function (req,res){
    res.send('Server is up!')
})

app.post('/wavfile',function(req,res){
    
})

app.listen(3000)