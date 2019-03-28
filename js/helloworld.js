
// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

var iconPath = "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z"

var chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
chart.paddingLeft = 150;

chart.data = [{
    "name": "Finished",
    "value": 10,
    "disabled":true
}, {
    "name": "Building",
    "value": 90
}];

var series = chart.series.push(new am4charts.PictorialStackedSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;
// this makes only A label to be visible
series.labels.template.propertyFields.disabled = "disabled";
series.ticks.template.propertyFields.disabled = "disabled";


series.maskSprite.path = iconPath;
series.ticks.template.locationX = 1;
series.ticks.template.locationY = 0;

series.labelsContainer.width = 100;

chart.legend = new am4charts.Legend();
chart.legend.position = "top";
chart.legend.paddingRight = 160;
chart.legend.paddingBottom = 40;
let marker = chart.legend.markers.template.children.getIndex(0);
chart.legend.markers.template.width = 40;
chart.legend.markers.template.height = 40;
marker.cornerRadius(20,20,20,20);



function maptest(){
// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end



var mapChart = am4core.create("chartdiv", am4maps.MapChart);

try {
  mapChart.geodata = am4geodata_continentsLow;
}
catch (e) {
  mapChart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

mapChart.projection = new am4maps.projections.Miller;
// prevent dragging
mapChart.seriesContainer.draggable = false;
mapChart.seriesContainer.resizable = false;
// prevent zooming
mapChart.minZoomLevel = 1;
// countries
var countriesSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
countriesSeries.useGeodata = true;
countriesSeries.mapPolygons.template.fill = am4core.color("#47c78a");
countriesSeries.mapPolygons.template.stroke = am4core.color("#47c78a");

var colorSet = new am4core.ColorSet();
var polygonTemplate = countriesSeries.mapPolygons.template;

// night series
var nightSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
nightSeries.ignoreBounds = true;
var night = nightSeries.mapPolygons.create();
night.fill = am4core.color("#000000");
night.fillOpacity = 0.35;
night.interactionsEnabled = false;
night.stroke = am4core.color("#000000");
night.strokeOpacity = 0;

var night2 = nightSeries.mapPolygons.create();
night2.fill = am4core.color("#000000");
night2.fillOpacity = 0.35;
night2.interactionsEnabled = false;
night2.stroke = am4core.color("#000000");
night2.strokeOpacity = 0;


// images series
var imagesSeries = mapChart.series.push(new am4maps.MapImageSeries())
var tooltip = imagesSeries.tooltip;
tooltip.label.padding(15, 15, 15, 15);
tooltip.background.cornerRadius = 25;

// sun
var sun = imagesSeries.mapImages.create();
var suncircle = sun.createChild(am4core.Circle);
suncircle.radius = 10;
suncircle.fill = am4core.color("#ffba00");
suncircle.strokeOpacity = 0;
sun.filters.push(new am4core.BlurFilter());

// graticule
var graticuleSeires = mapChart.series.push(new am4maps.GraticuleSeries());
graticuleSeires.mapLines.template.stroke = am4core.color("#ffffff");
graticuleSeires.fitExtent = false;

// add slider to chart container in order not to occupy space
var slider = mapChart.chartContainer.createChild(am4core.Slider);
slider.start = 0.5;
slider.valign = "bottom";
slider.padding(0, 30, 0, 80);
slider.background.padding(0, 30, 0, 80);
slider.marginBottom = 15;
slider.events.on("rangechanged", function () {
  updateDateNight(new Date().getTime() + (slider.start - 0.5) * 1000 * 60 * 60 * 24 * 2 * 2);
})


function updateDateNight(time) {
  var sunPosition = solarPosition(time);
  sun.latitude = sunPosition.latitude;
  sun.longitude = sunPosition.longitude;
  sun.deepInvalidate();

  night.multiPolygon = am4maps.getCircle(sunPosition.longitude + 180, -sunPosition.latitude, 91);
  night2.multiPolygon = am4maps.getCircle(sunPosition.longitude + 180, -sunPosition.latitude, 89);
}


// all sun position calculation is taken from: http://bl.ocks.org/mbostock/4597134
var offset = new Date().getTimezoneOffset() * 60 * 1000;

function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525, // since J2000
    longitude = (am4core.time.round(new Date(time), "day", 1).getTime() - time - offset) / 864e5 * 360 - 180;

  return am4maps.geo.normalizePoint({ longitude: longitude - equationOfTime(centuries) * am4core.math.DEGREES, latitude: solarDeclination(centuries) * am4core.math.DEGREES });
};


// Equations based on NOAA’s Solar Calculator; all angles in Amam4charts.math.RADIANS.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
    m = solarGeometricMeanAnomaly(centuries),
    l = solarGeometricMeanLongitude(centuries),
    y = Math.tan(obliquityCorrection(centuries) / 2);

  y *= y;
  return y * Math.sin(2 * l)
    - 2 * e * Math.sin(m)
    + 4 * e * y * Math.sin(m) * Math.cos(2 * l)
    - 0.5 * y * y * Math.sin(4 * l)
    - 1.25 * e * e * Math.sin(2 * m);
}

function solarDeclination(centuries) {
  return Math.asin(Math.sin(obliquityCorrection(centuries)) * Math.sin(solarApparentLongitude(centuries)));
}

function solarApparentLongitude(centuries) {
  return solarTrueLongitude(centuries) - (0.00569 + 0.00478 * Math.sin((125.04 - 1934.136 * centuries) * am4core.math.RADIANS)) * am4core.math.RADIANS;
}

function solarTrueLongitude(centuries) {
  return solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries);
}

