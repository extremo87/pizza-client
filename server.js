const express = require(`express`);
const path = require(`path`);
const app = express();

app.use(express.static(path.join(__dirname, `public`)));


app.get(`/*`, function (req, res) {
  res.sendFile(path.join(__dirname, `public`, `index.html`), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(80);

console.log(`Pizza server started`);
