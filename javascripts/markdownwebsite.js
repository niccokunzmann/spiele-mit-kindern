/** loading js and css files
 * http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
 * 
 */

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", filename);
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

// jQuery
loadjscssfile("http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", "js");
// showdown.js 
loadjscssfile("http://markdowntohtml.com/showdown.js", "js");
// change the markdown body to html
loadjscssfile("/javascripts/changethewebsite.js", "js");

/** 
 * 
 * 
 */

