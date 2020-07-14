import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { CategoryProvider } from './providers/CategoryProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import { TagProvider } from './providers/TagProvider';
import { PostTagProvider } from './providers/PostTagProvider';
import { CommentProvider } from './providers/CommentProvider';

//it is important that PostTagProvider stays outside of Post Provider
function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostTagProvider>
          <PostProvider>
            <CategoryProvider>
              <SubscriptionProvider>
                <CommentProvider>
                  <TagProvider>
                    <Header />
                    <ApplicationViews />
                  </TagProvider>
                </CommentProvider>
              </SubscriptionProvider>
            </CategoryProvider>
          </PostProvider>
        </PostTagProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
