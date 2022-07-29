import Header from '../components/Header';
import EventList from '../components/EventList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'

import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs().format('MM-DD-YYYY'));
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { username: userParam }
    })

    if (loading) return "Loading";
    console.log(data);

    let user;
    let mark;

    try {
        user = data?.me;

        let dates = [];

        user?.events.forEach(event => {
            dates.push(dayjs(event.datetime_local).format('MM-DD-YYYY'))
        });

        mark = new Set(dates);
    } catch(error) {
        console.log(error);
    }

    return (
        <div>
            <Header />
            <div className='d-flex justify-content-around flex-wrap'>
            <Calendar
                classname='calendar'
                onChange={(value, event) => {
                    setSelectedDate(dayjs(value).format('MM-DD-YYYY'));
                }}
                tileContent={({ date, view }) => {
                    if (mark.has(dayjs(date).format('MM-DD-YYYY'))) {
                        return (
                            <>
                                <p style={{ fontSize: '20px', margin: '0', color: 'green' }}>•</p>
                            </>
                        );
                    }
                }}
            />
            <EventList events={user.events} username={user.username} selectedDate={selectedDate}></EventList>
            </div>
        </div>
    )
}

export default Home;