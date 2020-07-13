import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button } from 'reactstrap';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';

const PostDetails = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const {subscription} = useContext(SubscriptionContext)
    const { id } = useParams();
    
    // const [buttonText, setButtonText] = useState("Subscribe")
    // const toggleButtonText = setButtonText(buttonText)

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    const date = new Date(post.publishDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
    const Subscribe = () => {
        console.log('subscription',subscription)
    }
    const unSubscribe = () => {
        console.log('unsubscription',subscription)
    }
    return (
        <div className="container">
            <h2>{post.title}</h2>
            <h3>{post.userProfile.displayName}</h3>
            <h3>{dateTimeFormat}</h3>
            <h3>{post.category.name}</h3>
            <hr />
            <img src={post.imageLocation} alt={post.title} className="img-fluid" />
            <p>{post.content}</p>
            {/* <Button color = "info" 
                onClick  = {
                    () => {
                        if(buttonText !== "Unsubscribe"){
                            Subscribe()
                            toggleButtonText("Unsubscribe")
                        }else{
                            unSubscribe()
                            toggleButtonText("Subscribe")
                        }
                    }}>{buttonText}</Button> */}
        </div >
    );
};

export default PostDetails;