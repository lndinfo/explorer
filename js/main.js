 

function showResults(){
	var search = document.getElementById('search_input');
	var query = search.value;
	$("#results").html((query.length >0 )?'Results for: ' + query:'' + query);

}



function switchcharts(){
 var killcoffee = setTimeout(function()
 {
 	$("#chartdiv").toggle("blind", function(){
 		$(".wait").toggle("slide", function(){

 		});
 	}).empty().show(1, function(){
 		maptest();
 		});

 }, 2000);
 }