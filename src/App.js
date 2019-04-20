import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Post 
            nickname="Jacob" 
            avatar="https://avatars0.githubusercontent.com/u/46236483?s=460&v=4" 
            caption="Moscow State University" 
            image="https://images.unsplash.com/photo-1523509080324-9183f313dc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80"
          />
          <Post 
            nickname="Jacob" 
            avatar="https://avatars0.githubusercontent.com/u/46236483?s=460&v=4" 
            caption="Landscape of moscow by night. Capture with low shutter speed and processed in lightroom for moody tones" 
            image="https://images.unsplash.com/photo-1519827737530-b255e4d1d0af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=926&q=80"
          />
          <Post 
            nickname="Jacob" 
            avatar="https://avatars0.githubusercontent.com/u/46236483?s=460&v=4" 
            caption="Top view of body of water with fountain" 
            image="https://images.unsplash.com/photo-1523468346758-dbe5c400792a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          />
        </div>
      </div>
    );
  }
}

export default App;