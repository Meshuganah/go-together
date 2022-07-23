import Header from '../components/Header';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {

    return (
        <div>
            <Header />
            <h2>Your Events</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
                <tr>
                    <td>Dance Off</td>
                    <td>The Battle of the Bands</td>
                </tr>
                <tr>
                    <td>1:00</td>
                    <td>3:00</td>
                </tr>
            </table>
            <Calendar />
        </div>
    )
}

export default Home;