// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 60,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  


// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("assets/data/data.csv").then(function(HealthData) {

  // step 4: scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(HealthData, d => +d.poverty))
    .range([0, width])

console.log(xScale); 

  const yScale = d3.scaleLinear()
    .domain([0,d3.max(HealthData, d => +d.healthcare)])
    .range([height, 0]);

  
  // Step 5: create axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

 
// Step 6: append axis to chart 
chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
chartGroup.append("g").call(yAxis);

var toolTip = d3.select("body").append("div")
.attr("class", "tooltip");

var state = HealthData.map(data => data.state);

//Step 7: Scatter plot 
chartGroup.selectAll("circle")
.data(HealthData)
.enter()
.append("circle")
.attr("cx", d=>xScale(+d.poverty))
.attr("cy", d=>yScale(+d.healthcare))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75)
.on("mouseover", function() {		
  toolTip.transition()		
      .duration(200)		
      .style("opacity", .9);		
      toolTip.html(`State: <strong>${state}</strong>`)	
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY) + "px");	
  })					
.on("mouseout", function() {		
toolTip.transition()		
      .duration(500)	
      .style("display", "none")	
      .style("opacity", 0);	
});


//Step 8: Add data to each point 
chartGroup.append("g")
.selectAll('text')
.data(HealthData)
.enter()
.append("text")
.text(d=>d.abbr)
.attr("x",d=>xScale(+d.poverty))
.attr("y",d=>yScale(+d.healthcare))
.classed(".stateText", true)
.attr("font-family", "sans-serif")
.attr("text-anchor", "middle")
.attr("fill", "white")
.attr("font-size", "10px")
.style("font-weight", "bold")
.attr("alignment-baseline", "central");

//Step 9 Add axis details 
chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
      .text("Poverty (%)");

      chartGroup.append("text")
      .attr("y", 0 - ((margin.left / 2) + 2))
      .attr("x", 0 - (height / 2))
      .attr("transform", "rotate(-90)")
      .text("Lacks Healthcare (%)");


      // Extra trial


  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  // var toolTip = d3.select("body").append("div")
  //   .attr("class", "tooltip");

  // // Step 2: Add an onmouseover event to display a tooltip
  // // ========================================================
  // var state = HealthData.map(data => data.state);
  // //console.log("states", state);


  // chartGroup.on("mouseover", function() {
  //   toolTip.style("display", "block");
  //   toolTip.html(`State: <strong>${state}</strong>`)
  //     .style("left", d3.event.pageX + "px")
  //     .style("top", d3.event.pageY + "px");
  // })
  //   // Step 3: Add an onmouseout event to make the tooltip invisible
  //  .on("mouseout", function() {
  //     toolTip.style("display", "none");
  //   });

//   .on("mouseover", function() {		
//     toolTip.transition()		
//         .duration(200)		
//         .style("opacity", .9);		
//         toolTip.html(`State: <strong>${state}</strong>`)	
//         .style("left", (d3.event.pageX) + "px")		
//         .style("top", (d3.event.pageY) + "px");	
//     })					
// .on("mouseout", function() {		
//   toolTip.transition()		
//         .duration(500)	
//         .style("display", "none")	
//         .style("opacity", 0);	
// });




}).catch(function(error) {
console.log(error);
}) 