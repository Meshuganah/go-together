import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENT = gql`
mutation AddEvent($id: String!) {
  addEvent(id: $id) {
    _id
    username
    email
    events {
      id
    }
  }
}
`;

export const REMOVE_EVENT = gql`
mutation RemoveEvent($id: String!) {
  removeEvent(id: $id) {
    _id
    username
    email
    events {
      id
    }
  }
}
`;