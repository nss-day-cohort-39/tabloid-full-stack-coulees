import React, { useContext, useEffect, useState } from 'react'
import { Table, Spinner, Button, Collapse } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import User from './User'

const UserList = () => {
    const [ready, set] = useState(false)
    const [show, toggle] = useState(false)
    const { getActiveUsers, users, getDeactivatedUsers, deactivated } = useContext(UserProfileContext)

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
                <Table>
                    <thead className='thead-dark'>
                        <h3>Deactivated Users</h3>
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
            <div className='container'>
                <Button className='mb-3' onClick={() => toggle(!show)}>View Deactivated</Button>
                {renderDeactivatedUsers()}
                <Table>
                    <thead className='thead-dark'>
                        <h3>Active Users</h3>
                        <tr>
                            <th>Display Name</th>
                            <th>Full Name</th>
                            <th></th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => {
                            return <User key={u.id} user={u} active={true} />
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return <Spinner />
    }
}

export default UserList