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


// bebyggelsekarta
async function calculateByggData() {
  const byggData = await fetch(byggUrl, {
    method: "POST",
    body: JSON.stringify(byggQuery)
  }).then(res => res.json());

  const landYtaData = await fetch(landYtaUrl, {
    method: "POST",
    body: JSON.stringify(landYtaQuery)
  }).then(res => res.json());

  const bygg = byggData.data.map(item => ({
    region: item.key[0],
    value: parseFloat(item.values[0])
  }));

  const landYta = landYtaData.data.map(item => ({
    region: item.key[0],
    area: parseFloat(item.values[0])
  }));


  const result = bygg.map(item => {
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

async function displayByggDataOnMap() {
  const mapData = await calculateByggData();
  
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
      title: "Bebbyggelse (%)",
      tickvals: [10, 30, 50, 70, 90, 100],
      tickfont: {color: 'white'},
      ticktext: ["0–20%", "20–40%", "40–60%","60–80%", "80–100%"]
    }
  }];
  
  const layout = {
    map: {center: {lon: 17.3, lat: 63}, zoom: 3, style: 'dark'},
    height: 550, width: 450,
    title: "Andel bebyggelse per län (2020)",
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };
  
  Plotly.newPlot('byggStatistik', data, layout, { displayModeBar: false});
}

// Bara ett anrop till displayskogDataOnMap
displayByggDataOnMap();


/* 

//Bebyggelse i hektar
  async function printByggChart(byggData) {
    // Hämta landyta data
    const landYtaData = await fetch(landYtaUrl, {
      method: "POST",
      body: JSON.stringify(landYtaQuery)
    }).then(res => res.json());
    
    const landYta = landYtaData.data.map(item => ({
      region: item.key[0],
      area: parseFloat(item.values[0])
    }));
  
    const years = byggData.data;
    
    const result = years.map(item => {
      const regionCode = item.key[0];
      const regionName = regionCodes[regionCode] || regionCode;
      const matchedRegion = landYta.find(l => l.region === regionCode);
      const yta = matchedRegion ? matchedRegion.area : 1;
      const value = parseFloat(item.values[0]);
      const procent = (value / yta) * 100;
      return {
        region: regionName,
        value: parseFloat(procent.toFixed(2))
      };
    });
    
    const labels = result.map(r => r.region);
    const data = result.map(r => r.value);
    
    const datasets = [{
      label: 'Andel bebyggd mark',
      data: data,
      backgroundColor: 'hsla(166, 69%, 36%, 0.5)',
      hoverBackgroundColor: 'hsla(166, 69%, 36%, 1)'
      
    }];
    
    const canvas = document.getElementById('bygg');
    canvas.height = 20 * labels.length;
    
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              font: {
                size: 10
              },
              color: '#ffffff'
            }
          },
          x: {
            ticks: {
              callback: value => value + '%',
              color: '#ffffff'
            }
          }
        }
      }
    });
  }
  
  // Anropa funktionen
  const request = new Request(byggUrl, {
    method: 'POST',
    body: JSON.stringify(byggQuery)
  });
  
  fetch(request)
    .then((response) => response.json())
    .then(printByggChart);
 */






    
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
      title: "Produktiv skogsmark (%)",
      tickvals: [10, 30, 50, 70, 90, 100],
      tickfont: {color: 'white'},
      ticktext: ["0–20%", "20–40%", "40–60%","60–80%", "80–100%"]
    }
  }];
  
  const layout = {
    map: {center: {lon: 17.3, lat: 63}, zoom: 3, style: 'dark'},
    height: 550, width: 450,
    title: "Andel produktiv skogsmark per län (2020)",
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };
  
  Plotly.newPlot('skogStatestik', data, layout, { displayModeBar: false});
}

// Bara ett anrop till displayskogDataOnMap
displaySkogDataOnMap();




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
    tickfont: {color: 'white'},
    ticktext: ["0–20%", "20–40%", "40–60%","60–80%", "80–100%"]
    }
  }];

  



  const layout = {
  map: {center: {lon: 17.3, lat: 63}, zoom: 3, style: 'dark'},
  width: 450,
  height: 550,
  title: "Andel produktiv skogsmark per län (2020)",
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  };


  Plotly.newPlot('hektarStatistik', data, layout, { displayModeBar: false });

};

displayHektarDataOnMap();


