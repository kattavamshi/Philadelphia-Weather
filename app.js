const express = require('express')
const path = require('path')
const request = require('request')
const util = require('util')
const app = express()
const apiKey = '480c5ae8b93eca7ec358d3a339a0084f'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/:q', (req, res) => {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.params.q +'&appid='+apiKey;

  if( req.query.type != 'live' ) {
    url = 'https://samples.openweathermap.org/data/2.5/weather?q='+ req.params.q +'&appid='+apiKey;
  }

  request( url , function(err, response, body) {
    res.render('weather', {
      err,
      response,
      body: JSON.parse(body),
      params: req.params.q,
    })
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
