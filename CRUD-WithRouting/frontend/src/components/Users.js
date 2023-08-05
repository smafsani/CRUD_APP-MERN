import { Container, Table, TableHead, TableRow, TableCell, styled, Button, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { deleteUserById, getUsers, statusChangeById } from '../services/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faToggleOff, faToggleOn, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const StyledTh = styled(TableCell)`
    font-weight: bold;
`;

const Header = () => {
    return (
        <div className='tableHeader'>
            <h3>Users</h3>
        </div>
    );
}

export const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const response = await getUsers();
        if(response[0] === 200){
            setUsers(response[1]);
        }
    };

    const statusChange = async (id) => {
        const response = await statusChangeById(id);
        if(response[0] === 200){
            getAllUsers();
        }
    };

    const deleteUser = async (id) => {
        const response = await deleteUserById(id);
        if(response[0] === 200){
            getAllUsers();
        }
    };

    return (
        <Container>
            <Header />
            {/* <table className='userTable'>
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
            </table> */}
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTh>SL.</StyledTh>
                        <StyledTh>Name</StyledTh>
                        <StyledTh>Username</StyledTh>
                        <StyledTh>Email</StyledTh>
                        <StyledTh>Phone</StyledTh>
                        <StyledTh>Status</StyledTh>
                        <StyledTh>Action</StyledTh>
                    </TableRow>
                </TableHead>
                <TableHead>
                    {
                        users.length > 0 ?
                        users.map((user, index) => 
                        <TableRow key={user.username}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                            {
                                user.status === 1 ? 
                                ( <Chip label="Active" color='success' size='small'></Chip> ) : 
                                (<Chip label='Inactive' color='warning' size='small'></Chip>)
                            }
                            </TableCell>
                            <TableCell>
                                <Button style={{padding: "0", minWidth: "0"}} component={Link} to={`/edit-user/${user._id}`}><FontAwesomeIcon style={{color:"blue", fontSize: "18px", margin: "0 3px", cursor: "pointer"}} icon={faPenToSquare} component={Link} to={`edit-user/${user._id}`} /></Button>
                                <Button style={{padding: "0", minWidth: "0"}} onClick={() => deleteUser(user._id)}><FontAwesomeIcon style={{color:"red", fontSize: "18px", margin: "0 3px", cursor: "pointer"}} icon={faTrashAlt}/></Button>
                                <Button style={{padding: "0", minWidth: "0"}} onClick={() => statusChange(user._id)}><FontAwesomeIcon color={user.status === 1 ? '#2e7d32' : '#ed6c02'} style={{fontSize: "18px", margin: "0 3px", cursor: "pointer"}} icon={user.status === 1 ? faToggleOn : faToggleOff}/></Button>
                            </TableCell>
                        </TableRow>) :
                        (<TableRow>
                            <TableCell colSpan={7} style={{textAlign: "center", fontSize: "20px", fontWeight: "bold"}}>No Data Found</TableCell>
                        </TableRow>)
                    }
                    
                </TableHead>
            </Table>
        </Container>
    );
}
