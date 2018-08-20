// window.onload = function() {

// };

var config2 = {
	type: 'pie',
	data: {
		datasets: [{
			data: [7,2],
			backgroundColor: [
				"blue",
				"red",
			],
		label: 'Profit / Loss',
		}],
		labels: [
			'Profit',
			'Loss'
		]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: 'Trading Operations Graph',
			fontSize: 20,
			fontColor: '#000'
		}
	}
};




$(document).ready(function() {
	apiCMC();
	// setInterval("apiCMC()",5000);
	var pie = $("#myPie");
	var myPie = new Chart(pie, config2);

});


function toggleSidebar() {
	$('.sidebar').toggleClass('act');
}

function apiCMC() {
	url = 'https://api.coinmarketcap.com/v2/global/';
	datos = {};
	$.getJSON(url, datos, function(response){
	   $("#active_cryptocurrencies").html(response.data.active_cryptocurrencies);
	   $("#active_markets").html(response.data.active_markets);
	   $("#total_market_cap").html("$"+response.data.quotes.USD.total_market_cap);
	   $("#total_volume_24h").html("$"+response.data.quotes.USD.total_volume_24h);
	});
}
