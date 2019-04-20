import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import './App.css';
import Header from './components/Header';
import Post from './components/Post';

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql"
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <section className="App-main">
          <Post />
        </section>
      </div>
    </ApolloProvider>
  );
};

export default App;