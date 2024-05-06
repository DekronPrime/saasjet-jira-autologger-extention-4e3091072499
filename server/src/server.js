import express from 'express';

const app = express();

app.get('/data', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(8000);
