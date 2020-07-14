import React, { useContext, useEffect, useState } from 'react'
import { Table, Spinner } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import User from './User'

const UserList = () => {
    const [ready, set] = useState(false)
    const { getAllUsers, users } = useContext(UserProfileContext)

    useEffect(() => {
        getAllUsers().then(() => set(true))
    }, [])

    if (ready) {
        return (
            <Table>
                <thead className='thead-dark'>
                    <tr>
                        <th>Display Name</th>
                        <th>Full Name</th>
                        <th>User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return <User key={u.id} user={u} />
                    })}
                </tbody>
            </Table>
        )
    }
    else {
        return <Spinner />
    }
}

export default UserList