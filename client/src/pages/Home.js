import Header from '../components/Header';
import EventList from '../components/EventList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs'

import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Home = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_ME, {
        variables: { username: userParam }
    });

    console.log(data);

    const user = data.me;

    const mark = new Set(['07-27-2022', '07-01-2022']);

    return (
        <div>
            <Header />
            {/* <h2>Your Events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dance Off</td>
                        <td>The Battle of the Bands</td>
                    </tr>
                    <tr>
                        <td>1:00</td>
                        <td>3:00</td>
                    </tr>
                </tbody>
            </table> */}
            <EventList events={user.events} username={user.username}></EventList>
            <Calendar
                tileContent={({ date, view }) => {
                    //console.log(dayjs(date).format('MM-DD-YYYY'), mark.has(dayjs(date).format('MM-DD-YYYY')));
                    if (mark.has(dayjs(date).format('MM-DD-YYYY'))) {
                        return (
                            <>
                                <p style={{ fontSize: '20px', margin: '0', color: 'green' }}>•</p>
                            </>
                        );
                    }
                }}
            />
        </div>
    )
}

export default Home;