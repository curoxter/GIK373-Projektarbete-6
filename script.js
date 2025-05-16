/* Papa.parse('data.csv', { 
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;

    // Filtrera ut raden för Sverige
    const swedenRow = data.find(row => row["Name"]?.trim() === "Sweden");

    if (!swedenRow) {
      console.error("Hittade inte 'Sweden' i datan.");
      return;
    }

    // Välj ut kolumnerna (för alla grupper)

    const grupper = [
      { kolumn: "Mammals", etikett: "Däggdjur" },
      { kolumn: "Birds", etikett: "Fåglar" },
      { kolumn: "Reptiles*", etikett: "Kräldjur" },
      { kolumn: "Amphibians", etikett: "Amfibier" },
      { kolumn: "Fishes*", etikett: "Fiskar" },
      { kolumn: "Molluscs*", etikett: "Blötdjur" },
      { kolumn: "Other Inverts*", etikett: "Ryggradslösa djur" },
      { kolumn: "Plants*", etikett: "Växter" },
      { kolumn: "Fungi*", etikett: "Svampar" },
      { kolumn: "Chromists*", etikett: "Kromister" }
    ];

    const values = grupper.map(g => parseInt(swedenRow[g.kolumn]) || 0);
    const labels = grupper.map(g => g.etikett);

    const dataChart = new Chart(document.getElementById("dataChart"), {
      type: 'bar',
      data: {
        labels: labels, // ta bort asterisk
        datasets: [{
          label: 'Rödlistade arter i Sverige',
          data: values,
          backgroundColor: 'rgba(196, 25, 25, 0.6)',
          borderColor: 'rgb(76, 5, 5)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Antal arter'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Organismgrupp'
            }
          }
        }
      }
    });
  }
}); */

/* const urlRedList = 'https://api.artdatabanken.se/taxonlistservice/v1/definitions';

const queryRedList = 
{
  "query": [
    {
      "code": "conservationLists",
    }
  ]
} */

fetch('https://api.artdatabanken.se/taxonlistservice/v1/definitions', {
  headers: {
    'Ocp-Apim-Subscription-Key': '9b2fe9b15b6f43fb980b960b7553dddd',
  }
})
.then(response => response.json())
.then(data => {
  const lists = data.conservationLists;
  
    // Om det är ett objekt med nycklar och värden:
    // Gör labels av nycklar och data av värden
  const labels = Object.keys(lists);
  const values = labels.map(key => lists[key]);
  console.log('conservationLists:', lists);
  console.log('Labels:', labels);
  console.log('Values:', values);
  
    // Skapa en bar chart
    const chart = new Chart(document.getElementById('dataChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rödlistade arter',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
          x: { title: { display: true, text: 'Kategori' } }
        },
        plugins: {
          title: {
            display: true,
            text: 'Conservation Lists Statistik'
          }
        }
      }
    });
  })
.catch(error => console.error(error));
    
 

/* const urlSCB = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/FolkmangdDistrikt";

const querySCB = 
{
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:ELandskap",
        "values": [
          "101",
          "102",
          "103",
          "104",
          "105",
          "106",
          "107",
          "108",
          "109",
          "110",
          "211",
          "212",
          "213",
          "214",
          "215",
          "217",
          "316",
          "318",
          "319",
          "320",
          "321",
          "322",
          "323",
          "324",
          "325",
          "999"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
}
const request = new Request((urlSCB), {
method: "POST",
body: JSON.stringify(querySCB)
});

fetch(request)
.then(response => response.json())
.then(printSCBChart);

function printSCBChart(dataSCB){
console.log(dataSCB);
const years = dataSCB.data;
console.log(years);

const labels = years.map(year => year.key[1]);
console.log(labels);

const datasets = [{
label: "Befolkningsutveckling Sverige",
data: data,
}]

const myChart = new Chart (
            document.getElementById('scb'),
            {
                type: "line",
                data: {labels: labels, datasets: datasets}
            }
        );
        }
  
 */