const fs = require('fs');

const readStream = fs.createReadStream('./hamim.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./hamim2.txt', { encoding: 'utf-8' });
readStream.on('data', (data) => {
  console.log(data);

  writeStream.write(data, (err) => {
    if (err) {
      throw new Error('okError', err);
    }
  });
});

readStream.on('error', (err) => {
  throw new Error('readerror', err);
});

writeStream.on('error', (err) => {
  throw new Error('writeerror', err);
});

writeStream.on("finish",()=>{
  console.log("Data Write successful")
})

readStream.on('end', () => {
  console.log('Data Read Successful');
});
