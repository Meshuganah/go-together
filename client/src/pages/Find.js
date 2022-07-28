import Header from "../components/Header";
import { useState } from 'react';
//require('dotenv').config();

const Find = () => {
    const [search, setSearch] = useState('');
    const [eventList, setEventList] = useState([]);
    let searchedEvents;
    const handleClick = async (e) => {
        try{
            e.preventDefault();
            await fetch(`https://api.seatgeek.com/2/events?q=${search}&client_id=${process.env.REACT_APP_CLIENT_ID}`)
            .then(function(response) {
                if(response.ok) {
                    response.json().then(function(data) {
                        searchedEvents = data;
                        //console.log(searchedEvents);
                        //console.log(searchedEvents.events[0].title)
                        setEventList(searchedEvents);
                        console.log(eventList);
                        // searchedEvents.events.map(eventList => {
                        //     console.log(eventList.title);
                        // });

                    });
                }
            })
        } catch (e) {
            console.error(e);
        }
    };   

    const handleChange = event => {
        setSearch(event.target.value);
    };


    return(
        <div>
            <Header />
            <div>
                <input onChange={handleChange} value={search}></input>
                <button onClick={handleClick} type='submit'>Submit</button>
                {searchedEvents && 
                    searchedEvents.events.map(eventList => (
                        <div>
                            <span>{eventList.title}</span>
                        </div>
                    ))}
            </div>

        </div>
    )
}

export default Find;