import React, { useContext } from 'react'
import { Button } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'

const User = ({ user }) => {
    const { deactivateUser } = useContext(UserProfileContext)
    const handleDeactivate = () => {
        deactivateUser(user)
    }
    return (
        <tr>
            <td className='flex-fill'><a href={`/users/${user.firebaseUserId}`}>{user.displayName}</a></td>
            <td className='flex-fill'>{user.fullName}</td>
            <td className='flex-fill'>
                <Button className='btn btn-warning' onClick={handleDeactivate}>Deactivate</Button>
            </td>
            {user.userType.name == 'Admin'
                ? <td className='flex-fill'><span className='border border-success p-1'>{user.userType.name}</span></td>
                : <td className='flex-fill'>{user.userType.name}</td>}
        </tr>
    )
}

export default User