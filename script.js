
Papa.parse('mammalia.csv', { 
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;

    const firstRow = results.data[0];
    console.log("📌 Kolumnnamn:", Object.keys(firstRow));

    data.forEach(row => {
      const sortering = row["Svenskt namn"]?.trim();
     
      
      if (sortering) {
        console.log("info:", sortering);
      }
});

    const förekomstMap = {};

    data.forEach(row => {
      const art = row.Art || 'Okänd';
      const förekomst = row["Svensk förekomst"]?.trim();

      if (art && förekomst) {
         if (!förekomstMap[förekomst]) {
           förekomstMap[förekomst] = new Set();
         }
         förekomstMap[förekomst].add(art);
      };
    });
    const labels = Object.keys(förekomstMap);
    const counts = labels.map(key => förekomstMap[key].size);

    const myChart = new Chart(document.getElementById('myChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Antal arter',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Antal arter per svensk förekomst'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Svensk förekomst'
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 0
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Antal arter'
            }
          }
        }
      }
    });
  }
});


/* Papa.parse('mammalia.csv', { 
  download: true,
  header: true,
  complete: function(results) {
    const firstRow = results.data[0];
    console.log("📌 Kolumnnamn:", Object.keys(firstRow));
  }
}); */




    
 

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