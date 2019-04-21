import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import "./Posts.css";
import Post from "../Post";

class Posts extends Component {
  constructor(){
    super();
    this.state = {
      posts : []
    }
  }

  componentDidMount(){
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
      });

    this.posts_channel = this.props.pusher.subscribe('posts-channel');

    // listen for a new post
    this.posts_channel.bind("new-post", data => {
        this.setState({ posts: this.state.posts.concat(data.post) });
      }, this);
  }

  render(){
    return (
      <div className="Posts">
        {this.state.posts.map(post => <Post nickname={post.user.nickname} avatar={post.user.avatar} image={post.image} caption={post.caption} key={post.id}/>)}
      </div>
    );
  }
}

export default Posts;