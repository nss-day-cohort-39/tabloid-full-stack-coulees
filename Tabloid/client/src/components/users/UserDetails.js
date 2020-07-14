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
        <Media>
            <Media left href="#" className='pr-3'>
                <Media object src={user.ImageLocation} style={{ width: '150px', height: '150px' }} />
            </Media>
            <Media body>
                <Media heading>
                    {user.fullName}
                </Media>
                <div><strong>{user.displayName}</strong></div>
                <div>{user.email}</div>
            </Media>
        </Media>
    )
}

export default UserDetails