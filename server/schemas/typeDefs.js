const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        friends: [User]
        events: [Event]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Event {
        eventTitle: String
        venue: String
        date: String
        artist: String
        user: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        event(_id: ID): Event
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