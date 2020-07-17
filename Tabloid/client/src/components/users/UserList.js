import React, { useContext, useEffect, useState } from 'react'
import { Table, Spinner, Button, Collapse } from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import User from './User'
import './Users.css'

const UserList = () => {
    const [ready, set] = useState(false)
    const [show, toggle] = useState(false)
    const { getActiveUsers, users, getDeactivatedUsers, deactivated } = useContext(UserProfileContext)
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile'))

    useEffect(() => {
        set(false)
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
                <h3 className='mb-2'>Deactivated Users</h3>
                <Table className="table-striped">
                    <thead className='bg-info text-light'>
                        <tr>
                            <th className="w-25">Display Name</th>
                            <th>Full Name</th>
                            <th className="w-10"></th>
                            <th className="w-10 text-right">User Type</th>
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
                    <Button className='mb-3' onClick={() => toggle(!show)} color="primary">View Deactivated</Button>
                    <hr />
                    {renderDeactivatedUsers()}
                    <h3 className='mb-2'>Active Users</h3>
                    <Table className="table-striped">
                        <thead className='bg-info text-light'>
                            <tr>
                                <th className="w-25">Display Name</th>
                                <th>Full Name</th>
                                <th className="w-10"></th>
                                <th className="w-10 text-right">User Type</th>
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