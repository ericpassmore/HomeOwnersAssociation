/******
Author: ericpassmore
Purpose: fetches the json file with property information
          renders retangles around the property
         and labes for the properties
Options: "labels only" skips render of rectangles
*******/
function renderHomes(options) {
  // var to track all info windows
  if ( !propertylables ) {
      propertylables = [];
  }

  // async fetch and parse json file
  fetchJSONFile(propertydatafile, function(data){
    for (i = 0; i < data.homes.length; i++) {
        // Housenumber
        var housenumber = data.homes[i].housenumber;
        // Northeast point
        var neLatLng = data.homes[i].ne.split(",");
        var northLat = parseFloat(neLatLng[0]);
        var eastLng = parseFloat(neLatLng[1]);
        var geoNELatLng = new google.maps.LatLng(northLat, eastLng);

        // Southwest point
        var swLatLng = data.homes[i].sw.split(",");
        var southLat = parseFloat(swLatLng[0]);
        var westLng = parseFloat(swLatLng[1]);
        var geoSWLatLng = new google.maps.LatLng(southLat, westLng);
        var propertybounds = new google.maps.LatLngBounds(geoSWLatLng, geoNELatLng);
        // anchor for information window
        // Latitude = southwest latitude
        // Longitude = northeast Lng plus have the distance between west and east
        var propertycenterpoint = new google.maps.LatLng( southLat, eastLng+(westLng-eastLng)/2 );

//           FILL COLORS
//              fillColor: '#FF0000',
//              fillOpacity: 0.35,

         // skip rectangles if options equals "lables only"
         if ( options != "labels only" ) {
             var rect = new google.maps.Rectangle( {
                  bounds: propertybounds,
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillOpacity: 0,
                  map: map, 
              });

              clickableHome(rect,data.homes[i]);
        }
	var myOptions = {
		 content: housenumber
		,boxStyle: {
		   border: "1px solid black"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "30px"
		 }
		,disableAutoPan: true
		,pixelOffset: new google.maps.Size(-20, -25)
		,position: propertycenterpoint
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};

	var propertyinfo = new InfoBox(myOptions);
	propertyinfo.open(map);
        // build up list of opened windows
        propertylables.push(propertyinfo);
    }
  });
}

/*************
**************/
function clickableHome(rect, data ) {
    var home = data;
    google.maps.event.addListener(rect,'click', function(event) {
        alert(data.housenumber);
    });
}
