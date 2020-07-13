import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfileContext } from '../../providers/UserProfileProvider'

const UserDetails = () => {
    const { users, getUserProfile } = useContext(UserProfileContext)
    const { firebaseUserId } = useParams()

    useEffect(() => {
        getUserProfile(firebaseUserId)
    }, [])
    return <div>User details</div>
}

export default UserDetails