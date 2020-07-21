import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const UserAvatar = (user) => {

    const userProfile = user.user

    //modal states for the add tag pop up
    const [avatarModal, setAvatarModal] = useState(false)
    const avatarModalToggle = () => setAvatarModal(!avatarModal)

    return (
        <>
            <img src={userProfile.imageLocation} width="50px" className="avatar-round" onClick={avatarModalToggle} />

            <Modal isOpen={avatarModal} toggle={avatarModalToggle}>
                <ModalHeader toggle={avatarModalToggle}>
                    Change Avatar
                </ModalHeader>
                <ModalBody>
                </ModalBody>
            </Modal>
        </>
    )

}

export default UserAvatar;

