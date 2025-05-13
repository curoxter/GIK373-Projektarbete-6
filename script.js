/* const fs = require('fs');
const csv = require('csv-parser');

fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.Name === 'Sweden') { 
      console.log(row);
    }
  })
  .on('end', () => {
    console.log('Only Swedish data processed.');
  }); */

/* const fs = require('fs');
const csv = require('csv-parser');
fs.createReadStream('data_animal.csv')
.pipe(csv())
.on('data', (row) => {
  console.log(row);
})
.on('end', () => {
    console.log('CSV file successfully processed.');
}); */

// 1. Ladda och parsa CSV-filen
Papa.parse('data_animal.csv', {
/*   download: true,
  header: true,
  complete: function(results) {
    const firstRow = results.data[0];
    console.log("📌 Kolumnnamn:", Object.keys(firstRow));
  }
}); */
 
 
   download: true,
  header: true,
  complete: function(results) {
    const data = results.data;

    // 2. Räkna antal förekomster per art (ScientificName)
    const counts = {};
    data.forEach(row => {
      const name = row.species || 'Okänd';
      if (!counts[name]) {
        counts[name] = 1;
      } else {
        counts[name]++;
      }
    });

    // 3. Förbered data till Chart.js
    const labels = Object.keys(counts);
    const values = Object.values(counts);

    // 4. Rita diagram
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.slice(0, 20), // visa t.ex. bara 20 st för överskådlighet
        datasets: [{
          label: 'Antal förekomster per art',
          data: values.slice(0, 20),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});
