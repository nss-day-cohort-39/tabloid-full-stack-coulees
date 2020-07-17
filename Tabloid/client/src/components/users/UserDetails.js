import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import { Spinner, Card, CardImg, CardHeader, CardBody } from 'reactstrap'

const UserDetails = () => {
    const [ready, set] = useState(false)
    const { user, getUserProfile } = useContext(UserProfileContext)
    const { firebaseUserId } = useParams()

    useEffect(() => {
        getUserProfile(firebaseUserId).then(() => set(true))
    }, [])

    const date = new Date(user.createDateTime)
    const formattedDate = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())

    if (ready) {
        return (
            <Card style={{ border: "none" }}>
                {
                    user.imageLocation
                        ? <CardImg src={user.imageLocation} style={{ width: '150px', height: '150px' }} />
                        : <i className='fas fa-user fa-7x ml-4' />
                }
                <CardHeader style={{ backgroundColor: "#fff" }}>
                    <h1 style={{ marginBottom: "0" }}>{user.fullName}</h1>
                </CardHeader>
                <CardBody>
                    <div><strong>{user.displayName}</strong></div>
                    <div>{user.email}</div>
                    <div>created on {formattedDate}</div>
                    <div>{user.userType.name}</div>
                </CardBody>
            </Card>
        )
    }
    else {
        return <Spinner />
    }
}

export default UserDetails