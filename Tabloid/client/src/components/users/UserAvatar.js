import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider'

const UserAvatar = (user) => {

    const userProfile = user.user

    return (
        <>
            <img src={userProfile.imageLocation} width="50px" className="avatar-round" />
        </>
    )

}

export default UserAvatar;

