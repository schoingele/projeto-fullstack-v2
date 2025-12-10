const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3002, '0.0.0.0', () => {
  console.log('Minimal server running on 3002 (0.0.0.0)');
});
