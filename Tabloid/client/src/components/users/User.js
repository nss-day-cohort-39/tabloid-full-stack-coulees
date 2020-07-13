import React from 'react'

const User = ({ user }) => {
    return (
        <tr>
            <td className='flex-fill'><a href={`/users/${user.firebaseUserId}`}>{user.displayName}</a></td>
            <td className='flex-fill'>{user.fullName}</td>
            {user.userType.name == 'Admin'
                ? <td className='flex-fill'><span className='border border-success p-1'>{user.userType.name}</span></td>
                : <td className='flex-fill'>{user.userType.name}</td>}
        </tr>
    )
}

export default User