import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button } from "reactstrap"

const PostDetails = () => {
    const [post, setPost] = useState();
    const { getPost } = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    const date = new Date(post.publishDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);

    return (
        <div className="container">
            <h2>{post.title}</h2>
            <h3>{post.userProfile.displayName}</h3>
            <h3>{dateTimeFormat}</h3>
            <h3>{post.category.name}</h3>
            <hr />
            <img src={post.imageLocation} alt={post.title} className="img-fluid" />
            <p>{post.content}</p>

            <Button color="secondary" onClick={() => {
                viewComment()
            }}>View Comments</Button>
        </div >
    );
};

export default PostDetails;