import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import { Media } from 'reactstrap'

const UserDetails = () => {
    const { user, getUserProfile } = useContext(UserProfileContext)
    const { firebaseUserId } = useParams()

    useEffect(() => {
        getUserProfile(firebaseUserId)
    }, [])
    return (
        <div>
            <Media>
                <Media left>
                    <img href={user.imageLocation} alt=' ' />
                </Media>
                <Media body>
                    <Media heading>
                        <div>{user.fullName}</div>
                    </Media>
                </Media>
            </Media>
        </div>
    )
}

export default UserDetails