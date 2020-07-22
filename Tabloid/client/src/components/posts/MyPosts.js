import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../providers/PostProvider';
import Post from './Post';
import { Card, Spinner } from 'reactstrap';

const MyPosts = () => {
    const [ready, setReady] = useState(false)
    const { posts, getPostsByCurrentUser } = useContext(PostContext);
    useEffect(() => {
        getPostsByCurrentUser().then(() => setReady(true))
    }, []);

    if (ready) {
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
    } else {
        return <Spinner />
    }
}

export default MyPosts