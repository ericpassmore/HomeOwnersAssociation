/***************************
Author: ericpassmore
Purpose: Get CSS and HTML Attributes
Inputs: prop name 
***************************/
function getMetaContent(propName) {

  var metas = document.getElementsByTagName('meta');

  for (i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") == propName) {
      return metas[i].getAttribute("content");
    }
  }
  return "";
} 

/***************************
Author: ericpassmore
Purpose: parse and return meta tag data seperated by , and =
Inputs: prop name
***************************/
function getContentValue(propName) {
  var metas = getMetaContent("viewport");

  if (metas.length > 0 ) {
    var contenttags = metas.split(",");

    for (i = 0; i < contenttags.length; i++) {
      var tag = contenttags[i].split("=");
      var tagname = tag[0];
      var tagvalue = tag[1];
      
      if (tagname == propName) {
        return tagvalue;
      }
    }
  }
}

/***************************
Author: ericpassmore
Purpose: Open up JSON URL and parse
Inputs: URL to file and function to process data
***************************/
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };

    httpRequest.open('GET', path);
    httpRequest.send(); 
}

/***************************
Author: ericpassmore
Purpose: Create control box on map, implimentaiton of controls nested under intimap function
Inputs: parent div dom element, reference to map
Global: array of infowindows, it is build async
***************************/
function LeftControl(controlDiv, map){
  // storeage for control state
  var control = this;
  // Set the toggle upon construction
  control.propertylabletoggle_ = "off";

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.setAttribute("class", "controlui");
  controlUI.title = 'Click to toggle information';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.setAttribute("class", "controltext");
  controlText.setAttribute("id","proplablecontrol");
  controlText.innerHTML = 'Property Lable Toggle';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    var currentState = control.getPropertylableState();

    if ( currentState == "off" ) {
        console.log("length"); console.log(propertylables.length);
        for (i = 0; i < propertylables.length; i++) {
            propertylables[i].close();
        } 
        propertylables = [];
    } else {
        console.log("making windows");
        renderHomes("labels only");
    }

    control.togglePropertylableState();

  });
}

/**
 * Define a property to hold the toogle state.
 * @private
 */
LeftControl.prototype.propertylabletoggle_ = null;

/**
 * Get the current state of toggle
 * return string on or off
 */
LeftControl.prototype.getPropertylableState = function() {
  return this.propertylabletoggle_;
};

/**
 * Turns lables on or off
 * 
 */
LeftControl.prototype.togglePropertylableState = function() {
  if ( this.propertylabletoggle_ == "off") {
      this.propertylabletoggle_ = "on";
  } else {
      this.propertylabletoggle_ = "off";
  }
};
