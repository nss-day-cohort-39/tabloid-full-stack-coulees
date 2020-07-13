import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
    const firebaseUserId = useParams()

    useEffect(() => {

    }, [])
    return <div>User details</div>
}

export default UserDetails