//diagram för alla kartor med län
async function createCompareChart() {
  const [byggData, skogData, hektarData] = await Promise.all([
    fetch(byggUrl, { method: 'POST', body: JSON.stringify(byggQuery) }).then(res => res.json()),
    fetch(skogUrl, { method: 'POST', body: JSON.stringify(skogQuery) }).then(res => res.json()),
    fetch(hektarUrl, { method: 'POST', body: JSON.stringify(hektarQuery) }).then(res => res.json()),
  ]);

  const landYtaData = await fetch(landYtaUrl, { method: 'POST', body: JSON.stringify(landYtaQuery) })
    .then(res => res.json());

  const landYta = landYtaData.data.reduce((acc, item) => {
    acc[item.key[0]] = parseFloat(item.values[0]);
    return acc;
  }, {});

  function procentData(data, type) {
    return data.data.map(item => {
      const code = item.key[0];
      const name = regionCodes[code] || code;
      const yta = landYta[code] || 1;
      const value = parseFloat(item.values[0]);
      const procent = (value / yta) * 100;
      return { region: name, [type]: parseFloat(procent.toFixed(2)) };
    });
  }

  const bygg = procentData(byggData, 'bygg');
  const skog = procentData(skogData, 'skog');
  const hektar = procentData(hektarData, 'skydd');

  // Kombinera data per region
  const combined = {};
  [...bygg, ...skog, ...hektar].forEach(item => {
    if (!combined[item.region]) combined[item.region] = { bygg: 0, skog: 0, skydd: 0 };
    combined[item.region] = { ...combined[item.region], ...item };
  });

  const labels = Object.keys(combined);
  const byggArr = labels.map(l => combined[l].bygg);
  const skogArr = labels.map(l => combined[l].skog);
  const skyddArr = labels.map(l => combined[l].skydd);

  const canvas = document.getElementById('compareChart');
  canvas.height = 20 * labels.length;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Bebyggd mark (%)',
          data: byggArr,
          backgroundColor: '#1b9e77'
        },
        {
          label: 'Produktiv skogsmark (%)',
          data: skogArr,
          backgroundColor: '#d95f02'
        },
        {
          label: 'Skyddad natur (%)',
          data: skyddArr,
          backgroundColor: '#7570b3'
        },
        {
          label: '(X-Axeln beskriver hela länets landyta i %)',
          backgroundColor: '#00000000'
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            callback: value => value + '%',
            color: '#fff'
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: '#fff',
            font: { size: 10 }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff'
          }
        }
      }
    }
  });
}

createCompareChart();


// diagram över total andel (hela Sverige) bebyggelse, produktiv skogsmark och skyddad natur
async function createtotalChart() {
  const [byggRes, skogRes, hektarRes, landYtaRes] = await Promise.all([
    fetch(byggUrl, {method: 'POST', body: JSON.stringify(byggQuery)}).then(res => res.json()),
    fetch(skogUrl, {method: 'POST', body: JSON.stringify(skogQuery)}).then(res => res.json()),
    fetch(hektarUrl, {method: 'POST', body: JSON.stringify(hektarQuery)}).then(res => res.json()),
    fetch(landYtaUrl, { method: 'POST', body: JSON.stringify(landYtaQuery) }).then(res => res.json())
  ]);
  const totalLandyta = landYtaRes.data.reduce((sum, item) => sum + parseFloat(item.values[0]), 0);
  function sumValue(data) {
  return data.data.reduce((sum, item) => sum + parseFloat(item.values[0]), 0);
  }

  const totalBygg = sumValue(byggRes);
  const totalSkog = sumValue(skogRes);
  const totalSkydd = sumValue(hektarRes);

  const procentBygg = (totalBygg / totalLandyta) * 100;
  const procentSkog = (totalSkog / totalLandyta) * 100;
  const procentSkydd = (totalSkydd / totalLandyta) * 100;

  const labels = ["Bebyggd mark", "Produktiv skogsmark", "Skyddad natur"];
  const data = [procentBygg, procentSkog, procentSkydd];

  const totalChart = document.getElementById('totalChart');

  new Chart(totalChart, {
     type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: "Andel av Sveriges yta (%)",
        data: data,
        backgroundColor: ['#1b9e77', '#d95f02', '#7570b3']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: val => val + '%',
            color: '#fff'
          }
        },
        x: {
          ticks: {
            color: '#fff'
          }
        }
      },
      plugins: {
        legend: {
          display: false //tar bort färgrutan i titeln
        }
      }
    }
  });
}
createtotalChart();

function showSidebar(event) {
  if (event) event.preventDefault(); // 🛑 Förhindrar scroll till toppen
  document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar(event) {
  if (event) event.preventDefault(); // 🛑 Samma här
  document.querySelector('.sidebar').style.display = 'none';
}