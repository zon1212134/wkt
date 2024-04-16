const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end(JSON.stringify(process.versions, null, 2));
});
app.listen(process.env.PORT);
