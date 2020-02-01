var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('static'))

app.get("/", function (request, response){
    response.render("index");
});


app.get("/mode/:mode", function (request, response){
    response.render("index", {app_mode: request.params.mode});
});

http.createServer(app).listen(process.env.PORT || 3000)