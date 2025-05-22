//bebyggelse
const byggUrl =
  'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvBebyggdLnKnN';
const byggQuery = {
  query: [
    {
      code: 'Region',
      selection: {
        filter: 'vs:RegionLän99EjAggr',
        values: [
          '01',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '12',
          '13',
          '14',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25'
        ]
      }
    },
    {
      "code": "Markanvandningsklass",
      "selection": {
        "filter": "item",
        "values": [
          "239"
        ]
      }
    },
    {
      code: 'Tid',
      selection: {
        filter: 'item',
        values: [
          '2020'
        ]
      }
    }
  ],
  response: {
    format: 'JSON'
  }
};

//Land och vatten
const landYtaUrl = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0802/Areal2012NN';
const landYtaQuery = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:BRegionLän07N",
        "values": [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25"
        ]
      }
    },
    {
      "code": "ArealTyp",
      "selection": {
        "filter": "item",
        "values": [
          "01"
        ]
      }
    },
    {
      "code": "ContentsCode",
      "selection": {
        "filter": "item",
        "values": [
          "000001O4"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2020"
        ]
      }
    }
  ],
  "response": {
    "format": "JSON"
  }
};

//skyddad natur hektar
const hektarUrl ="https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/SkyddadnaturN"
const hektarQuery ={
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:RegionLän07EjAggr",
        "values": [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25"
        ]
      }
    },
    {
      "code": "Skyddsform",
      "selection": {
        "filter": "item",
        "values": [
          "TOTO"
        ]
      }
    },
    {
      "code": "ContentsCode",
      "selection": {
        "filter": "item",
        "values": [
          "000003HJ"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2020"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
}

// skogsbruk
const skogUrl = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvJbSkN"
const skogQuery ={
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:RegionLän07",
        "values": [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25"
        ]
      }
    },
    {
      "code": "Markanvandningsklass",
      "selection": {
        "filter": "item",
        "values": [
          "211"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2020"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const regionCodes = {
  '01': 'Stockholm',
  '03': 'Uppsala',
  '04': 'Södermanland',
  '05': 'Östergötland',
  '06': 'Jönköping',
  '07': 'Kronoberg',
  '08': 'Kalmar',
  '09': 'Gotland',
  10: 'Blekinge',
  12: 'Skåne',
  13: 'Halland',
  14: 'Västra Götaland',
  17: 'Värmland',
  18: 'Örebro',
  19: 'Västmanland',
  20: 'Dalarna',
  21: 'Gävleborg',
  22: 'Västernorrland',
  23: 'Jämtland',
  24: 'Västerbotten',
  25: 'Norrbotten'
};






//Karta över skyddad natur
async function calculateHektarData() {
  const hektarData = await fetch(hektarUrl, {
    method: "POST",
    body: JSON.stringify(hektarQuery)
  }).then(res => res.json());

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery)
  }).then(res => res.json());

  const hektar = hektarData.data.map(item => ({
    region: item.key[0],
    value: parseFloat(item.values[0])
  }));

  const landYta = landYtaData.data.map(item => ({
    region: item.key[0],
    area: parseFloat(item.values[0])
  }));

  const result = hektar.map(item => {
    const regionName = regionCodes[item.region];
    const yta = landYta.find(l => l.region === item.region)?.area;
    const procent = (item.value / yta) * 100;
    return {
      region: regionName,
      value: parseFloat(procent.toFixed(2))
    };
  });

  return {
    regions: result.map(r => r.region),
    values: result.map(r => r.value)
  };

}
async function displayHektarDataOnMap() {
  const mapData = await calculateHektarData();

  const data = [{
    type: "choroplethmap",
    locations: mapData.regions,
    featureidkey: "properties.name",
    z: mapData.values,
    geojson: "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
    zmin: 0,
    zmax: 90,
    colorscale:  [  
    [0.0, "#7F0000"], 

    [0.2, "#FF8000"],

    [0.4, "#FFF000"],

    [0.6, "#E0F909"],
   
    [0.8, "#00C943"],
   
    [1.0, "#06B800"]
    ],
    colorbar: {
      title: "Skyddad Natur (%)",
    tickvals: [10, 30, 50, 70, 90, 100],
    ticktext: ["0–20%", "20–40%", "40–60%","60–80%", "80–100%"]
    }
  }];

  var layout = {
  map: {center: {lon: 17.3, lat: 63}, zoom: 3, style: 'dark'},
  height: 550, width: 320,
  title: "Andel produktiv skogsmark per län (2020)",
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  };

  Plotly.newPlot('hektarStatistik', data, layout, { displayModeBar: false });

}
displayHektarDataOnMap();






