import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Auth from './utils/auth';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Find from './pages/Find';
import Together from './pages/Together';
import UserPage from './pages/UserPage';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  if (!Auth.loggedIn() && window.location.href.split('/')[window.location.href.split('/').length - 1] !== 'login' && (window.location.href.split('/')[window.location.href.split('/').length - 1] !== 'signup')) {
    window.location.assign('#/login');
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/find"
            element={<Find />}
          />
          <Route
            path="/together"
            element={<Together />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/user/:username"
            element={<UserPage />}
          />
          <Route
            path="*"
            element={<NoMatch />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
