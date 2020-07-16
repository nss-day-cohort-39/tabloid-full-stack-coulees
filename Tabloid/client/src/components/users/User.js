import React, { useContext, useState } from 'react'
import { Button, ModalBody, ModalHeader, Modal } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'

const User = ({ user, active, currentUser }) => {
    const { deactivateUser, reactivateUser } = useContext(UserProfileContext)
    const [confirm, toggle] = useState(false)
    const handleDeactivate = () => {
        deactivateUser(user)
    }
    const handleReactivate = () => {
        reactivateUser(user)
    }

    console.log(currentUser)
    if (active) {
        return (
            <>
                <tr>
                    <td className='flex-fill'><a href={`/users/${user.firebaseUserId}`}>{user.displayName}</a></td>
                    <td className='flex-fill'>{user.fullName}</td>
                    <td className='flex-fill'>
                        {currentUser.id === user.id
                            ? ""
                            : <Button className='btn btn-warning' onClick={toggle}>Deactivate</Button>
                        }
                    </td>
                    {user.userType.name == 'Admin'
                        ? <td className='flex-fill'><span className='border border-success p-1'>{user.userType.name}</span></td>
                        : <td className='flex-fill'>{user.userType.name}</td>}
                </tr>
                <Modal isOpen={confirm}>
                    <ModalHeader>Are you sure you want to deactivate this user?</ModalHeader>
                    <ModalBody>
                        <Button onClick={handleDeactivate}>Deactivate</Button>
                    </ModalBody>
                </Modal>
            </>
        )
    }
    else {
        return (
            <tr>
                <td className='flex-fill'><a href={`/users/${user.firebaseUserId}`}>{user.displayName}</a></td>
                <td className='flex-fill'>{user.fullName}</td>
                <td className='flex-fill'>
                    <Button className='btn btn-warning' onClick={handleReactivate}>Reactivate</Button>
                </td>
                {user.userType.name == 'Admin'
                    ? <td className='flex-fill'><span className='border border-success p-1'>{user.userType.name}</span></td>
                    : <td className='flex-fill'>{user.userType.name}</td>}
            </tr>
        )
    }
}

export default User