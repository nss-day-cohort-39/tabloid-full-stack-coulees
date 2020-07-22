import React, { useState, useContext, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import UserAvatarUploadForm from './UserAvatarUploadForm';
import { UserProfileContext } from '../../providers/UserProfileProvider'

const UserAvatar = (userSession) => {

    const userProfile = userSession.user
    const { currentUser, getCurrentUserProfile } = useContext(UserProfileContext);
    const [ready, set] = useState(false);

    useEffect(() => {
        getCurrentUserProfile(userProfile.firebaseUserId).then(() => set(true))
    }, [])

    //modal states for the add tag pop up
    const [avatarModal, setAvatarModal] = useState(false)
    const avatarModalToggle = () => setAvatarModal(!avatarModal)

    if (ready) {
        return (
            <>
                {
                    currentUser.imageLocation === "" || currentUser.imageLocation === null
                        ?
                        <svg width="40px" height="40px" viewBox="0 0 16 16" className="bi bi-person-circle" fill="#627d93" xmlns="http://www.w3.org/2000/svg" onClick={avatarModalToggle} style={{ cursor: "pointer" }}>
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                        :

                        <img src={currentUser.imageLocation.startsWith("http") ? currentUser.imageLocation : `/images/avatars/small/${currentUser.imageLocation}`} className="avatar-round" onClick={avatarModalToggle} />

                }

                <Modal isOpen={avatarModal} toggle={avatarModalToggle}>
                    <ModalHeader toggle={avatarModalToggle}>
                        Profile Settings
                </ModalHeader>
                    <ModalBody>
                        <UserAvatarUploadForm user={currentUser} toggle={avatarModalToggle} />
                    </ModalBody>
                </Modal>
            </>
        )
    } else {
        return (
            <Spinner color="info" />
        );
    }

}

export default UserAvatar;

