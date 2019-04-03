$('#searchbox').val("Search nodes");


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

var changeNodes = setInterval(function(){
	$("#nodecount .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue += 1;
		currentvalue = currentvalue.toFixed(0);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 7000);

var changeChannels = setInterval(function(){
	$("#channelcount .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue += 1;
		currentvalue = currentvalue.toFixed(0);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 4000);

var changeCapacity = setInterval(function(){
	$("#capacitycount .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue += 0.01;
		currentvalue = currentvalue.toFixed(2);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 4326);

var changePercents = setInterval(function(){
	$("#nodepercent .number, #channelpercent .number, #capacitypercent .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue *= 1.001;
		currentvalue = currentvalue.toFixed(1);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 3000);

var changeAmounts = setInterval(function(){
	$("#capacityamount .number").each(function(){
		var currentvalue = $( this ).text();
		currentvalue = parseFloat(currentvalue.replace(/,/g, ''));
		currentvalue += 111.11;
		currentvalue = currentvalue.toFixed(2);
		currentvalue = numberWithCommas(currentvalue);
		$( this ).text(currentvalue);
	});
}, 8000);