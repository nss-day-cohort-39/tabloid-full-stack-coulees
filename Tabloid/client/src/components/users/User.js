import React, { useContext, useState } from 'react'
import { Button, ModalBody, ModalHeader, Modal } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'

const User = ({ user, active, currentUser }) => {
    const { deactivateUser, reactivateUser, logout } = useContext(UserProfileContext)
    const [confirm, toggle] = useState(false)
    const handleDeactivate = () => {
        deactivateUser(user).then(() => {
            if (currentUser.id === user.id) {
                logout()
            }
        })
    }
    const handleReactivate = () => {
        reactivateUser(user)
    }

    const showModal = () => {
        toggle(true)
        if (currentUser.id === user.id) {
            alert("You are about to deactivate your account.")
        }
    }

    if (active) {
        return (
            <>
                <tr>
                    <td className='flex-fill'><a href={`/users/${user.firebaseUserId}`}>{user.displayName}</a></td>
                    <td className='flex-fill'>{user.fullName}</td>
                    <td className='flex-fill'>
                        <Button className='btn btn-warning' onClick={showModal}>Deactivate</Button>
                    </td>
                    {user.userType.name == 'Admin'
                        ? <td className='flex-fill'><span className='border border-success p-1'>{user.userType.name}</span></td>
                        : <td className='flex-fill'>{user.userType.name}</td>}
                </tr>
                <Modal isOpen={confirm}>
                    <ModalHeader>Are you sure you want to deactivate this user?</ModalHeader>
                    <ModalBody>
                        <Button onClick={handleDeactivate} className='btn btn-warning'>Deactivate</Button>
                        <Button onClick={() => toggle(false)} className='ml-2'>Cancel</Button>
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