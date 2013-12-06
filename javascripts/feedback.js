
loadjscssfile("stylesheets/feedback.css", "css");
loadjscssfile("javascripts/jquery.blockUI.js", "js");
loadjscssfile("javascripts/jquery.blockUI.js", "js");
loadjscssfile("http://niccokunzmann.pythonanywhere.com/I_am_here.js", "js");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// post to the server
//

function getTheSourceCode() {
  var sourceCode = '<html><head><script type="text/javascript" src="javascripts/markdownwebsite.js"></script></head><body>\r\n\r\n';
  $('.markdown-body').each(function (index) { 
    sourceCode += getMarkdownFromNodes(this.childNodes);
  })
  sourceCode += '\r\n\r\n</body></html>';
  return sourceCode;
};

function saveLocation() {
  // this needs to be modified once there is a online version
  if (document.location.hostname == 'niccokunzmann.github.io') {
    return 'http://niccokunzmann.pythonanywhere.com/repo' + window.location.pathname;
  }
  return document.location;
}

function pullRequestLocation() {
  // this needs to be modified once there is a online version
  if (document.location.hostname == 'niccokunzmann.github.io') {
    return 'http://niccokunzmann.pythonanywhere.com/publish' + window.location.pathname;
  }
  return window.location.origin + '/publish' + window.location.pathname;
}

function createPullRequestOnServer(commitText) {
  var path = pullRequestLocation();
  var params = { 'sourceCode' : getTheSourceCode() , 'comment' : commitText};
  post_to_url(path, params, 'post');
}

function saveTheSourceCodeToServer(comment) {
  var path = saveLocation();
  var params = { 'sourceCode' : getTheSourceCode() , 'comment' : comment};
  post_to_url(path, params, 'post');
}

function post_to_url(path, params, method) {
    // from http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// edit the markdown
//


var selectionEditNodeId = 'i_am_the_selection_edit_node';
var editAreaId = 0;

function editSelection() {
  var nodes = getSelectedNodes();
  viewEdit();
  setupEditArea(nodes);
  hideSelectionEditNode();
}

function saveEditFromDialog() {
  commitText = $('#commitTextArea').val();
  $.unblockUI();
  saveTheSourceCodeToServer(commitText);
}

function saveEdit() {
  viewEdit();
  $.blockUI({ message: '<div class="saveEditDialog"><p>Was ist besser?</p><p><textarea id="commitTextArea"></textarea></p>' +
                       '<a href="javascript:saveEditFromDialog()">fertig! danke!</a><br />' + 
                       '<a href="javascript:$.unblockUI()">nicht speichern, ansehen, zur&uuml;ck.</a>' +
                       '<p>Die gespeicherte Version kann wieder angesehen werden nachdem diese Seite geschlossen wurde.</p></div>'});
}

function createPullRequest() {
  viewEdit();
  $.blockUI({ message: '<div class="createPullRequestDialog"><p>Was ist besser?</p><p><textarea id="pullRequestTextArea"></textarea></p>' +
                       '<a href="javascript:createPullRequestFromDialog()">fertig! danke!</a><br />' + 
                       '<a href="javascript:$.unblockUI()">nicht ver&ouml;ffentlichen, ansehen, zur&uuml;ck.</a>' +
                       '<p>Wenn du es ver&ouml;ffentlicht hast, kann ich die &Auml;nderungen in die Webseite &uuml;bernehmen. Ich danke!</p></div>'});
}

function createPullRequestFromDialog() {
  commitText = $('#pullRequestTextArea').val();
  $.unblockUI();
  createPullRequestOnServer(commitText);
}
  
function viewEdit() {
  $('.liveEditHTMLContent').each(function (index) {
    while (this.childNodes.length > 0) {
      this.parentNode.parentNode.insertBefore(this.removeChild(this.childNodes[0]), this.parentNode);
    }
  });
  $('.editArea').each(function (index) {
    this.parentNode.removeChild(this);
  });
  changeSourcecode();
}

function setupEditArea(nodes) {
  if (nodes.length == 0) { return; };
  editAreaId++;
  id = editAreaId;
  var newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'editArea');
    var liveDiv = document.createElement('div');
    liveDiv.setAttribute('class', 'liveEditHTMLContent');
    newDiv.appendChild(liveDiv);
    var saveChangesDiv = document.createElement('div');
    saveChangesDiv.setAttribute('class', 'saveChanges');
    saveChangesDiv.innerHTML = '<a href="javascript:viewEdit()" class="editMenu">ansehen</a> ' + 
                               '<a href="javascript:saveEdit()" class="editMenu">speichern</a> ' +
                               '<a href="javascript:createPullRequest()" class="editMenu">ver&ouml;ffentlichen</a>';;
    newDiv.appendChild(saveChangesDiv);
    var textarea = document.createElement('textarea');
    textarea.setAttribute('class', 'liveEditTextArea');
    newDiv.appendChild(textarea);
  var update = function() {
    var markdownText = $(textarea).val();
    $(liveDiv).html(markdownToHtml(markdownText));
  };
  // insert the div at the right place
  nodes[0].parentNode.insertBefore(newDiv, nodes[0]);
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    node.parentNode.removeChild(node);
  };
  // set the markdown text
  var markdownText = getMarkdownFromNodes(nodes);
  $(textarea).val(markdownText);
  $(textarea).keyup(update);
  //newDiv.setAttribute('originalMarkdown', escape(markdownText));
  update();
}

