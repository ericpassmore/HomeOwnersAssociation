/******
Author: ericpassmore
Purpose: fetches the json file with property information, renders retangles around the property
*******/
function makePropertyRectangles() {
  // async fetch and parse json file
  fetchJSONFile(propertydatafile, function(data){
    for (i = 0; i < data.homes.length; i++) {
         // Northeast point
         var neLatLng = data.homes[i].ne.split(",");
         var geoNELatLng = new google.maps.LatLng(parseFloat(neLatLng[0]), parseFloat(neLatLng[1]));
         // Southwest point
         var swLatLng = data.homes[i].sw.split(",");
         var geoSWLatLng = new google.maps.LatLng(parseFloat(swLatLng[0]), parseFloat(swLatLng[1]));
         var propertybounds = new google.maps.LatLngBounds(geoSWLatLng, geoNELatLng);
//           FILL COLORS
//              fillColor: '#FF0000',
//              fillOpacity: 0.35,
         var rect = new google.maps.Rectangle( {
              bounds: propertybounds,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillOpacity: 0,
              map: map, 
          });
    }
  });
}

/******
Author: ericpassmore
Purpose: fetches the json file with property information, renders property data
*******/
function makeInfowindows() {
  // async fetch and parse json file
  fetchJSONFile(propertydatafile, function(data){
    for (i = 0; i < data.homes.length; i++) {
         var housenumber = data.homes[i].housenumber;
         // Northeast point
         var neLatLng = data.homes[i].ne.split(",");
         // Southwest point
         var swLatLng = data.homes[i].sw.split(",");
         // anchor for information window
         var propertycenterpoint = new google.maps.LatLng(
                           parseFloat(swLatLng[0]), 
                           parseFloat(neLatLng[1])+(parseFloat(swLatLng[1])-parseFloat(neLatLng[1]))/2
          );
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

        // global var to track all info windows
        if ( !infowindows ) {
           infowindows = [];
        }
        infowindows.push(propertyinfo);
    }
  });
}