//Bebyggelse i hektasr
function printByggChart(byggData) {
  const years = byggData.data;
  const labels = years.map((year) => regionCodes[year.key[0]]);
  const data = years.map((year) => parseFloat(year.values[0]));

  const datasets = [
    {
      label: 'Bebyggd mark',
      data,
      backgroundColor: [
        '#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', //ger varje län unika färger
        '#e6ab02', '#a6761d', '#666666', '#a6cee3', '#1f78b4',
        '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f',
        '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928',
        '#8dd3c7'
        ],
    }
  ];

  document.getElementById('bygg').height = 20 * labels.length; //ger varje län en specifik yta
  
const byggChart = new Chart(document.getElementById('bygg'), {
  type: 'bar',
  data: { datasets, labels},
    options: {
        indexAxis:"y",//vänder på x oxh y axeln
     scales: {
      y: {
        ticks: {
          font: {
            size: 10//storlek på län text
          },
          color: '#ffffff' // färg på Y text
        }
      },
    x: {
      ticks: {
        color: '#ffffff' // färg på X text
      }
    }
    }
   }
});
}
const request = new Request(byggUrl, {
  method: 'POST',
  body: JSON.stringify(byggQuery)
});
fetch(request)
  .then((response) => response.json())
  .then(printByggChart);


//SKOGKARTA

// Gör bara ett anrop till displayskogDataOnMap, som i sin tur anropar calculateskogData
async function calculateSkogData() {
  const skogData = await fetch(skogUrl, {
    method: "POST",
    body: JSON.stringify(skogQuery)
  }).then(res => res.json());

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery)
  }).then(res => res.json());

  const skog = skogData.data.map(item => ({
    region: item.key[0],
    value: parseFloat(item.values[0])
  }));

  const landYta = landYtaData.data.map(item => ({
    region: item.key[0],
    area: parseFloat(item.values[0])
  }));


  const result = skog.map(item => {
    const regionName = regionCodes[item.region];
    const yta = landYta.find(l => l.region === item.region)?.area;
    const procent = (item.value / yta) * 100;
    return {
      region: regionName,
      value: parseFloat(procent.toFixed(2))
    };
  });

  return {
    regions: result.map(r => r.region),
    values: result.map(r => r.value)
  };

}

async function displaySkogDataOnMap() {
  const mapData = await calculateSkogData();
  
  var data = [{
    type: "choroplethmap",
    locations: mapData.regions,
    featureidkey: "properties.name",
    z: mapData.values,
    geojson: "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
    colorscale: [
      [0, 'white'],      // Lägsta värde 
      [0.5, 'lightgrey'], // Medelvärde 
      [1, 'darkgray']     // Högsta värde
    ],
      coloraxis: {
    colorbar: {
      title: "Produktiv skogsmark (%)",

    }
  }
  }];
  
  var layout = {
    map: {center: {lon: 17.3, lat: 63}, zoom: 3, style: 'dark'},
    height: 550, width: 320,
    title: "Andel produktiv skogsmark per län (2020)",
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };
  
  Plotly.newPlot('skogStatestik', data, layout, { displayModeBar: false});
}

// Bara ett anrop till displayskogDataOnMap
displaySkogDataOnMap();


