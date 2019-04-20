import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql"
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <section className="App-main">
          <Posts />
        </section>
      </div>
    </ApolloProvider>
  );
};

export default App;