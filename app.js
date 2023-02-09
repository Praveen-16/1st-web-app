const express =require("express")
const bodyParser =require("body-parser")
const request = require("request");
const { json } = require("body-parser");
const https = require("https")


const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email
    
    var data ={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fileds:{
                FNAME: firstName,
                LNAME:lastName
            }
        }]
    }

    const jsonData =JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/5af0ff3755";

    const Options ={
        method:"POST",
        auth:"praveen:f51d68e73b239b6e2d4ef38f65485afe-us21"
    }
    const request = https.request(url,Options, function(response){
       if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")

       }else{
        res.sendFile(__dirname + "/failure.html")
       }
    })

   request.write(jsonData);
   request.end();
})

app.listen(process.env.PORT || 3000, function(){
    console.log("port 3000 is runing")
})

//api key : f51d68e73b239b6e2d4ef38f65485afe-us21

//id 5af0ff3755