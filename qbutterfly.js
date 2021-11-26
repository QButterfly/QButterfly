const debug = false;

function log(message) {
  if (debug) { 
    console.log(message);
  }
}

var qualtricsURL;
var url;
var filename;

function disableBack() { 
  window.history.forward(); 
}

	$(document).ready(function() {
    qualtricsURL = $('script[qualtricsURL][qualtricsURL!=null]'). attr('qualtricsURL');
    url = window.location.pathname;
    filename = url.substring(url.lastIndexOf('/')+1);
    var msg = "ready_" + filename;

    parent.postMessage(
      {
        id:		msg,
        currentTime: 	Date.now(),
      },
      qualtricsURL); 
    log("Document Ready Msg: " + msg); 
    
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
});

$(window).on("load",function() {
  var msg = "load_" + filename;
  // If html { visibility:hidden; } in CSS of page make visible if all content has beed loaded
  // This is useful if you to make sure that the user cannot skip the on load event by interacting with the page
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  parent.postMessage(
    {
      id:		msg,
      currentTime: 	Date.now(),
    },
    qualtricsURL); 
  log("Window OnLoad Msg: " + msg); 
  disableBack();
}) 


$(document).click(function(e) {
  if (e.target.id) {
    eventText = e.target.id;
  }
  else {
    // If you did not place an id or placed it incorrectly the following event will be generated 
    eventText = "UndefinedClick";
  }
  log("Click: " + eventText);
  // Checks if clicked item has class enableNextButton
  var enableNextButton = $(e.target).hasClass('enableNextButton');
  log("EnableNext: " + enableNextButton);
  // Send data to the parent window
  
  parent.postMessage(
    {
      id:		eventText,
      currentTime: 	Date.now(),
      enableNextButton: enableNextButton,
    }, 
    qualtricsURL);
  log("Message sent: " + eventText);   
});