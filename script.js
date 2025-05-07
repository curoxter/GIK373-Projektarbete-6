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

  const fs = require('fs');
  const csv = require('csv-parser');
  
  fs.createReadStream('data_animal.csv')
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');
    });