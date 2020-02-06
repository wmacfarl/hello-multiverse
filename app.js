//import db from './static/src/db/database.js';

//console.log(require.resolve('./static/src/db/database.js'));
import express from 'express';
import http from 'http';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const __dirname = path.resolve();
var app = express();
var app_modes = ["map-editor", "screen-editor", "code-editor", "sprite-editor", "tile-editor", "music-editor"]

//db.op

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('static'))

app.get("/", function (request, response){
    response.render("index", {app_modes: app_modes});
});


app.get("/mode/:mode", function (request, response){
    response.render("index", {app_mode: request.params.mode, app_modes: app_modes});
});

http.createServer(app).listen(process.env.PORT || 3000)