let express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
let app = express()
let config = require("./config")
const path = require('path');
const https = require("https");
const fs = require("fs");
const session = require("express-session");
const MongoStore = require('connect-mongo');

let port = config.port || 5003

app.use(
  session({
    secret: process.env.PROJECT_NAME || 'your-secret-key', // Secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:  process.env.DB, // Apna DB URL dalein
      collectionName: "sessions",
    }),
    cookie: {
      secure: true, // Agar HTTPS use nahi kar rahe to false rakhein
      httpOnly: true, // Browser ko JS se access na karne de
      maxAge: 1000 * 60 * 60 * 6, // 6 ghante tak session valid rahega
    },
  })
);


  const sslOptions = {
    key: fs.readFileSync("/var/www/httpd-cert/aksasoftware.com_2024-10-13-11-36_59.key"),
    cert: fs.readFileSync("/var/www/httpd-cert/aksasoftware.com_2024-10-13-11-36_59.crt"),
};


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
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", ], // ✅ Add "country_id"
  })
);


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  const  protectedRoutes = [
"/admin/login",
"/admin/dashboard",
"/admin/userlist",
"/admin/profile",
"/admin/category",
"/admin/subcategory",
"/admin/subcategorylist",
"/admin/categorylist",
"/admin/product",
"/admin/specifications/color",
"/admin/specifications/size",
"/admin/specifications/finish",
"/admin/specifications/material",
"/admin/specifications/thickness",
"/admin/specifications/room",
"/admin/specifications/type",
"/admin/specifications/print",
"/admin/specifications/usage",
"/admin/productgroups",
"/admin/brands",
"/admin/units",
"/admin/productlist",
"/admin/page",
"/admin/bannersadd",
"/admin/header",
"/admin/aboutdeliveries",
"/admin/offersforuser",
"/admin/slidbars",
"/admin/imagesforuser",
"/admin/websitepopup",
"/admin/coupens",
"/admin/users",
// /admin/users (duplicate, one might be user details)
"/admin/categories/view/:categoryId",
"/admin/subcategories/view/:subcategoryId",
"/admin/product/view/:productId",
"/admin/allorders",
"/admin/user-details/:id",
"/admin/orders/:id",
"/admin/orders/track/:id",
];

if (protectedRoutes.some(route => route == req.path)) {
  if (!req.session || !req.session.admin) {
      return res.redirect("/"); 
  } else {
      try {
          const decodedToken = jwt.verify(req.session.admin.token, process.env.JWT_SECRET);
          // const expiryTime = new Date(decodedToken.exp * 1000);
          // const remainingTime = (decodedToken.exp * 1000) - Date.now();

          // console.log("Token is valid. Expiry Time:", expiryTime.toLocaleString());
          // console.log("Token will expire in:", remainingTime / 1000, "seconds");

      } catch (err) {
          console.error("Token expired or invalid:", err.message);
          return res.redirect("/"); 
      }
  }
}
next();

});



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
            



// app.listen(port,()=>{
//     console.log("server started for port:",port)
// })

// Create HTTPS Server
app.use((req)=>{
  console.log(req.url)
})
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS Server started on port ${port}`);
});