sap.ui.getCore().attachInit(function (data) {
    setTimeout(function () {

        //Farm locations in longitude and latitude
        var locs = ["4.9041, 52.3676", "6.7735, 51.2277"]

        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/geometry/Multipoint",
            "esri/layers/FeatureLayer",
            "esri/geometry/Point",
            "dojo/domReady!"

        ], function (Map, MapView, Graphic, GraphicsLayer,
            Point) {


            var map = new Map({
                basemap: "topo-vector"
            });

            var view = new MapView({
                container: hbxMap.getDomRef(),
                map: map,
                center: [4.9041, 52.3676], // longitude, latitude
                zoom: 7
            });


            function weatherAmsterdam() {
                //Amsterdam Weather Info
                const airHumidityA = AmsterdamWeather.main.humidity;
                const temperatureA = AmsterdamWeather.main.temp;
                const weatherConditionsA = AmsterdamWeather.weather[0].description;
                const nameA = AmsterdamWeather.name;
                var img = "";

                //Check weather condition and update the image
                if (weatherConditionsA === "clear sky") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/clear_sky.png";

                } else if (weatherConditionsA === "few clouds") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/few_clouds.png";

                } else if (weatherConditionsA === "scattered clouds") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/scattered_clouds.png";

                } else if (weatherConditionsA === "broken clouds") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/broken_clouds.png";

                } else if (weatherConditionsA === "overcast clouds") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/scattered_clouds.png";

                } else if (weatherConditionsA === "shower rain") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/shower_rain.png";

                } else if (weatherConditionsA === "rain") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/shower_rain.png";

                } else if (weatherConditionsA === "thunderstorm") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/thunderstorm.png";

                } else if (weatherConditionsA === "snow") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/snow.png";

                } else if (weatherConditionsA === "mist") {
                    var img = "https://portal.neptune-software.com/media/root/Hackathon/mist.png";
                }

                //Weather info popup content
                view.popup.content =
                    nameA +
                    "<ul><li> Air humidity: " + airHumidityA + " %</li>" +
                    "<li> Temperature: " + temperatureA + " °C</li>" +
                    "<li> Weather condition: " + weatherConditionsA + "</li>" +
                    "<img src = " + img + ">";

                // console.log(img);
                console.log(view.popup.content);


            }

            function weatherDusseldorf() {
                //Dusseldorf Weather Info
                const airHumidityD = DusseldorfWeather.main.humidity;
                const temperatureD = DusseldorfWeather.main.temp;
                const weatherConditionsD = DusseldorfWeather.weather[0].description;
                const nameD = DusseldorfWeather.name;
                var imgD = "";

                //Check weather condition and update the image
                if (weatherConditionsD === "clear sky") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/clear_sky.png";

                } else if (weatherConditionsD === "few clouds") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/few_clouds.png";

                } else if (weatherConditionsD === "scattered clouds") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/scattered_clouds.png";

                } else if (weatherConditionsD === "broken clouds") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/broken_clouds.png";

                } else if (weatherConditionsD === "overcast clouds") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/scattered_clouds.png";
                }
                else if (weatherConditionsD === "shower rain") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/shower_rain.png";

                } else if (weatherConditionsD === "rain") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/shower_rain.png";

                } else if (weatherConditionsD === "thunderstorm") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/thunderstorm.png";

                } else if (weatherConditionsD === "snow") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/snow.png";

                } else if (weatherConditionsD === "mist") {
                    var imgD = "https://portal.neptune-software.com/media/root/Hackathon/mist.png";
                }

                //Weather info popup content
                view.popup.content =
                    nameD +
                    "<ul><li> Air humidity: " + airHumidityD + " %</li>" +
                    "<li> Temperature: " + temperatureD + " °C</li>" +
                    "<li> Weather condition: " + weatherConditionsD + "</li>" +
                    "<img src = " + imgD + ">";
            }

            //Crops info popup
            function cropsInfoDisplay() {
                view.popup.content =
                    "Crops information" +
                    "<ul><li> Air humidity over 80% - no watering allowed. </li>" +
                    "<li> Air humidity under 70% - watering is allowed</li>" +
                    "<li> Temperature over 25°C - crops must be uncovered from plastic sheets.</li>" +
                    "<li> Temperature under 25°C - crops must be covered with plastic sheets</li>" +
                    "<li> Rainfall in one day - no watering for 3 days.</li>" +
                    "<li> No rainfall in one day - watering is allowed.</li>";

            }

            //Create and add layer to the map
            var graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);


            //Loop and split the location's longitude and latitude
            for (i = 0; i < locs.length; i++) {
                console.log(locs[i].split(",")[0]);
                // create a point 
                var Point = {
                    type: "point",
                    longitude: locs[i].split(",")[0], //check if the point is longitude and change accordingly
                    latitude: locs[i].split(",")[1] //check if the point is latitude and change accordingly

                };
                //Marker indicating the farm location
                var simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: [46, 204, 113],  // Green
                    outline: {
                        color: [255, 255, 255], // white
                        width: 1
                    }
                };

                //*** ADD ***//
                // Create attributes
                var attributes = {};
                var index = i;

                var weather = {};
                var crops = {};


                switch (index) {

                    case 0:
                        //execute code block 1

                        weather = {
                            title: "Weather info",
                            id: "weather-infoA",
                            image: "https://portal.neptune-software.com/media/root/Hackathon/weather.png"
                        }

                        crops = {
                            title: "Crops info",
                            id: "crops-info",
                            image: "https://portal.neptune-software.com/media/root/Hackathon/crops.png"
                        }
                        //Weather info and crops info popup
                        view.popup.on("trigger-action", (event) => {
                            // Execute the weatherAmsterdam() function if the weather-infoA action is clicked
                            if (event.action.id === "weather-infoA") {
                                weatherAmsterdam();
                            } else if (event.action.id === "crops-info") {
                                cropsInfoDisplay();
                            }
                        });
                        //Main attributes
                        attributes = {
                            Name: "Farm 1",
                            Location: " Amsterdam"
                        };
                        break;

                    case 1:
                        //execute code block 2

                        weather = {
                            title: "Weather info",
                            id: "weather-infoD",
                            image: "https://portal.neptune-software.com/media/root/Hackathon/weather.png"
                        }

                        crops = {
                            title: "Crops info",
                            id: "crops-info",
                            image: "https://portal.neptune-software.com/media/root/Hackathon/crops.png"
                        }
                        //Weather info and crops info popup
                        view.popup.on("trigger-action", (event) => {
                            // Execute the weatherDusseldorf() function if the weather-infoD action is clicked
                            if (event.action.id === "weather-infoD") {
                                weatherDusseldorf();
                            } else if (event.action.id === "crops-info") {
                                cropsInfoDisplay();
                            }
                        });
                        //Main atributes
                        attributes = {
                            Name: "Farm 2",
                            Location: " Düsseldorf"
                        };

                        break;


                }


                // Create popup template
                var popupTemplate = {
                    title: "{Name}",
                    content: "Location: <b>{Location}</b>",
                    actions: [weather, crops]
                };

                //Create the point for farm's locations
                var pointGraphic = new Graphic({
                    geometry: Point,
                    symbol: simpleMarkerSymbol,
                    //*** ADD ***//
                    attributes: attributes,
                    popupTemplate: popupTemplate,

                });
                //Add Point to the map
                graphicsLayer.add(pointGraphic);
            }

        });

    }, 200);

});