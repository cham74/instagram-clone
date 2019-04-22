import React, { Component } from "react";
import gql from "graphql-tag";

import "./Posts.css";
import Post from "../Post";
import Notifier from "../Notifier";

class Posts extends Component {
  constructor(){
    super();
    this.state = {
      posts : []
    }
    this.offline = !navigator.onLine;
  }

  componentDidMount(){
    // request permission
    Notification.requestPermission();

    if( !navigator.onLine){
      this.setState({ posts: JSON.parse(localStorage.getItem("posts")) });
    }else{
      // fetch the initial posts 
      this.props.apollo_client
      .query({ 
        query:gql`
          {
            posts(user_id: "a"){
              id
              user{
                nickname
                avatar
              }
              image
              caption
            }
          } 
        `})
      .then(response => {
        this.setState({ posts: response.data.posts});
        localStorage.setItem("posts", JSON.stringify(response.data.posts));
      });
    }

    // subscribe to posts channel
    this.posts_channel = this.props.pusher.subscribe('posts-channel');

    // listen for a new post
    this.posts_channel.bind("new-post", data => {
        // update states
        this.setState({ posts: this.state.posts.concat(data.post) });

        // check if notifcations are permitted
        if(Notification.permission === 'granted' ){
          try{
            // notify user of new post
            let notification = new Notification(
              'Pusher Instagram Clone',
              { 
                body: `New post from ${data.post.user.nickname}`,
                icon: 'https://img.stackshare.io/service/115/Pusher_logo.png',
                image: `${data.post.image}`,
              }
            );
            // open the website when the notification is clicked
            notification.onclick = function(event){
              window.open('http://localhost:3000','_blank');
            }
          }catch(e){
            console.log('Error displaying notification');
          }
        }
      }, this);
  }

  render(){
    const notify = this.offline ? <Notifier data="Instagram Clone: Offline Mode" /> : <span />;

    return (
      <div>
        {notify}
        
        {/* display posts */}
        <div className="Posts">
          {this.state.posts
            .slice(0)
            .reverse()
            .map(post => (
              <Post
                nickname={post.user.nickname}
                avatar={post.user.avatar}
                image={post.image}
                caption={post.caption}
                key={post.id}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Posts;