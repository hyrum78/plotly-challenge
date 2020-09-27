// this is one reason I'm not in medicine
function grossDataWhy(id) {
  // getting data from the json file
  d3.json("samples.json").then((data)=> {
                
      // filter top 10 OTUs
      var samples = data.samples.filter(s => s.id.toString() === id)[0];      
      var sampleVal = samples.sample_values.slice(0, 10).reverse();
      var Top_10 = (samples.otu_ids.slice(0, 10)).reverse();
      
      // map IDs
      var Map_10 = Top_10.map(d => "OTU " + d)

      // label top 10
      var label_10 = samples.otu_labels.slice(0, 10);

      // trace
      var trace1 = {
          x: sampleVal,
          y: Map_10,
          text: label_10,
          marker: {
            color: 'rgb(51,122,183)'},
          type:"bar",
          orientation: "h",
      };
      var data1 = [trace1];

      // layout
      var layout = {
          title: "Top 10 OTU (Yuck)",
          yaxis:{
              tickmode:"linear",
          },
          margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 30
          }
      };

      // BAR PLOT
      Plotly.newPlot("bar", data1, layout);
 
      // trace
      var trace2 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids
          },
          text: samples.otu_labels
      };

      // layout
      var bubblePop = {
          xaxis:{title: "OTU ID"},
          yaxis: {title: "Sample Frequency"},
          height: 600,
          width: 1000,
          title: "Gross Info for ID# " + id
      };

      // BUBBLY
      var data2 = [trace2];
      Plotly.newPlot("bubble", data2, bubblePop); 

         
    });
}  
// function
function moreGrossData(id) {
  // read samples file
  d3.json("samples.json").then((data)=> {
      var metaData = data.metadata;
      console.log(metaData)

      // filter metadata
      var filterResults = metaData.filter(meta => meta.id.toString() === id)[0];
      var demoData = d3.select("#sample-metadata");
      demoData.html("");

      // PANEL
      Object.entries(filterResults).forEach((key) => {   
            demoData.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}
// change event
function changeEvent(id) {
  grossDataWhy(id);
  moreGrossData(id);
}
function init() {
  // dropdown 
  var dropdown = d3.select("#selDataset");
  // read samples file 
  d3.json("samples.json").then((data)=> {
      console.log(data)
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });
      // call functions
      grossDataWhy(data.names[0]);
      moreGrossData(data.names[0]);
  });
}
init();