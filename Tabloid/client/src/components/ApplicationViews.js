import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./posts/PostList";
import MyPosts from "./posts/MyPosts";
import PostDetails from "./posts/PostDetails";
import AddPostForm from "./posts/AddPostForm";
import EditPostForm from "./posts/EditPostForm";
import TagList from "./tags/TagList";
import TagForm from "./tags/TagForm";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myposts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/newpost" exact>
          {isLoggedIn ? <AddPostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/editpost/:id" exact>
          {isLoggedIn ? <EditPostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/add" exact>
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
