require('dotenv').config();
const https = require('https');

const apiCall = async ( { query, id, ...data } ) => {
    const url = 'https://api.seatgeek.com/2/events';

    let search = '';
    
    if (id) {
        search += '/' + id + '?';
    } else {
        search += '?'
    }

    if (query) {
        search += "q=" + query.trim().replace(' ', '+') + '&';
    }

    for (const [key, value] of Object.entries(data)) {
        search += key + '=' + value + '&';
    }

    search += 'client_id=' + process.env.CLIENT_ID;

    return https.get(url + search, async (response) => {
        let data = '';

        response.on('data', async (chunk) => {
            data += chunk;
        });

        response.on('end', async () => {
            return JSON.parse(data);
        });
    }).on('error', async (err) => {
        return 'Error: ' + err.message;
    })
}

module.exports = apiCall;