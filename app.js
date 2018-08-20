var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render('index');
});

app.get("/api", function(req, res){
    request('http://rigaux.org/language-study/syntax-across-languages-per-language/'+req.query.language1+'.html', function(err, response, body){
        if(!err && response.statusCode == 200){
            request('http://rigaux.org/language-study/syntax-across-languages-per-language/'+req.query.language2+'.html', function(e, r, b){
                if(!e && r.statusCode == 200){
                    var newBody1 = parseData(body);
                    var newBody2 = parseData(b);
                    res.render('syntax', {data: [newBody1, newBody2], lang: [req.query.language1, req.query.language2]});
                }
            });
        }
    });
});

function parseData(data){
    const $ = cheerio.load(data);
    
    return ($('ul:nth-of-type(2)').html());

}

http.listen(PORT, function () {
	console.log(`Server started on ${ PORT }`);
});
