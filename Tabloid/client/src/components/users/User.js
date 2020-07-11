import React from 'react'

const User = ({ user }) => {
    return (
        <tr>
            <td className='flex-fill'>{user.fullName}</td>
            <td className='flex-fill'>{user.displayName}</td>
            <td className='flex-fill'>{user.userType.name}</td>
        </tr>
    )
}

export default User