function setupSelectionEditNode() {
  // http://www.dustindiaz.com/add-and-remove-html-elements-dynamically-with-javascript/
  var newdiv = document.createElement('div');
  newdiv.setAttribute('id', selectionEditNodeId);
  newdiv.setAttribute('class', 'hiddenEditContainer');
  // https://github.com/niccokunzmann/tannenhof/blob/master/website/drawLine.js
  newdiv.innerHTML = '<a href="javascript:editSelection()" id="editSelectionLink">editieren</a>';
  document.body.appendChild(newdiv);
}

function getSelectionEditNode() {
  if ($('#' + selectionEditNodeId).length == 0) { 
    setupSelectionEditNode(); 
  };
  return $('#' + selectionEditNodeId);
}

function hideSelectionEditNode() {
  getSelectionEditNode().attr('class', 'hiddenEditContainer');
}

function setSelectionEditNodePosition(x, y) {
  var node = getSelectionEditNode();
  var selection = window.getSelection();
  var IwantToEditTheSelectedText = !(selection == undefined || selection.isCollabsed || selection.toString() == '');
  if (IwantToEditTheSelectedText) { 
    node.attr('class', 'floatingEditContainer');
    node.css('top', (y + 3) + 'px');
    node.css('left', x + 'px');
  } else {
    hideSelectionEditNode();
  }
  return IwantToEditTheSelectedText;
}

function setSelectionEditNodePositionEvent(e) {
  // http://dev-notes.com/code.php?q=33
	var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  setSelectionEditNodePosition(x, y);
};

if (document.location.protocol != 'file:') {
  // you can not edit a local file, I guess
  document.body.onmouseup = setSelectionEditNodePositionEvent;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// get the markdown text
//
// var markdownText = getMarkdownFromNodes(getSelectedNodes());
//

var includeNodeNamesIntoMarkdown = ['solution', 'hinweis', 'hint'];

function getMarkdownFromNodes(nodes) {
  var markdown = '';
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var nodeMarkdown = $(node).attr('originalmarkdown');
    if (nodeMarkdown == undefined) {
      if (node.nodeType == 3) {
        // text node 
        // from http://stackoverflow.com/questions/4398526/how-can-i-find-all-text-nodes-between-to-element-nodes-with-javascript-jquery
        nodeMarkdown = node.nodeValue;
      } else if (arrayContainsNodeName(includeNodeNamesIntoMarkdown, node.nodeName)) {
        nodeMarkdown = '<' + node.nodeName.toLowerCase() + '>' + getMarkdownFromNodes(node.childNodes) + '</' + node.nodeName.toLowerCase() + '>';
      } else {
        nodeMarkdown = getMarkdownFromNodes(node.childNodes);
      };
    } else { 
      nodeMarkdown = unescape(nodeMarkdown);
    }
    markdown += nodeMarkdown;
  }
  return markdown.replace(/\n\n\n+/g, '\n\n');
}

function arrayContainsNodeName(a, string) {
    // http://stackoverflow.com/a/237176/1320237
    var test = string.toLowerCase();
    var i = a.length;
    while (i--) {
       if (a[i].toLowerCase() == test) {
           return true;
       }
    }
    return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// get the selected nodes
//
// var nodes = getSelectedNodes();
//

// posted on github
// https://github.com/niccokunzmann/spiele-mit-kindern/blob/gh-pages/javascripts/feedback.js
function getSelectedNodes() {
  // from https://developer.mozilla.org/en-US/docs/Web/API/Selection
  var selection = window.getSelection();
  if (selection.isCollabsed) {
    return [];
  };
  var node1 = selection.anchorNode;
  var node2 = selection.focusNode;
  var selectionAncestor = get_common_ancestor(node1, node2);
  if (selectionAncestor == null) {
    return [];
  }
  return getNodesBetween(selectionAncestor, node1, node2);
}

function get_common_ancestor(a, b)
{
    // from http://stackoverflow.com/questions/3960843/how-to-find-the-nearest-common-ancestors-of-two-or-more-nodes
    $parentsa = $(a).parents();
    $parentsb = $(b).parents();

    var found = null;

    $parentsa.each(function() {
        var thisa = this;

        $parentsb.each(function() {
            if (thisa == this)
            {
                found = this;
                return false;
            }
        });

        if (found) return false;
    });

    return found;
}

function isDescendant(parent, child) {
     // from http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
     // node is decendant from itself. this is important for getNodesBetween
     var node = child;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

function getNodesBetween(rootNode, node1, node2) {
  var resultNodes = [];
  var isBetweenNodes = false;
  for (var i = 0; i < rootNode.childNodes.length; i+= 1) {
    if (isDescendant(rootNode.childNodes[i], node1) || isDescendant(rootNode.childNodes[i], node2)) {
      if (resultNodes.length == 0) {
        isBetweenNodes = true;
      } else {
        isBetweenNodes = false;
      }
      resultNodes.push(rootNode.childNodes[i]);
      
    } else if (resultNodes.length == 0) {
    } else if (isBetweenNodes) {
      resultNodes.push(rootNode.childNodes[i]);
    } else {
      return resultNodes;
    }
  };
  if (resultNodes.length == 0) {
    return [rootNode];
  } else if (isDescendant(resultNodes[resultNodes.length - 1], node1) || isDescendant(resultNodes[resultNodes.length - 1], node2)) {
    return resultNodes;
  } else {
    //return resultNodes;
    // same child node for both should never happen
    return [resultNodes[0]];
  }
}







