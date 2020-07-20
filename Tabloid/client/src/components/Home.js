import React, { useContext, useEffect, useState } from 'react'
import { SubscriptionContext } from '../providers/SubscriptionProvider'
import { Spinner, Card } from 'reactstrap';
import Post from './posts/Post';

const Home = () => {
    const { getSubscribedAuthorPostsForCurrentUser, subPosts } = useContext(SubscriptionContext)
    const [ready, set] = useState(false)

    useEffect(() => {
        getSubscribedAuthorPostsForCurrentUser().then(() => set(true))
    }, [])

    if (ready) {
        return (
            <div className="postList container">
                {
                    (subPosts.length)
                        ? subPosts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                        : <div className="alert alert-secondary mt-1" role="alert">You currently are not subscribed to any authors.</div>
                }
                <Card className="m-2 invisible">invisible spacer card</Card>
                <Card className="m-2 invisible">invisible spacer card</Card>
            </div>
        );
    } else {
        return <Spinner />
    }
}

export default Home