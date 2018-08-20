var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render('index');
});

app.get("/api", function(req, res){
    request('http://rigaux.org/language-study/syntax-across-languages-per-language/'+req.query.language+'.html', function(err, response, body){
        if(!err && response.statusCode == 200){
            var newBody = parseData(body);
            res.render('syntax', {data: newBody, lang: req.query.language});
        }
    });
});

function parseData(data){
    var dom = new JSDOM(data);
    const document = dom.window.document;
    var element = document.querySelectorAll('li');
    console.log(element);
    Array.prototype.forEach.call(element, function(node){
       node.parentNode.removeChild(node);
    });
    return dom.serialize();
}

http.listen(PORT, function () {
	console.log(`Server started on ${ PORT }`);
});
