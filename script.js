//HÄR ÄR APIN FRÅN DJUREN
const API_KEY = '2ac7992d7a5a478486a068f5b0445068';

// Konstanter för rödlistans kategorier
const REDLIST_CATEGORIES = {
  'CR': 'Akut hotad'
};

// Funktion för att visa statusmeddelanden
function showMessage(message, isError = false) {
  let messageElement = document.getElementById('statusMessage');
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'statusMessage';
    messageElement.style.padding = '10px';
    messageElement.style.margin = '10px 0';
    messageElement.style.textAlign = 'center';
    document.body.appendChild(messageElement);
  }
  
  messageElement.textContent = message;
  messageElement.style.backgroundColor = isError ? '#ffdddd' : '#eaeaea';
  messageElement.style.color = isError ? '#cc0000' : '#333333';
}

// Funktion för att hämta akut hotade däggdjur
async function fetchCriticallyEndangeredMammals() {
  showMessage('Hämtar data om akut hotade däggdjur...');
  
  try {
    // För demonstrationsändamål använder vi hårdkodad data
    // I verkligheten skulle vi anropa API:et
    const demoData = [
      { name: "Fjällräv", scientificName: "Vulpes lagopus", category: "CR" },
      { name: "Varg", scientificName: "Canis lupus", category: "CR" },
      { name: "Sydlig järv", scientificName: "Gulo gulo", category: "CR" },
      { name: "Brunbjörn", scientificName: "Ursus arctos", category: "CR" },
      { name: "Lodjur", scientificName: "Lynx lynx", category: "CR" }
    ];
    
    // Simulera en API-fördröjning
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showMessage('Data hämtad, skapar tabell och diagram...');
    
    // Skapa både tabell och diagram för att visa datan
    createEndangeredMammalsList(demoData);
    createEndangeredMammalsChart(demoData);
    
    // I en riktig implementation skulle vi göra följande:
    /*
    // 1. Hitta rödlistans ID
    const definitionsResponse = await fetch('https://api.artdatabanken.se/taxonlistservice/v1/definitions', {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY }
    });
    const definitions = await definitionsResponse.json();
    const redlistDef = definitions.find(d => d.name && d.name.includes('Rödlista'));
    
    if (!redlistDef) throw new Error('Kunde inte hitta rödlistan');
    
    // 2. Hämta rölistade arter
    const redlistResponse = await fetch(`https://api.artdatabanken.se/taxonlistservice/v1/taxonlist/${redlistDef.id}`, {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY }
    });
    const redlistData = await redlistResponse.json();
    
    // 3. Filtrera ut bara däggdjur med kategori CR
    const criticallyEndangeredMammals = redlistData.filter(species => 
      species.taxonCategory === 'Mammalia' && species.redListCategory === 'CR'
    );
    */
    
  } catch (error) {
    console.error('Fel vid hämtning av data:', error);
    showMessage('Ett fel uppstod: ' + error.message, true);
  }
}

// Funktion för att skapa en tabell över akut hotade däggdjur
function createEndangeredMammalsList(data) {
  // Skapa container
  let container = document.getElementById('mammalsContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'mammalsContainer';
    container.style.maxWidth = '800px';
    container.style.margin = '20px auto';
    document.body.appendChild(container);
  }
  
  // Skapa rubrik
  const heading = document.createElement('h2');
  heading.textContent = 'Akut hotade däggdjur i Sverige';
  heading.style.textAlign = 'center';
  container.appendChild(heading);
  
  // Skapa tabell
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '20px';
  
  // Skapa tabellhuvud
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  const headers = ['Art', 'Vetenskapligt namn', 'Hotkategori'];
  headers.forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    th.style.backgroundColor = '#f2f2f2';
    th.style.padding = '8px';
    th.style.border = '1px solid #ddd';
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Skapa tabellkropp
  const tbody = document.createElement('tbody');
  
  data.forEach((species, index) => {
    const row = document.createElement('tr');
    row.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
    
    // Skapa celler
    const nameCell = document.createElement('td');
    nameCell.textContent = species.name;
    nameCell.style.padding = '8px';
    nameCell.style.border = '1px solid #ddd';
    
    const scientificNameCell = document.createElement('td');
    scientificNameCell.textContent = species.scientificName;
    scientificNameCell.style.fontStyle = 'italic';
    scientificNameCell.style.padding = '8px';
    scientificNameCell.style.border = '1px solid #ddd';
    
    const categoryCell = document.createElement('td');
    categoryCell.textContent = REDLIST_CATEGORIES[species.category];
    categoryCell.style.padding = '8px';
    categoryCell.style.border = '1px solid #ddd';
    categoryCell.style.color = '#cc0000';
    
    // Lägg till celler i raden
    row.appendChild(nameCell);
    row.appendChild(scientificNameCell);
    row.appendChild(categoryCell);
    
    // Lägg till raden i tabellkroppen
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  container.appendChild(table);
  
  // Lägg till beskrivningstext
  const description = document.createElement('p');
  description.textContent = 'Akut hotad (CR) betyder att arten löper extremt stor risk att dö ut i vilt tillstånd i Sverige.';
  description.style.marginTop = '10px';
  description.style.fontStyle = 'italic';
  container.appendChild(description);
}

// Funktion för att skapa ett diagram över akut hotade däggdjur
function createEndangeredMammalsChart(data) {
  // Skapa canvas-element för diagrammet
  let container = document.getElementById('chartContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'chartContainer';
    container.style.maxWidth = '800px';
    container.style.height = '400px';
    container.style.margin = '30px auto';
    document.body.appendChild(container);
    
    const canvas = document.createElement('canvas');
    canvas.id = 'mammalsChart';
    container.appendChild(canvas);
  }
  
  // Skapa data för diagrammet (population per art - simulerat)
  const populations = [
    { species: "Fjällräv", population: 120 },
    { species: "Varg", population: 300 },
    { species: "Sydlig järv", population: 85 },
    { species: "Brunbjörn", population: 230 },
    { species: "Lodjur", population: 190 }
  ];
  
  // Skapa diagrammet
  const ctx = document.getElementById('mammalsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: populations.map(item => item.species),
      datasets: [{
        label: 'Uppskattad population',
        data: populations.map(item => item.population),
        backgroundColor: 'rgba(220, 20, 60, 0.7)',
        borderColor: 'rgba(220, 20, 60, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Uppskattad population av akut hotade däggdjur i Sverige',
          font: {
            size: 16
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Population: ${context.raw} individer`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Art'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Antal individer'
          },
          beginAtZero: true
        }
      }
    }
  });
}

// Initiera applikationen
function initApp() {
  // Hämta och lägg till Chart.js om det inte redan finns
  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = fetchCriticallyEndangeredMammals;
    document.head.appendChild(script);
  } else {
    fetchCriticallyEndangeredMammals();
  }
}

// Starta applikationen när sidan är laddad
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

const urlSCB = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0803/MI0803A/MarkanvN";

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

const request = new Request(urlSCB, {
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
        datasets: datasets
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