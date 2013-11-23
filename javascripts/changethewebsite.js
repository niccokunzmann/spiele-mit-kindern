
/** change the content of the body tag from
 * http://markdowntohtml.com/
 * 
 */
 
var headerString = '<div class="wrapper"><header>      <h1 class="title">Spiele-mit-kindern</h1>    </header>    <div id="container">      <p class="tagline">Dieser Workshop bringt Dir bei, Pong zu programmieren</p>      <div id="main" role="main">        <div class="download-bar">        <div class="inner">          <a href="https://github.com/niccokunzmann/spiele-mit-kindern/tarball/master" class="download-button tar"><span>Download</span></a>          <a href="https://github.com/niccokunzmann/spiele-mit-kindern/zipball/master" class="download-button zip"><span>Download</span></a>          <a href="https://github.com/niccokunzmann/spiele-mit-kindern" class="code">View Spiele-mit-kindern on GitHub</a>        </div>        <span class="blc"></span><span class="trc"></span>        </div>     <article class="markdown-body">';
var footerString = '        </article>      </div>    </div>    <footer>      <div class="owner">      <p><a href="https://github.com/niccokunzmann" class="avatar"><img src="https://0.gravatar.com/avatar/b93aaf7984fffe337b7bca2e4eae2fee?d=https%3A%2F%2Fidenticons.github.com%2F1b3dc4ef7905206844273655e3a730e6.png&amp;r=x&amp;s=60" width="48" height="48"/></a> <a href="https://github.com/niccokunzmann">niccokunzmann</a> maintains <a href="https://github.com/niccokunzmann/spiele-mit-kindern">Spiele-mit-kindern</a></p>      </div>      <div class="creds">        <small>This page generated using <a href="http://pages.github.com/">GitHub Pages</a><br/>theme by <a href="https://twitter.com/jonrohan/">Jon Rohan</a></small>      </div>    </footer>  </div>  <div class="current-section">    <a href="#top">Scroll to top</a>    <a href="https://github.com/niccokunzmann/spiele-mit-kindern/tarball/master" class="tar">tar</a><a href="https://github.com/niccokunzmann/spiele-mit-kindern/zipball/master" class="zip">zip</a><a href="" class="code">source code</a>    <p class="name"></p>  </div>    '

// include css
loadjscssfile("/stylesheets/stylesheet.css", "css");
loadjscssfile("/stylesheets/pygment_trac.css", "css");

function changeSourcecode() {
  // http://api.jquery.com/find/
  // http://stackoverflow.com/questions/19362993/how-to-combine-results-of-jquery-find-and-filter
  var allHeadings = $("h1").add($( "h2" )).add($( "h3" )).add($( "h4" )).add($( "h5" ));
  var markdownHeadings = $( "markdown-body" ).find( allHeadings );
  //// http://stackoverflow.com/questions/2402707/how-to-get-all-child-inputs-of-a-div-element-jquery
  allHeadings.each( function (index){
    // http://api.jquery.com/html/
    var innerHtml = $(this).html();
    // http://www.tequilafish.com/2007/12/04/jquery-how-to-get-the-id-of-your-current-object/
    var id = $(this).attr('id');
    $(this).html('<a name="' + id + '" class="anchor" href="#'+ id + '"><span class="octicon octicon-link"></span></a>' + innerHtml);
  });
  loadjscssfile("/javascripts/script.js", "js");
}
alert(1);

readyToChangeTheDocument();
 

