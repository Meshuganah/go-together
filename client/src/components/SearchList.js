import { useMutation } from "@apollo/client";
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
                        <h3>{event.title}</h3>
                        <span>{event.venue.name}</span>
                        <span>{event.date}</span>
                        <button id={event.id} onClick={handleAddEvent} className='btn btn-secondary my-2 mx-2'>I'm Going!</button>
                    </div>
                )
            })}
        </div>
    );
};

export default SearchList;