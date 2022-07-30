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
            <h2 className='fw-bold border-bottom'>{username}</h2>
            {events && events.map(event => {
                if (selectedDate !== dayjs(event.datetime_local).format("MM-DD-YYYY")) {
                    return '';
                }
                return (
                    <div className='my-3 border-bottom'key={event.id}>
                        <h3><a target="_blank" rel="noreferrer" href={event.url}>{event.title}</a></h3>
                        <span>{event.venue.name}</span>
                        <span className="mx-3">{dayjs(event.datetime_local).format('MM/DD/YYYY')}</span>
                        <span>{event.venue.city}, {event.venue.state}</span>
                        <button id={event.id} onClick={handleRemoveEvent} className='btn btn-secondary float-end'>Can't Make It!</button>
                    </div>
                )
            })}
        </div>
    );
};

export default EventList;