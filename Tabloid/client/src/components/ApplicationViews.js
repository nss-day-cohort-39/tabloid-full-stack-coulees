import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./posts/PostList";
import MyPosts from "./posts/MyPosts";
import PostDetails from "./posts/PostDetails";
import CategoryList from "./category/CategoryList";
import { CategoryForm } from "./category/CategoryForm";
import AddPostForm from "./posts/AddPostForm";
import EditPostForm from "./posts/EditPostForm";
import TagList from "./tags/TagList";
import TagForm from "./tags/TagForm";
import UserList from "./users/UserList";
import UserDetails from "./users/UserDetails";
import CommentList from "./comment/CommentList";
import Home from "./Home";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
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
        <Route path="/category">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/addCategory">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
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

        <Route path="/users" exact>
          {isLoggedIn ? <UserList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/users/:firebaseUserId" exact>
          {isLoggedIn ? <UserDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/CommentList/:id">
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
