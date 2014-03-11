function createGraph(id, title) {
	var n = 60,
	    duration = 1000,
	    now = new Date(Date.now() - duration),
	    count = 0, breakdown = "",
	    data = d3.range(n).map(function() { return 0; });

	var div = d3.select("body").append("div").attr("id",id).attr("class","chartdiv");

	var margin = {top: 6, right: 0, bottom: 20, left: 40},
	    width = div[0][0].clientWidth - margin.right - margin.left,
	    height = 120 - margin.top - margin.bottom;

	var x = d3.time.scale()
	    .domain([now - (n - 2) * duration, now - duration])
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var line = d3.svg.line()
	    .interpolate("linear")
	    .x(function(d, i) { return x(now - (n - 1 - i) * duration); })
	    .y(function(d, i) { return y(d); });
	
	var title_div = div.append("div").text(title).attr("class","title");
	var curr_value = div.append("div").attr("class","curr_value");
	var curr_info = div.append("div").attr("class","chart_info");
	div.append("div").attr("style","clear:both;");
	var svg = div.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  .append("rect")
	    .attr("width", width)
	    .attr("height", height);

	var yaxis = svg.append("g")
	    .attr("class", "y axis")
	    .call(y.axis = d3.svg.axis().scale(y).ticks(5).orient("left"));

	var axis = svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));

	var path = svg.append("g")
	    .attr("clip-path", "url(#clip)")
	  .append("path")
	    .data([data])
	    .attr("class", "line");

	tick();

	function tick() {

	  // update the domains
	  now = new Date();
	  x.domain([now - (n - 2) * duration, now - duration]);

	  // push the accumulated count onto the back, and reset the count
	  data.push(count);
	  curr_value.text(count);
	  curr_info.text(breakdown);
	  count = 0;
	  breakdown = "";

	  if (d3.max(data) > 0) y.domain([-0.5 * d3.max(data), d3.max(data) * 1.5]);

	  // redraw the line
	  svg.select(".line")
	      .attr("d", line)
	      .attr("transform", null);

	  yaxis.transition()
	      .duration(duration)
	      .ease("linear")
	      .call(y.axis);

	  // slide the x-axis left
	  axis.transition()
	      .duration(duration)
	      .ease("linear")
	      .call(x.axis);

	  // slide the line left
	  path.transition()
	      .duration(duration)
	      .ease("linear")
	      .attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
	      .each("end", tick);

	  // pop the old data point off the front
	  data.shift();

	}

	return {
		update: function(obj) {
			count = obj.value;
			breakdown = obj.breakdown;
		},
		setTitle: function(title) {
			title_div.text(title);
		}
	};
}