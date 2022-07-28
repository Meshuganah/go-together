const EventList = ({ events, username }) => {
    return (
        <div>
            <h2>{username}</h2>
            {events && events.map(event => {
                return (
                    <div key={event.id}>
                        <h3>{event.title}</h3>
                        <span>{event.venue.name}</span>
                        <span>{event.date}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default EventList;