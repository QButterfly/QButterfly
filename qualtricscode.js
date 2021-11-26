Qualtrics.SurveyEngine.addOnload(function (){
    var windowOrigin = new URL("${e://Field/windowURL}").origin;
	
	//hides the next button on the page

	this.hideNextButton();
	
	setTimeout(function() { jQuery("#NextButton").show(); },30000);
	
	// stores the actual this in variable for later use in callback-function, where this is the Window instead of S.r
	var surveyEngineVar = this;
	
	// overrides CSS (padding-top)
	jQuery(".Skin .SkinInner").attr("style", "padding: 0 !important");
	jQuery(".Skin .QuestionOuter").attr("style", "padding-bottom: 0 !important");
	jQuery(".Skin .QuestionText").attr("style", "padding-top: 0");
	
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

	// create the iframe only after the addEventListner is active to not miss events
	var createiFrame = '<iframe frameborder="${e://Field/windowBorder}" height="${e://Field/windowHeight}" scrolling="${e://Field/windowScroll}" src="${e://Field/windowURL}" width="${e://Field/windowWidth}"></iframe>';
	
	jQuery("#Header").html(createiFrame);
		
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

		
		// Write the collectedData-String to an embedded field
		Qualtrics.SurveyEngine.setEmbeddedData("eventStream", eventStream);

		// Shows the next button, if user clicked on an element with class enableNextButton
		if(dataFromChildIframe.enableNextButton){
		surveyEngineVar.showNextButton();
		}
	}
});