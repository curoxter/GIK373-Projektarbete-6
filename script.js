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

//skyddad natur
const SCBUrl = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/SkyddadnaturN"
const SCBQuery ={
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
          "000003HE"
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
          "000003HL"
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
    "format": "JSON"
  }
};

//skyddad natur karta
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
    zmax: 40,
    colorscale: "YlGnBu",
    colorbar: {
      title: "Skyddad Natur (%)"
    }
  }];

  const layout = {
    map: { center: { lon: 17.3, lat: 63 }, zoom: 3.3 },
    width: 570,
    height: 750,
    title: "Andel skyddad natur per län (%)"
  };

  Plotly.newPlot('hektarStatistik', data, layout, { displayModeBar: false });




}
displayHektarDataOnMap();




function printByggChart(byggData) {
  const years = byggData.data;
  console.log(years);
  const labels = years.map((year) => year.key[0]);
  console.log(labels);
  const data = years.map((year) => year.values[0]);
  console.log(data);

  const datasets = [
    {
      label: 'Bebyggelse Sverige',
      data,
      fill: false,
      borderWidth: 2,
      borderColor: 'hsla(250, 100%, 30%, 1)',
      hoverBorderWidth: 4
    }
  ];
  
const byggChart = new Chart(document.getElementById('bygg'), {
  type: 'bar',
  data: { labels, datasets}
});
}
const request = new Request(byggUrl, {
  method: 'POST',
  body: JSON.stringify(byggQuery)
});
fetch(request)
  .then((response) => response.json())
  .then(printByggChart);


// skyddad natur
  
async function calculateSCBData() {
const SCBData = await fetch(SCBUrl, {
    method: "POST",
    body: JSON.stringify(SCBQuery)
}).then((response) => response.json());

    console.log(SCBData);

const SCBValues = SCBData.data.map(
    (SCBDataItem) => SCBDataItem.values[0]);

        console.log(SCBValues);

const values = SCBValues.map(value => parseFloat(value));

     const regions = SCBData.data.map(
        SCBDataItem => 
            regionCodes[SCBDataItem.key[0]]
    );

    const mapData = {
        regions: regions,
        values: values
    };

    console.log(mapData);
    return mapData;
};

calculateSCBData();
async function displaySCBDataOnMap(){
const mapData = await calculateSCBData();
console.log(mapData);

var data = [{
  type: "choroplethmap", locations:mapData.regions,
  featureidkey: "properties.name",
   z: mapData.values.map(value => parseFloat(value)),
  geojson: "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
  colorscale: [
  [0, 'red'],       // Lägsta värde (röd)
  [0.5, 'orange'],  // Medelvärde (gul)
  [1, 'yellow']      // Högsta värde (grön)
],
  colorbar: {
    title: "Skyddad Natur (%)"
  }

}];

var layout = {map: {center: {lon: 17.3, lat: 63}, zoom: 3.3},
            width: 570,
            height: 750,

            title: "Procentuell andel skyddad natur per län (2023)"
            };

Plotly.newPlot('natureStatistics', data, layout, { displayModeBar: false });
}
displaySCBDataOnMap();





// Gör bara ett anrop till displayskogDataOnMap, som i sin tur anropar calculateskogData
async function calculateskogData() {
  // Hämta skogsdata
  const skogData = await fetch(skogUrl, {
    method: "POST",
    body: JSON.stringify(skogQuery)
  }).then((response) => response.json());
  
  console.log("Skogsdata:", skogData);
  
  // Hämta landytedata
  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery)
  }).then((response) => response.json());
  
  console.log("Landytedata:", landYtaData);
  
  // Extrahera skogsvärdena från API-svaret
  const skogValues = skogData.data.map(
    (skogDataItem) => skogDataItem.values[0]
  );
  
  // Konvertera skogsvärdena till float
  const values = skogValues.map(value => parseFloat(value));
  console.log("Skogsvärden:", values);
  
  // Extrahera landytevärdena från API-svaret - ta bara ArealTyp "01" (landareal)
  const landYtaValues = [];
  
  // Gå igenom landytedata och ta bara värdena för arealtyp "01"
  for (let i = 0; i < landYtaData.data.length; i += 3) {  // Antar att data kommer i grupper om 3 (01, 02, 03)
    const value = parseFloat(landYtaData.data[i].values[0]) * 100;  // Konvertera km² till hektar
    landYtaValues.push(value);
  }
  console.log("Landytevärden:", landYtaValues);
  
  // Beräkna normaliserade värden (procent)
  const normalizedValues = [];
  for (let i = 0; i < values.length; i++) {
    if (landYtaValues[i] === 0 || isNaN(landYtaValues[i])) {
      normalizedValues.push(0); // Sätt till 0 om landyta saknas
    } else {
      const normalized = (values[i] / landYtaValues[i]) * 100;
      // Begränsa värdet till 100%
      normalizedValues.push(isFinite(normalized) ? Math.min(normalized, 100) : 0);
    }
  }
  
  console.log("Normaliserade värden (%):", normalizedValues);
  
  // Extrahera regionnamn
  const regions = skogData.data.map(
    skogDataItem => regionCodes[skogDataItem.key[0]]
  );
  
  // Skapa och returnera mapData-objektet
  const mapData = {
    regions: regions,
    values: normalizedValues
  };
  
  console.log("MapData:", mapData);
  return mapData;
}

async function displayskogDataOnMap() {
  const mapData = await calculateskogData();
  
  var data = [{
    type: "choroplethmap",
    locations: mapData.regions,
    featureidkey: "properties.name",
    z: mapData.values,
    geojson: "https://raw.githubusercontent.com/okfse/sweden-geojson/refs/heads/master/swedish_regions.geojson",
    colorscale: [
      [0, 'red'],      // Lägsta värde 
      [0.5, 'orange'], // Medelvärde 
      [1, 'yellow']     // Högsta värde
    ],
    colorbar: {
      title: "Produktiv skogsmark (%)"
    }
  }];
  
  var layout = {
    map: {center: {lon: 17.3, lat: 63}, zoom: 3.3},
    width: 350, height: 550,
    title: "Andel produktiv skogsmark per län (2020)"
  };
  
  Plotly.newPlot('skogstatestik', data, layout, { displayModeBar: false });
}

// Bara ett anrop till displayskogDataOnMap
displayskogDataOnMap();


