import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            events {
                _id
                eventTitle
                venue
                date
                artist
                user
            }
        }
    }
`;

export const QUERY_EVENTS = gql`
    query events($user: String) {
        events(user: $user) {
            _id
            eventTitle
            venue
            date
            artist
            user
        }
    }
`;

export const QUERY_EVENT = gql`
    query event($id: ID!) {
        event(_id: $id) {
            _id
            eventTitle
            venue
            date
            artist
            user
        }
    }
`;