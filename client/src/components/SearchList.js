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
                    <div key={event.id}>
                        <h3>{event.title}</h3>
                        <span>{event.venue.name}</span>
                        <span>{event.date}</span>
                        <button id={event.id} onClick={handleAddEvent}>I'm Going!</button>
                    </div>
                )
            })}
        </div>
    );
};

export default SearchList;