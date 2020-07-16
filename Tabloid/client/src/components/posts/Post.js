import React, { useContext, useEffect, useState } from "react"
import { Card, CardImg, CardBody, CardFooter, Button, Badge } from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { PostContext } from "../../providers/PostProvider";
import { PostTagContext } from '../../providers/PostTagProvider';


const Post = ({ post }) => {
    // const { postTags, getAllPostTags } = useContext(PostTagContext);
    // const [currentPostTags, setCurrentPostTags] = useState([]);

    // useEffect(() => {
    //     getAllPostTags(post.id);
    //     setCurrentPostTags(postTags);
    // }, []);

    const history = useHistory()
    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const checkCurrentUser = (post, currentUser) => {
        const handleClick = () => history.push(`/editpost/${post.id}`)
        if (post.userProfileId === currentUser) {
            return (
                <CardFooter>
                    <Button onClick={handleClick}>Edit</Button>
                </CardFooter>
            )
        }
    }

    return (
        <Card className="m-2" id={`post-${post.id}`}>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <strong className="text-left px-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></strong>
                <div className="text-left px-2">{post.userProfile.fullName}</div>
                {

                    post.categoryId !== 0
                        ?
                        <Badge className="text-left ml-1 p-2">{post.category.name}</Badge>
                        :
                        ""
                }
                {

                    post.categoryId === 0 && currentUserId === post.userProfileId
                        ?
                        <Badge className="text-left ml-1 p-2">{post.category.name}</Badge>
                        :
                        ""
                }
                {/* {postTags.map(tag => {
                    return (<Badge key={"tag-" + tag.id} color="info" className="mr-2 mb-2 px-2">{tag.tag.name}</Badge>)
                })} */}
            </CardBody>
            {checkCurrentUser(post, currentUserId)}
        </Card>
    );
};

export default Post;