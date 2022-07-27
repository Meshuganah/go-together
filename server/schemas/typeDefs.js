const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        friends: [User]
        events: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Event {
        id: Int
        title: String
        venue: Venue
        datetime_local: String
        url: String
        description: String
        performers: [Performers]
    }

    type Venue {
        name: String
        state: String
        city: String
        address: String
        postal_code: String
    }

    type Performers {
        name: String
        image: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        event(_id: ID): Event
        events: [Event]
        seatGeekEvent(id: String): Event
        seatGeekQuery(query: String): Events
    }

    type Events {
        events: [Event]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addEvent(eventTitle: String!, venue: String!, date: String!, artist: String): Event
        addFriend(friendId: ID!): User
    }
`;

module.exports = typeDefs;

//type Event {
    //     eventTitle: String
    //     venue: String
    //     date: String
    //     artist: String
    //     user: String
   // }
