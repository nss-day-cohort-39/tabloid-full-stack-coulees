import React, { useContext, useEffect } from 'react'
import { PostContext } from '../../providers/PostProvider';
import Post from './Post';
import { Card } from 'reactstrap';

const MyPosts = () => {
    const { posts, getPostsByCurrentUser } = useContext(PostContext);
    useEffect(() => {
        getPostsByCurrentUser()
    }, []);

    return (
        <div className="postList container">
            {
                (posts.length)
                    ? posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))
                    : <div className="alert alert-secondary mt-1" role="alert"> No posts were found.</div>
            }
            <Card className="m-2 invisible">invisible spacer card</Card>
            <Card className="m-2 invisible">invisible spacer card</Card>
        </div>
    );
}

export default MyPosts