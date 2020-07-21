import React, { useState } from 'react'
import { DropdownItem, Collapse, CardHeader, Card, CardImg, CardBody, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const SearchResult = ({ result, show }) => {
    const [collapse, showCollapse] = useState(false)

    return (
        <DropdownItem>
            <Card onMouseEnter={() => showCollapse(true)} onMouseLeave={() => showCollapse(false)}>
                <Link to={`/posts/${result.id}`} onClick={() => show(false)} >
                    {result.imageLocation ? <CardImg top src={result.imageLocation} /> : ""}
                    <CardHeader>{result.title}</CardHeader>
                </Link>
                <Collapse isOpen={collapse}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <Link to={`/users/${result.userProfile?.firebaseUserId}`} onClick={() => show(false)}><p className="text-left lead">{result.userProfile?.displayName}</p></Link>
                            {
                                result.categoryId !== 0
                                    ?
                                    <p><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{result.category?.name}</Badge></p>
                                    :
                                    ""
                            }
                            {

                                result.categoryId === 0
                                    ?
                                    <p><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{result.category?.name}</Badge></p>
                                    :
                                    ""
                            }
                        </div>
                    </CardBody>
                </Collapse>
            </Card>
        </DropdownItem>
    )
}

export default SearchResult