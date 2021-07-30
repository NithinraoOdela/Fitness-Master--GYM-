const express = require("express")
const path = require("path")
const fs = require("fs");
const { clearLine } = require("readline");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost:27017/services', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;



const servicesSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Phone: String,
    Age: String,
    Male: String,
    Female: String,
    location: String
  });
const services = mongoose.model('services', servicesSchema);

app.use("/static", express.static("static"))
app.use(express.urlencoded())


app.set("view engine", "html")
app.set("views", path.join(__dirname, "views")) 

app.get("/views/index.html", (req, res)=>{
    const con = "this is html"
    const params ={"title":"html is the bes", "content": con}
    res.status(200).render("index.html", params)
})
app.get("/views/fitness.html", (req, res)=>{
    const con = "this is html"
    const params ={"title":"html is the bes", "content": con}
    res.status(200).render("fitness.html", params)
})
app.get("/views/services.html", (req, res)=>{
    const params = { }
    res.status(200).render("services.html", params)
})
app.post("/views/services.html", (req, res)=>{
    var myData = new services(req.body);
    myData.save().then(()=>{
        res.send("Details has been saved to data file")

    }).catch(()=>{
        res.status(400).send("not saved")
    });
    
    
})
app.get("/views/", (req, res)=>{
    const con = "this is html"
    const params ={"title":"html is the bes", "content": con}
    res.status(200).render("contact.html", params)
})



app.post("/", (req, res)=>{
    Name = req.body.Name
    Email = req.body.Email 
    Password = req.body.Password
    Phone = req.body.Phone
    Age = req.body.Age 
    Male = req.body.Male
    Female = req.body.Female
    location = req.body.location

    let out=
   `Name of client = ${Name},
    Email of client = ${Email},
    Password of client = ${Password},
    Phone of client = ${Phone},
    Age of client = ${Age},
    Gender of client = ${Male},
    Gender of client = ${Female},
    location of client = ${location},

     ----------------------------------------------------------------------------------------------------------------------------------------
     ` 

    

    fs.appendFileSync("output.txt", out)
    console.log(req.body)
    const params ={"message":"Your form has been saved succesfully"}
    res.status(200).render("services.html", params)
})


app.listen(port, ()=>{
    console.log("Building a server page")
})
 