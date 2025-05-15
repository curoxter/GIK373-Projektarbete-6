
Papa.parse('data_animal.csv', { 
  download: true,
  header: true,
  complete: function(results) {
    const allData = results.data;
    const animaliaData = allData.filter(row => row.kingdom === 'Animalia');

    console.log("✅ Antal rader med kingdom = Animalia:", animaliaData.length);
    console.log(animaliaData);

    // Step 1: Count occurrences by species and locality
    const speciesLocalityCounts = {}; // { species: { locality: count } }

    allData.forEach(row => {
      const species = row.species || 'Okänd';
      const locality = row.locality || 'Okänd plats';

      console.log(locality);

      if (!speciesLocalityCounts[species]) {
        speciesLocalityCounts[species] = {};
      }

      if (!speciesLocalityCounts[species][locality]) {
        speciesLocalityCounts[species][locality] = 1;
      } else {
        speciesLocalityCounts[species][locality]++;
      }
    });

    // Step 2: Prepare top species and get all unique localities
    const topSpecies = Object.entries(speciesLocalityCounts)
      .sort((a, b) => {
        const totalA = Object.values(a[1]).reduce((sum, val) => sum + val, 0);
        const totalB = Object.values(b[1]).reduce((sum, val) => sum + val, 0);
        return totalB - totalA;
      })
      .slice(0, 10); // Top 10 species

    const localitiesSet = new Set();
    topSpecies.forEach(([species, localityCounts]) => {
      Object.keys(localityCounts).forEach(loc => localitiesSet.add(loc));
    });

    const allLocalities = Array.from(localitiesSet);

    // Step 3: Prepare datasets for Chart.js
    const datasets = allLocalities.map(locality => {
      return {
        label: locality,
        data: topSpecies.map(([species, counts]) => counts[locality] || 0),
        backgroundColor: `hsl(${Math.random() * 360}, 60%, 70%)`
      };
    });

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topSpecies.map(([species]) => species),
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Arter (Animalia) och deras förekomst per lokalitet'
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true,
            stacked: true
          }
        }
      }
    });
  }
});



    
 

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