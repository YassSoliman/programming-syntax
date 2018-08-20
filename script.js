// Before this step need to get the website http://rigaux.org/language-study/syntax-across-languages/Vrs.html 
var syntax = document.evaluate('//tr[contains(., "Python")]', document, null, XPathResult.ANY_TYPE, null);
var titles = document.evaluate('//li[contains(., "Python")]', document, null, XPathResult.ANY_TYPE, null);

var iterator = pythonSyntax.iterateNext();
var titleIterator = titles.iterateNext();

var alertText = 'Python syntax is:\n'
var syntax = {
    python: []
};
// Will output all the syntax part of the website related to python
while(iterator){
        alertText += iterator.querySelector('td').textContent + '\n';
        syntax.python.push(titleIterator.querySelector('a').textContent+' - ' + iterator.querySelector('td').textContent);
        console.log(alertText);
        iterator = pythonSyntax.iterateNext();
        titleIterator = titles.iterateNext();
}
