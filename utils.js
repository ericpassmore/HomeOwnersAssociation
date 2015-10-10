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
  control.infowindowtoggle_ = "off";

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to toggle information';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.setAttribute("id","infowindowcontrol");
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Infowindow Toggle';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    var currentState = control.getInfowindowState();

    if ( currentState == "off" ) {
        console.log("length"); console.log(infowindows.length);
        for (i = 0; i < infowindows.length; i++) {
            infowindows[i].close();
        } 
        infowindows = [];
    } else {
        console.log("making windows");
        makeInfowindows();
    }

    control.toggleInfowindowState();

  });
}

/**
 * Define a property to hold the toogle state.
 * @private
 */
LeftControl.prototype.infowindowtoggle_ = null;

/**
 * Gets the map center.
 * return string on or off
 */
LeftControl.prototype.getInfowindowState = function() {
  return this.infowindowtoggle_;
};

/**
 * Sets the map center.
 * 
 */
LeftControl.prototype.toggleInfowindowState = function() {
  if ( this.infowindowtoggle_ == "off") {
      this.infowindowtoggle_ = "on";
  } else {
      this.infowindowtoggle_ = "off";
  }
};
