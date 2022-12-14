// from data.js
var tableData = data;


var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var inputField3 = d3.select("#state");
var inputField4 = d3.select("#country");
var inputField5 = d3.select("#shape");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var buildtable = (dataInput) => {

	dataInput.forEach(ufo_sightings => {
		var row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufo_sightings[column])
		)
	});
}

//buildtable table
buildtable(data);

// Filter by attribute
button.on("click", filterData)
	function filterData(){
	d3.event.preventDefault();
	var inputDate = inputField1.property("value").trim();
	var inputCity = inputField2.property("value").toLowerCase().trim();
	var inputState = inputField3.property("value").toLowerCase().trim();
	var inputCountry = inputField4.property("value").toLowerCase().trim();
	var inputShape = inputField5.property("value").toLowerCase().trim();
	console.log(inputField3)
	// Filter by field matching input value
	var filterDate = data.filter(data => data.datetime === inputDate);
	console.log(filterDate)
	var filterCity = data.filter(data => data.city === inputCity);
	console.log(filterCity)
	var filterState = data.filter(data => data.state === inputState);
	console.log(filterState)
	var filterCountry = data.filter(data => data.country === inputCountry);
	console.log(filterCountry)
	var filterShape = data.filter(data => data.shape === inputShape);
	console.log(filterShape)
	var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity && data.state === inputState
		&& data.country === inputCountry && data.shape === inputShape);
	console.log(filterData)

	// Add filtered sighting to table
	tbody.html("");

	let response = {
		filterData, filterCity, filterDate,filterState, filterCountry, filterShape 
	}

	if (response.filterData.length !== 0) {
		buildtable(filterData);
	}
		else if (response.filterData.length === 0 && ((response.filterCity.length !== 0))){
			buildtable(filterCity);
	
		}
		else if (response.filterData.length === 0 && ((response.filterState.length !== 0))){
			buildtable(filterState);
	
		}
		else if (response.filterData.length === 0 && ((response.filterCountry.length !== 0))){
			buildtable(filterCountry);
	
		}
		else if (response.filterData.length === 0 && ((response.filterShape.length !== 0 ))){
			buildtable(filterShape);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found!"); 
		}
}

resetbtn.on("click", () => {
	tbody.html("");
	buildtable(data)
	console.log("Table reset")
})