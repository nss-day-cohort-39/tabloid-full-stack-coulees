import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [subPosts, set] = useState([]);
    const [subs, setSubs] = useState([])
    const history = useHistory()

    const apiUrl = '/api/subscription'

    const getSubscribedAuthorPostsForCurrentUser = () => {
        return getToken().then((token) =>
            fetch(apiUrl + '/subposts', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(set));
    }

    const getSubByPost = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/sub/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    }

    const getSubscriptionsForCurrentUser = () => {
        return getToken().then((token) =>
            fetch(apiUrl + '/subs', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then((sub) => {
                    return sub
                }));
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

    const checkSubscription = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/isSub/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(resp => resp.json()));
    }

    const unsubscribe = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/unsubscribe/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Unauthorized");
            }))
    }

    return (
        <SubscriptionContext.Provider value={{
            subPosts, getSubscribedAuthorPostsForCurrentUser, addSubscription, getSubByPost,
            getSubscriptionsForCurrentUser, subs, checkSubscription, unsubscribe
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
};