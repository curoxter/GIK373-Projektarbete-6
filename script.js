const fs = require('fs');
const csv = require('csv-parser');

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row); // Each row becomes a JS object
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });