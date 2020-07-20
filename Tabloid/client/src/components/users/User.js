import React, { useContext, useState } from 'react'
import { Button, ModalBody, ModalHeader, Modal, ModalFooter, Badge } from 'reactstrap'
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
                    <td className='flex-fill  text-right'>
                        <Button className='btn btn-warning' onClick={showModal} size="sm">Deactivate</Button>
                    </td>
                    {user.userType.name == 'Admin'
                        ? <td className='flex-fill text-right'><Badge color="success" className="p-2">{user.userType.name}</Badge></td>
                        : <td className='flex-fill text-right'><Badge color="secondary" className="p-2">{user.userType.name}</Badge></td>}
                </tr>
                <Modal isOpen={confirm}>
                    <ModalHeader>Deactivate User</ModalHeader>
                    <ModalBody>
                        <div className="lead mb-2">Are you sure you want to deactivate {user.fullName}?</div>
                    </ModalBody>
                    <ModalFooter className="text-right">
                        <Button onClick={() => toggle(false)} className='ml-2'>Cancel</Button>
                        <Button onClick={handleDeactivate} className='btn btn-warning'>Deactivate</Button>
                    </ModalFooter>


                </Modal>
            </>
        )
    }
    else {
        return (
            <tr>
                <td className='flex-fill'><a href={`/users/${user.firebaseUserId}`}>{user.displayName}</a></td>
                <td className='flex-fill'>{user.fullName}</td>
                <td className='flex-fill text-right'>
                    <Button className='btn btn-warning' size="sm" onClick={handleReactivate}>Reactivate</Button>
                </td>
                {user.userType.name == 'Admin'
                    ? <td className='flex-fill text-right'><Badge color="success" className="p-2">{user.userType.name}</Badge></td>
                    : <td className='flex-fill text-right'><Badge color="secondary" className="p-2">{user.userType.name}</Badge></td>}
            </tr>
        )
    }
}

export default User