import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faToggleOff, faToggleOn, faTrash, faTrashAlt} from '@fortawesome/free-solid-svg-icons'


const Header = ({toggleRoute}) => {
    return (
        <div className='tableHeader'>
            <h3>Users</h3>
            <button className='createButton' onClick={() => toggleRoute(2)}>+ Create</button>
        </div>
    );
}

export const Users = ({toggleRoute, statusChange, deleteUser, showEditPage}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, [users]);

    const getAllUsers = async () => {
        const result = await getUsers();
        setUsers(result.data);
    }

    return (
        <Container>
            <Header toggleRoute={toggleRoute} />
            <table className='userTable'>
                <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user.username}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.status ? "Active" : "Inactive"}</td>
                        <td>
                            <FontAwesomeIcon className='icon-space' onClick={() => showEditPage(user)} icon={faPenToSquare}/>
                            <FontAwesomeIcon className='icon-space' onClick={() => deleteUser(user._id)} icon={faTrashAlt}/>
                            <FontAwesomeIcon className={user.status ? 'icon-space' : 'icon-space-off'} onClick={() => statusChange(user._id)} icon={user.status ? faToggleOn : faToggleOff}/>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
