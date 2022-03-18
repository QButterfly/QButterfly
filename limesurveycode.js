<script>
  // Hide submit button until enableNextButton message received in eventstream 
  $(document).ready(function() {
     $('#ls-button-submit').hide();
   });
  
  setTimeout(function() { jQuery("#ls-button-submit").show(); },30000);
  
// The following parameters need to be replaced by your actual parameters
  var windowURL = "https://qbutterfly.github.io/control_lime.html";
  var windowBorder = 0;
  var windowHeight = 400;
  var windowWidth = 400; 
  var windowScroll = "no"; 
  
  var windowOrigin = new URL(windowURL).origin;
  var createiFrame = "<iframe frameborder=\"" +windowBorder +"\" height=\"" +windowHeight + "\" scrolling=\"" + windowScroll + "\" src=\"" +       windowURL + "\" width=\"" + windowWidth+ "\"></iframe>";

  // This creates the iFrame inside the current question number 2. You can also create it elsewhere.
  document.getElementById('question2').innerHTML = createiFrame;

  // initialize the collectable data
	var eventStream = "";

	// register callback handleMessage, when a message from the iFrame is received
	if (window.addEventListener) {
		window.addEventListener("message", handleMessage);
		console.log("addEventListener active");
	} else {
		window.attachEvent("onmessage", handleMessage);
		console.log("attachEvent active");
	}	
  
	// Callback-Function for the iFrame-message
	function handleMessage(event) {
		console.log("Message from iframe received from: " + event.origin);
		if (event.origin != windowOrigin) {
			console.log("The message came from some site we don't know. We're not processing it.");
			return;
		}

		var dataFromChildIframe = event.data;

		// Add the current Time and the id to the collectedData-String 
		eventStream += dataFromChildIframe.currentTime + "#" + dataFromChildIframe.id + "; ";
     
        // Write the collectedData-String to hidden question. Note: the number after #answer is the SGQ identifier of the hidden question. The format is Survey-ID X Group-ID X Question-ID. If you have to update it with the SGQ of your survey.
        $("#answer499761X1X3").val(eventStream);
        
		// Shows the next button, if user clicked on an element with class enableNextButton
		if(dataFromChildIframe.enableNextButton){
		    $('#ls-button-submit').show();
		 }
	}

</script>
