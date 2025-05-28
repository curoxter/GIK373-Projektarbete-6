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
    zmax: 15,
    colorscale:  [  
    [0, "#E9E9E9"], 

    [0.33, "#8EB1B9"],

    [0.66, "#4A7E89"],
   
    [1, "#3A6A74"]
    ],
    colorbar: {
      title: "Bebbyggelse (%)",
      tickvals: [0, 5, 10, 15],
      tickfont: {color: '#1b291e'},
      ticktext: ["0%", "5%", "10%", "15+%"]
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
      [0.0, "#CCB8C0"],
      [0.2, "#B295A1"],
      [0.4, "#987182"],
      [0.6, "#765664"],
      [0.8, "#533C46"],
      [1.0, "#3B2B32"]
    ],
    colorbar: {
      title: "Produktiv skogsmark (%)",
      tickvals: [10, 30, 50, 70, 90, 100],
      tickfont: {color: '#1b291e'},
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
    zmax: 30,
colorscale:  [  
  [0.0, "#DCECC7"],  
  [0.33, "#AABD8C"], 
  [0.66, "#7E985F"], 
  [1.0, "#4F6039"]   
],
    colorbar: {
      title: "Skyddad Natur (%)",
    tickvals: [0, 5, 10, 15, 20, 25, 30],
    tickfont: {color: '#1b291e'},
    ticktext: ["0%", "5%", "10%", "15%", "20%", "25%", "30%"]
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
  canvas.height = 30 * labels.length;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Bebyggd mark (%)',
          data: byggArr,
          backgroundColor: '#4A7E89'
        },
        {
          label: 'Produktiv skogsmark (%)',
          data: skogArr,
          backgroundColor: '#765664'
        },
        {
          label: 'Skyddad natur (%)',
          data: skyddArr,
          backgroundColor: '#7E985F'
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
          align: 'start',
          labels: {
            color: '#fff',
            align: 'start'
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
        backgroundColor: ['#4A7E89', '#765664', '#7E985F']
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
      display: false // Tar bort färgrutor (legend) under diagrammet
    },
    title: {
      display: true,
      text: 'Total andel i hela Sverige', 
      color: '#FFF',
      font: {
        size: 16
      }
    }
    }
    }
  });
}
createtotalChart();


// Förhindrar scroll till toppen vid klick på meny
function showSidebar(event) {
  if (event) event.preventDefault(); 
  document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar(event) {
  if (event) event.preventDefault(); 
  document.querySelector('.sidebar').style.display = 'none';
}