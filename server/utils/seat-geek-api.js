require('dotenv').config();

const { RESTDataSource } = require('apollo-datasource-rest');

class SeatGeekAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.seatgeek.com/2/';
    }

    async getEvent(id) {
        return this.get(`events/${encodeURIComponent(id)}?client_id=${process.env.CLIENT_ID}`);
    }

    async getEvents(ids) {
        return this.get(`events/?${ids.map(id => `id=${id}&`).join('')}client_id=${process.env.CLIENT_ID}`);
    }

    async searchEvent(query) {
        return this.get(`events?q=${encodeURIComponent(query.trim())}&client_id=${process.env.CLIENT_ID}`)
    }
}

//     for (const [key, value] of Object.entries(data)) {
//         search += key + '=' + value + '&';
//     }

module.exports = SeatGeekAPI;