const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Does this work?');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});