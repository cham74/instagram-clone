import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./Post.css";

const Post = () => {
  return (
    <Query
      query={gql`
        {
          post(user_id: "a", post_id: "a") {
            image
            caption
            user {
              nickname
              avatar
            }
          }
        }
      `}
    >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading Post...</p>;
      if (error) return <p>Error loading Post:(</p>;
      let image = data.post.image;
      let caption = data.post.caption;
      let user = data.post.user;

      return (
        <article className="Post" ref="Post">
          <header>
            <div className="Post-user">
              <div className="Post-user-avatar">
                <img src={user.avatar} alt={user.nickname} />
              </div>
              <div className="Post-user-nickname">
                <span>{user.nickname}</span>
              </div>
            </div>
          </header>
          <div className="Post-image">
            <div className="Post-image-bg">
              <img alt={caption} src={image} />
            </div>
          </div>
          <div className="Post-caption">
            <strong>{user.nickname}</strong> {caption}
          </div>
        </article>
      );
    }}
    </Query>
  )
}

export default Post;