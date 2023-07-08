const express = require('express');
const bodyParser = require('body-parser');
const https=require('https');
const request=require('request');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post('/',function(req,res){
    const firstName=req.body.firstName; 
    const lastName=req.body.lastName;
    const mobileNumber=req.body.mobileNumber;
    const emailAddress=req.body.emailAddress;
    const data={
        members:[
            {
                email_address:emailAddress,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                    
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);

    const options={
        method:'POST',
        auth:'hashim:ef84b4d0518632a263da309b6ca85c64-us13'
    }

    var url='https://us13.api.mailchimp.com/3.0/lists/67023b7dd2';
    const request=https.request(url,options,function(resp){
        if(resp.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        resp.on('data',function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();
})
app.post('/failure',function(req,res){
    res.redirect('/')
})


app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log('server is running on');
});


// f3456c02c9810f291618906d7cafd9f4-us13
// unique id = 67023b7dd2
