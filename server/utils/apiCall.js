const apiCall = ( { query, ...data } ) => {
    const client_id = ''
    const url = 'https://api.seatgeek.com/2/events?'

    const searchUrl = query.trim().replace(' ', '+');
    fetch(searchUrl).then
}

export default apiCall;