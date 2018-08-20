var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var fs = require('fs');
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Commented because only need to run it when there is an update in the original website
//  function createBackups(){
//      request('http://rigaux.org/language-study/syntax-across-languages-per-language/', function(err, response, body){
//          if(!err && response.statusCode == 200){
//              var titles = parseTitles(body);
//              console.log(titles);
//              for(var i=0; i<titles.length-4; i++){
//                  var currentTitle = titles[i];
//                  getRessource(currentTitle);
//              }
//          }
//      });
//  }
//  
//  function getRessource(title){
//      request('http://rigaux.org/language-study/syntax-across-languages-per-language/'+title+'.html', function(e, r, b){
//          if(!e && r.statusCode == 200){
//              
//              var newBody = parseData(b);
//              fs.writeFile('data/'+title+'.html', b, function(err){
//                 if(err) throw err;
//                  console.log(title + ' saved');
//              });
//          }
//      });
//  
//  }

app.get("/", function(req, res){
    fs.readFile('data/languages.html', 'utf8', function(err, body){
        if(!err){
            var titles = parseTitles(body);
            res.render('index', {titles: titles});
        }
    });
});

app.get("/api", function(req, res){
    fs.readFile('data/'+req.query.language1+'.html', 'utf8', function(err, body){
        if(!err){
            fs.readFile('data/'+req.query.language2+'.html', 'utf8', function(e, b){
                if(!e){
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

function parseTitles(data){
    const $ = cheerio.load(data);
    var titles = [];
    $('li a').each(function(){
        var str = $(this).html();
        str = str.replace(/\s/g, '');
        titles.push(str);
    });

    return titles;
}

http.listen(PORT, function () {
	console.log(`Server started on ${ PORT }`);
});
