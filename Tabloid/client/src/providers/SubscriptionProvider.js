import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [subscription, setSubscription] = useState([]);

    const apiUrl = '/api/subscription'


    console.log('--->',subscription)
    const getAllSubscription = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setSubscription));
    };

    const addSubscription = (subscription) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "Subscription",
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
            }));
    };

    const getSubscription = (id) =>
        getToken().then((token) =>
            fetch(`/api/subscription/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

    return (
        <SubscriptionContext.Provider value={{
            subscription, getAllSubscription, addSubscription, getSubscription
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
};