// Creating function for Data plotting 
function getPlots(id) {
    // getting data from the json file
    d3.json("static/js/samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Getting the top 10 
        var sampleValues = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTUtop = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTUid = OTUtop.map(d => "OTU " + d)
  
         console.log(`OTU IDS: ${OTUid}`)
  
  
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
         console.log(`Sample Values: ${sampleValues}`)
         console.log(`Id Values: ${OTUtop}`)
        // create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: OTUid,
            text: labels,
            marker: {
              color: 'rgb(158,202,225)',
              line: {
                  color:'rgb(8,48,107)',
                  width: 1.5}

                },
            type:"bar",
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 80,
                r: 80,
                t: 80,
                b: 50
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);
  
        console.log(`ID: ${samples.otu_ids}`)
      
        // The bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            showlegend: false,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                opacity: 0.8,
                type: 'scatter'
            },
            text: samples.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var layout1 = {
            xaxis:{title: "OTU ID"},
            height: 700,
            width: 1000
        };
  
        // creating data variable 
        var data1 = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout1); 
  
        });
    }  
 //create the function to get the necessary data
function Info(id) {
    // read the json file to get data
    d3.json("static/js/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demoInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demoInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlots(id);
    Info(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("static/js/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        Info(data.names[0]);
    });
}
init();
