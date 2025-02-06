let express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
let app = express()
let config = require("./config")
const path = require('path');
const session = require("express-session");

let port = config.port || 5003

app.use(
    session({
      secret: "your_secret_key", // Replace with a strong secret key
      resave: false, // Save session only if it is modified
      saveUninitialized: false, // Don't save uninitialized sessions
      cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // Adjust cookie options as needed
    })
  );



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For application/json

app.get("/",(req,res)=>{

  res.send("this are website")
})

app.get("/admin",(req,res)=>{
    res.render("login",{title :"login page"})
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
            


let router = require("./adminroutes")
app.use(router)


let apirouter = require("./apiroutes")
app.use(apirouter)

    
app.use((req, res, next) => {
  console.log(req.url)
  // const originalSend = res.json; // Backup original res.json

  // res.json = function (data) {  // Overriding res.json
  //     console.log("API Response:", JSON.stringify(data, null, 2)); // Log the response
  //     originalSend.call(this, data); // Call the original res.json

  // };

  next();
});        
            



app.listen(port,()=>{
    console.log("server started for port:",port)
})