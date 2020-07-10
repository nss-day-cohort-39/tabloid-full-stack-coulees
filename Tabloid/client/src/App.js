import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <Header />
          <ApplicationViews />
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
