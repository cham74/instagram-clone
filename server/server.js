let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type User {
    id : String!
    nickname : String!
    avatar : String!
  }
  type Post {
      id: String!
      user: User!
      caption : String!
      image : String!
  }
  type Query{
    user(id: String) : User!
    post(user_id: String, post_id: String) : Post!
    posts(user_id: String) : [Post]
  }
`);

// Maps id to User object
let userslist = {
  a: {
    id: "a",
    nickname: "Jacob",
    avatar: "https://avatars0.githubusercontent.com/u/46236483?s=460&v=4"
  },
  b: {
    id: "b",
    nickname: "Jacob",
    avatar: "https://avatars0.githubusercontent.com/u/46236483?s=460&v=4"
  }
};

let postslist = {
  a: {
    a: {
      id: "a",
      user: userslist["a"],
      caption: "Moscow State University",
      image: "https://images.unsplash.com/photo-1523509080324-9183f313dc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80"
    },
    b: {
      id: "b",
      user: userslist["a"],
      caption: "Landscape of moscow by night. Capture with low shutter speed and processed in lightroom for moody tones",
      image: "https://images.unsplash.com/photo-1519827737530-b255e4d1d0af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=926&q=80"
    },
    c: {
      id: "c",
      user: userslist["a"],
      caption: "Top view of body of water with fountain",
      image: "https://images.unsplash.com/photo-1523468346758-dbe5c400792a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    }
  }
};

// The root provides a resolver function for each API endpoint
let root = {
  user: function({ id }) {
    return userslist[id];
  },
  post: function({ user_id , post_id }) {
    return postslist[user_id][post_id];
  },
  posts: function({ user_id }){
    return Object.values(postslist[user_id]);
  }
};

let app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");