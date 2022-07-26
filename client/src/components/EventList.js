const EventList = ({ events, username }) => {
    return (
        <div>
            <h2>{username}</h2>
            {events && events.map(event => (
                <div>
                    <h3>{event.eventTitle}</h3>
                        <span>{event.venue}</span>
                        <span>{event.date}</span>
                </div>
            ))}
        </div>
    );
};

export default EventList;