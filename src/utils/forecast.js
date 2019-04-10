const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/a5070046d18fc228a2c10e801f4da32e/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Connection fails.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.currently;
            callback(undefined, body.daily.data[0].summary + ' Temperature: ' + data.temperature + '. Precipitation probability: ' + data.precipProbability);
        }
    });
};

module.exports = forecast;
