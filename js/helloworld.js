
// Themes begin
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



function dategraph(){
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.RadarChart);

chart.data = [
    {
        category: "One",
        startDate1: "2018-01-01",
        endDate1: "2018-03-01"
    },
    {
        category: "One",
        startDate1: "2018-04-01",
        endDate1: "2018-08-15"
    },
    {
        category: "Two",
        startDate2: "2018-03-01",
        endDate2: "2018-06-01"
    },
    {
        category: "Two",
        startDate2: "2018-08-01",
        endDate2: "2018-10-01"
    },
    {
        category: "Three",
        startDate3: "2018-02-01",
        endDate3: "2018-07-01"
    },
    {
        category: "Four",
        startDate4: "2018-06-09",
        endDate4: "2018-09-01"
    },
    {
        category: "Four",
        startDate4: "2018-10-01",
        endDate4: "2019-01-01"
    },
    {
        category: "Five",
        startDate5: "2018-02-01",
        endDate5: "2018-04-15"
    },
    {
        category: "Five",
        startDate5: "2018-10-01",
        endDate5: "2018-12-31"
    }
];

chart.padding(20, 20, 20, 20);
chart.colors.step = 2;
chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";
chart.innerRadius = am4core.percent(40);

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.labels.template.location = 0.5;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.tooltipLocation = 0.5;
categoryAxis.renderer.grid.template.strokeOpacity = 0.07;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.mouseEnabled = false;
categoryAxis.tooltip.disabled = true;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.labels.template.horizontalCenter = "left";
dateAxis.strictMinMax = true;
dateAxis.renderer.maxLabelPosition = 0.99;
dateAxis.renderer.grid.template.strokeOpacity = 0.07;
dateAxis.min = new Date(2018, 0, 1, 0, 0, 0).getTime();
dateAxis.max = new Date(2019, 0, 1, 0, 0, 0).getTime();
dateAxis.mouseEnabled = false;
dateAxis.tooltip.disabled = true;
dateAxis.baseInterval = {count:1, timeUnit:"day"};

var series1 = chart.series.push(new am4charts.RadarColumnSeries());
series1.name = "Series 1";
series1.dataFields.openDateX = "startDate1";
series1.dataFields.dateX = "endDate1";
series1.dataFields.categoryY = "category";
series1.clustered = false;
series1.columns.template.radarColumn.cornerRadius = 30;
series1.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

var series2 = chart.series.push(new am4charts.RadarColumnSeries());
series2.name = "Series 2";
series2.dataFields.openDateX = "startDate2";
series2.dataFields.dateX = "endDate2";
series2.dataFields.categoryY = "category";
series2.clustered = false;
series2.columns.template.radarColumn.cornerRadius = 30;
series2.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

var series3 = chart.series.push(new am4charts.RadarColumnSeries());
series3.name = "Series 3";
series3.dataFields.openDateX = "startDate3";
series3.dataFields.dateX = "endDate3";
series3.dataFields.categoryY = "category";
series3.clustered = false;
series3.columns.template.radarColumn.cornerRadius = 30;
series3.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

var series4 = chart.series.push(new am4charts.RadarColumnSeries());
series4.name = "Series 4";
series4.dataFields.openDateX = "startDate4";
series4.dataFields.dateX = "endDate4";
series4.dataFields.categoryY = "category";
series4.clustered = false;
series4.columns.template.radarColumn.cornerRadius = 30;
series4.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

var series5 = chart.series.push(new am4charts.RadarColumnSeries());
series5.name = "Series 5";
series5.dataFields.openDateX = "startDate5";
series5.dataFields.dateX = "endDate5";
series5.dataFields.categoryY = "category";
series5.clustered = false;
series5.columns.template.radarColumn.cornerRadius = 30;
series5.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

chart.seriesContainer.zIndex = -1;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.exportable = false;
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.exportable = false;

chart.cursor = new am4charts.RadarCursor();
chart.cursor.innerRadius = am4core.percent(40);
chart.cursor.lineY.disabled = true;

var yearLabel = chart.radarContainer.createChild(am4core.Label);
yearLabel.text = "2018";
yearLabel.fontSize = 30;
yearLabel.horizontalCenter = "middle";
yearLabel.verticalCenter = "middle";
}


function boxes(){
// Themes begin
am4core.useTheme(am4themes_dataviz);
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