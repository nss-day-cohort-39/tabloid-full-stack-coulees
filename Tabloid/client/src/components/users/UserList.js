import React, { useContext, useEffect } from 'react'
import { Table } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import User from './User'

const UserList = () => {
    const { getAllUsers, users } = useContext(UserProfileContext)

    useEffect(() => {
        getAllUsers()
    }, [])

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

export default UserList