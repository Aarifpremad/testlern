const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();
const config = require("./config");
const port = config.port || 5003;

// SSL Certificate Paths
// const sslOptions = {
//     key: fs.readFileSync("/var/www/httpd-cert/aksasoftware.com_2024-10-13-11-36_59.key"),
//     cert: fs.readFileSync("/var/www/httpd-cert/aksasoftware.com_2024-10-13-11-36_59.crt"),
// };

// Session Middleware
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, maxAge: 1000 * 60 * 60 },
    })
);

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Routes
app.get("/", (req, res) => {
    res.render("login", { title: "Login Page" });
});

const router = require("./adminroutes");
app.use(router);

const apirouter = require("./apiroutes");
app.use(apirouter);

// Create HTTPS Server
app.listen(port,()=>{
    console.log("server started for port:",port)
})