function solarGeometricMeanAnomaly(centuries) {
  return (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) * am4core.math.RADIANS;
}

function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return (l < 0 ? l + 360 : l) / 180 * Math.PI;
}

function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (Math.sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries))
    + Math.sin(m + m) * (0.019993 - 0.000101 * centuries)
    + Math.sin(m + m + m) * 0.000289) * am4core.math.RADIANS;
}

function obliquityCorrection(centuries) {
  return meanObliquityOfEcliptic(centuries) + 0.00256 * Math.cos((125.04 - 1934.136 * centuries) * am4core.math.RADIANS) * am4core.math.RADIANS;
}

function meanObliquityOfEcliptic(centuries) {
  return (23 + (26 + (21.448 - centuries * (46.8150 + centuries * (0.00059 - centuries * 0.001813))) / 60) / 60) * am4core.math.RADIANS;
}

function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}
}

function boxes(){
// Themes begin
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

// create chart
var chart = am4core.create("chartdiv", am4charts.TreeMap);
chart.hiddenState.properties.opacity = 0;

chart.data = [{
  name: "BTC Layer 1",
  children: [
    {
      name: "A1",
      value: 100
    },
    {
      name: "A2",
      value: 60
    },
    {
      name: "A3",
      value: 30
    }
  ]
},
{
  name: "BTC Lightning",
  children: [
    {
      name: "B1",
      value: 13
    },
    {
      name: "B2",
      value: 15
    },
    {
      name: "B3",
      value: 22
    }
  ]
},
{
  name: "Exchanges",
  children: [
    {
      name: "C1",
      value: 335
    },
    {
      name: "C2",
      value: 148
    },
    {
      name: "C3",
      value: 126
    },
    {
      name: "C4",
      value: 26
    }
  ]
},
{
  name: "Futures",
  children: [
    {
      name: "D1",
      value: 415
    },
    {
      name: "D2",
      value: 148
    },
    {
      name: "D3",
      value: 89
    },
    {
      name: "D4",
      value: 64
    },
    {
      name: "D5",
      value: 16
    }
  ]
},
{
  name: "Derivatives",
  children: [
    {
      name: "E1",
      value: 687
    },
    {
      name: "E2",
      value: 148
    }
  ]
}];

chart.colors.step = 2;

// define data fields
chart.dataFields.value = "value";
chart.dataFields.name = "name";
chart.dataFields.children = "children";
chart.layoutAlgorithm = chart.binaryTree;

chart.zoomable = false;

// level 0 series template
var level0SeriesTemplate = chart.seriesTemplates.create("0");
var level0ColumnTemplate = level0SeriesTemplate.columns.template;

level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
level0ColumnTemplate.fillOpacity = 0;
level0ColumnTemplate.strokeWidth = 4;
level0ColumnTemplate.strokeOpacity = 0;

// level 1 series template
var level1SeriesTemplate = chart.seriesTemplates.create("1");
level1SeriesTemplate.tooltip.dy = - 15;
level1SeriesTemplate.tooltip.pointerOrientation = "vertical";

var level1ColumnTemplate = level1SeriesTemplate.columns.template;

level1SeriesTemplate.tooltip.animationDuration = 0;
level1SeriesTemplate.strokeOpacity = 1;

level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
level1ColumnTemplate.fillOpacity = 1;
level1ColumnTemplate.strokeWidth = 4;
level1ColumnTemplate.stroke = am4core.color("#ffffff");

var bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
bullet1.locationY = 0.5;
bullet1.locationX = 0.5;
bullet1.label.text = "{name}";
bullet1.label.fill = am4core.color("#ffffff");
bullet1.interactionsEnabled = false;
chart.maxLevels = 2;


setInterval(function () {
  for (var i = 0; i < chart.dataItems.length; i++) {
    var dataItem = chart.dataItems.getIndex(i);
    for (var c = 0; c < dataItem.children.length; c++) {
      var child = dataItem.children.getIndex(c);
      child.value = child.value + Math.round(child.value * Math.random() * 0.4 - 0.2);
    }
  }
}, 2000)

}