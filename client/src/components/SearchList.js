import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { ADD_EVENT } from "../utils/mutations";

const SearchList = ({ events }) => {
    const [addEvent, { data, loading, error }] = useMutation(ADD_EVENT);

    const handleAddEvent = async (event) => {
        let id = event.target.id.toString();
        const data = await addEvent({ variables: { id: id }});
    }

    return (
        <div>
            {events && events.map(event => {
                return (
                    <div key={event.id} className='border border-secondary border-3 w-50 text-center mx-auto my-3'>
                        <h3><a target="_blank" rel="noreferrer" href={event.url}>{event.title}</a></h3>
                        <span>{event.venue.name}</span>
                        <span className='mx-3'>{dayjs(event.datetime_local).format('MM/DD/YYYY')}</span>
                        <span>{event.venue.city}, {event.venue.state}</span>
                        <button id={event.id} onClick={handleAddEvent} className='btn btn-secondary my-2 mx-2'>I'm Going!</button>
                    </div>
                )
            })}
        </div>
    );
};

export default SearchList;