

const urlSCB3 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvN";

// Definiera query korrekt
const query = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:RegionRiket99",
        "values": [
          "00"
        ]
      }
    },
    {
      "code": "Markanvandningsklass",
      "selection": {
        "filter": "item",
        "values": [
          "11", "14", "16", "211", "212", "213", 
          "3", "421", "811", "911", "85"
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

// Mappning för markanvändningsklasser
const markanvMap = {
  "11": "Bebyggd mark",
  "14": "Åkermark",
  "16": "Betesmark",
  "211": "Skogsmark, produktiv",
  "212": "Skogsmark, improduktiv",
  "213": "Skogsmark på myr",
  "3": "Myr",
  "421": "Berg i dagen och övrig mark",
  "811": "Sjöar och vattendrag",
  "911": "Hav",
  "85": "Golfbanor och skidpister"
};

const request = new Request(urlSCB3, {
  method: 'POST',
  body: JSON.stringify(query)
});

fetch(request)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    printSCBChart(data);
  });

function printSCBChart(dataSCB) {
  console.log(dataSCB);
  
  const items = dataSCB.data;
  console.log(items);
  
  // Hämta etiketter - använd markanvMap om det finns, annars koden
  const labels = items.map(item => markanvMap[item.key[1]] || item.key[1]);
  console.log(labels);
  
  // Hämta ut värdena
  const data = items.map(item => item.values[0]);
  console.log(data);
  
  // Enkla färger
  const backgroundColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)'
  ];
  
  const datasets = [{
    label: "Markanvändning i Sverige",
    data: data,
    backgroundColor: backgroundColors
  }];
  
  // Skapa diagrammet
  const myChart = new Chart(
    document.getElementById('scb'),
    {
      type: "bar",
      data: {
        labels: labels, 
        datasets: datasets,
      }
    }
  );
}


const urlSCB2 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvN";


const query2 = {
"query": [
  {
    "code": "Region",
    "selection": {
      "filter": "vs:RegionRiket99",
      "values": [
        "00"
      ]
    }
  },
  {
    "code": "Markanvandningsklass",
    "selection": {
      "filter": "item",
      "values": [
        "11", "14", "16", "211", "212", "213", 
        "3", "421", "811", "911", "85"
      ]
    }
  },
  {
    "code": "Tid",
    "selection": {
      "filter": "item",
      "values": [
        "2015" 
      ]
    }
  }
],
"response": {
  "format": "json"
}
};

const markanvMap2 = {
"11": "Bebyggd mark",
"14": "Åkermark",
"16": "Betesmark",
"211": "Skogsmark, produktiv",
"212": "Skogsmark, improduktiv",
"213": "Skogsmark på myr",
"3": "Myr",
"421": "Berg i dagen och övrig mark",
"811": "Sjöar och vattendrag",
"911": "Hav",
"85": "Golfbanor och skidpister"
};

// Nytt variabelnamn för request
const request2 = new Request(urlSCB2, {
method: 'POST',
body: JSON.stringify(query2)
});

fetch(request2)
.then(response => response.json())
.then(data => {
  console.log(data);
  printSCBChart2(data);
});

function printSCBChart2(dataSCB) {
console.log(dataSCB);

const items2 = dataSCB.data;
console.log(items2);

const labels2 = items2.map(item => markanvMap2[item.key[1]] || item.key[1]);
console.log(labels2);

// Hämta ut värdena
const data2 = items2.map(item => item.values[0]);
console.log(data2);

const backgroundColors2 = [
  'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)'
];

const datasets2 = [{
  label: "Markanvändning i Sverige 2015",
  data: data2,
  backgroundColor: backgroundColors2
}];

const myChart2 = new Chart(
  document.getElementById('scb2'),
  {
    type: "bar",
    data: {
      labels: labels2, 
      datasets: datasets2
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Markanvändning i Sverige 2015' // Tydlig titel
        }
      }
    }
  }
);
}

//
const landUrl =
  'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803B/MarkanvByggnadLnKnN';

const landQuery = {
  query: [
    {
      code: 'Region',
      selection: {
        filter: 'vs:BRegionLän07EjAggr',
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
      code: 'Byggnadstyp',
      selection: {
        filter: 'item',
        values: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9'
        ]
      }
    },
    {
      code: 'Tid',
      selection: {
        filter: 'item',
        values: [
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020',
          '2021',
          '2022',
          '2023'
        ]
      }
    }
  ],
  response: {
    format: 'JSON'
  }
};

async function calculateLandData() {
  const landData = await fetch(landUrl, {
    method: 'POST',
    body: JSON.stringify(landQuery)
  }).then((response) => response.json());

  console.log(landData);
}
calculateLandData();




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
          "2023"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
}


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
  [0.5, 'yellow'],  // Medelvärde (gul)
  [1, 'green']      // Högsta värde (grön)
],
  colorbar: {
    title: "Skyddad Natur (%)"
  }

}];

var layout = {map: {center: {lon: 17.3, lat: 63}, zoom: 3.3},
              width: 370, height:650,
            title: "Procentuell andel skyddad natur per län (2023)"
            };

Plotly.newPlot('energyStatistics', data, layout);


}

displaySCBDataOnMap();

