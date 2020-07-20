import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [subPosts, set] = useState([]);
    const history = useHistory()

    const apiUrl = '/api/subscription'

    const getSubscribedAuthorPostsForCurrentUser = () => {
        return getToken().then((token) =>
            fetch(apiUrl + '/currentUser', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(set));
    }

    const addSubscription = (subscription) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(subscription)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
                .then(() => history.push('/')));
    };

    return (
        <SubscriptionContext.Provider value={{
            subPosts, getSubscribedAuthorPostsForCurrentUser, addSubscription
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
};