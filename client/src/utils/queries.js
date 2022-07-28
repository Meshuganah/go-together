import { gql } from '@apollo/client';

export const QUERY_ME = gql`
      query Me {
        me {
          _id
          username
          email
          events {
            id
            title
            venue {
              name
              state
              city
              address
              postal_code
            }
            datetime_local
            url
            description
            performers {
              name
              image
            }
          }
        }
      }
`;

export const QUERY_EVENTS = gql`
query SeatGeekEvents($ids: [String]) {
  seatGeekEvents(ids: $ids) {
    events {
      id
      title
      venue {
        name
        state
        city
        address
        postal_code
      }
      datetime_local
      url
      description
      performers {
        name
        image
      }
    }
  }
}
`;

export const QUERY_EVENT = gql`
query Query($seatGeekEventId: String) {
    seatGeekEvent(id: $seatGeekEventId) {
      id
      title
      datetime_local
      url
      description
      performers {
        name
        image
      }
      venue {
        name
        state
        city
        address
        postal_code
      }
    }
  }
`;

export const QUERY_EVENT_SEARCH = gql`
query Query($query: String) {
  seatGeekQuery(query: $query) {
    events {
      id
      title
      venue {
        name
        state
        city
        address
        postal_code
      }
      datetime_local
      url
      description
      performers {
        name
        image
      }
    }
  }
}
`