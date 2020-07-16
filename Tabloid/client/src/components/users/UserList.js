import React, { useContext, useEffect, useState } from 'react'
import { Table, Spinner, Button, Collapse } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import User from './User'

const UserList = () => {
    const [ready, set] = useState(false)
    const [show, toggle] = useState(false)
    const { getActiveUsers, users, getDeactivatedUsers, deactivated } = useContext(UserProfileContext)
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile'))

    useEffect(() => {
        getActiveUsers().then(() => set(true))
    }, [])

    useEffect(() => {
        if (!show) {
            getDeactivatedUsers()
        }
    }, [show])

    const renderDeactivatedUsers = () => {
        return (
            <Collapse isOpen={show}>
                <h3 className='text-center'>Deactivated Users</h3>
                <Table>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Display Name</th>
                            <th>Full Name</th>
                            <th></th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deactivated.map(u => {
                            return <User key={u.id} user={u} active={false} />
                        })}
                    </tbody>
                </Table>
            </Collapse>
        )
    }

    if (ready) {
        return (
            <>
                <div className='container'>
                    <Button className='mb-3' onClick={() => toggle(!show)}>View Deactivated</Button>
                    {renderDeactivatedUsers()}
                    <h3 className='text-center'>Active Users</h3>
                    <Table>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Display Name</th>
                                <th>Full Name</th>
                                <th></th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => {
                                return <User key={u.id} user={u} active={true} currentUser={currentUser} />
                            })}
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
    else {
        return <Spinner />
    }
}

export default UserList