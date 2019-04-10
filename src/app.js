const express = require('express');
const path = require('path')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDP = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDP));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rafa Lopez'
    });
});

app.get('/about', (req, res) => {
res.render('about', {
    title: 'About',
    name: 'Rafa Lopez'
});
});

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'This is a help message.',
        name: 'Rafa Lopez'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({error: 'You must provide address term.'});
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            
            //console.log(location);
            //console.log('Data', forecastData);

            res.send({location, forecast:forecastData, adress: req.query.address})
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({error: 'You must provide search term.'});
    }
    res.send({
        product: []
    });
}); 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Rafa Lopez'

    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Rafa Lopez'

    })
});



app.listen(port, () => {
    console.log('Server is up on port: ' + port  + '.')
});

