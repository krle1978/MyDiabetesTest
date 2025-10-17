const svg = d3.select("#map-svg");
const width = parseInt(svg.style("width"));
const height = parseInt(svg.style("height"));

const projection = d3.geoNaturalEarth1()
  .scale(width / 1.3 / Math.PI)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

Promise.all([
  d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json"),
  d3.csv("data/diabetes_prevalence_by_country.csv")
]).then(([world, data]) => {
  const countries = topojson.feature(world, world.objects.countries).features;

  // Strukturiranje podataka
  const datap = {};
  data.forEach(d => {
    const cc = d.country_code;
    const yr = +d.year;
    const val = +d.prevalence;
    if (!datap[cc]) datap[cc] = {};
    datap[cc][yr] = val;
  });

  const colorScale = d3.scaleSequential(d3.interpolateReds)
    .domain([0, 25]);  // možeš prilagoditi maksimalnu vrednost

  function draw(year) {
    const u = svg.selectAll("path")
      .data(countries);

    u.join("path")
     .attr("class", "country")
     .attr("d", path)
     .attr("fill", d => {
       const cc = d.id;
       const v = datap[cc] ? datap[cc][year] : undefined;
       return (v != null) ? colorScale(v) : "#ccc";
     })
     .on("mouseover", (event, d) => {
       const cc = d.id;
       const v = datap[cc] && datap[cc][year];
       const name = d.properties.name;
       const txt = name + ": " + (v != null ? v.toFixed(2) + "%" : "nema podataka");
       d3.select("#legend").text(txt);
     })
     .on("mouseout", () => {
       d3.select("#legend").text("");
     })
     .append("title")
     .text(d => {
       const cc = d.id;
       const v = datap[cc] && datap[cc][year];
       return d.properties.name + ": " + (v != null ? v.toFixed(2) + "%" : "nema podataka");
     });
  }

  const slider = d3.select("#yearSlider");
  const label = d3.select("#yearLabel");
  slider.on("input", function() {
    const yr = +this.value;
    label.text(yr);
    draw(yr);
  });

  draw(+slider.node().value);
});