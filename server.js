var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

var PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log("Server started"); });

