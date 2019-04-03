$('#searchbox').val("Search nodes");


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

var changeNumbers = setInterval(function(){
	$(".resultsnumber .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue *= 1.0003;
		currentvalue = currentvalue.toFixed(0);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 5000);

var changePercents = setInterval(function(){
	$(".resultspercent .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue *= 1.01;
		currentvalue = currentvalue.toFixed(1);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 3000);

var changeAmounts = setInterval(function(){
	$(".resultsamount .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue += 1;
		currentvalue = currentvalue.toFixed(2);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 150);