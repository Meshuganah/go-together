import { useMutation } from "@apollo/client";
import { REMOVE_EVENT } from "../utils/mutations";
import dayjs from "dayjs";

const EventList = ({ events, username, selectedDate }) => {
    const [addEvent, { data, loading, error }] = useMutation(REMOVE_EVENT);

    const handleRemoveEvent = async (event) => {
        let id = event.target.id.toString();
        const data = await addEvent({ variables: { id: id }});
    }

    return (
        <div>
            <h2>{username}</h2>
            {events && events.map(event => {
                if (selectedDate !== dayjs(event.datetime_local).format("MM-DD-YYYY")) {
                    return '';
                }
                return (
                    <div key={event.id}>
                        <h3>{event.title}</h3>
                        <span>{event.venue.name}</span>
                        <span>{event.date}</span>
                        <button id={event.id} onClick={handleRemoveEvent}>Can't Make It!</button>
                    </div>
                )
            })}
        </div>
    );
};

export default EventList;