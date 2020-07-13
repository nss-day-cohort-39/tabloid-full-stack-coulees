import React, { useContext } from "react"
import { Card, CardImg, CardBody, CardFooter, Button } from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Post = ({ post }) => {
    const { getPost } = useContext(UserProfileContext)

    const history = useHistory()
    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const checkCurrentUser = (post, currentUser) => {
        const handleClick = () => history.push(`/editpost/${post.id}`)
        if (post.userProfileId === currentUser) {
            getPost(post.id)
            return (
                <CardFooter>
                    <Button onClick={handleClick}>Edit</Button>
                </CardFooter>
            )
        }
    }
    return (
        <Card className="m-4" id={`post-${post.id}`}>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <strong><Link to={`/posts/${post.id}`}>{post.title}</Link></strong>
                <div className="text-left px-2">{post.userProfile.fullName}</div>
                <div className="text-left px-2">{post.category.name}</div>
            </CardBody>
            {checkCurrentUser(post, currentUserId)}
        </Card>
    );
};

export default Post;