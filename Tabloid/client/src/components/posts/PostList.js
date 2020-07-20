import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../providers/PostProvider';
import Post from './Post';
import { Spinner, Card } from 'reactstrap';

const PostFeed = () => {
    const { posts, getPublishedPosts } = useContext(PostContext);
    const [ready, set] = useState(false)

    useEffect(() => {
        getPublishedPosts().then(() => set(true))
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

export default PostFeed