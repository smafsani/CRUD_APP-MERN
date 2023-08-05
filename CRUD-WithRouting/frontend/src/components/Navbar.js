import React from 'react'
import { AppBar, Button, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background-color: #35114d;
`;
const Tag = styled(Button)`
    font-size: 16px;
    margin: 0 10px;
    font-weight: 700;
    color: #fff;
    border: none;
`;
const StyledButton = styled(Button)`
    font-size: 12px;
    margin: 0 10px;
    color: #fff;
    border: none;
`;
export const Navbar = () => {
  return (
    <Header position='static'>
        <Toolbar>
            <NavLink to='/'><Tag>CRUD</Tag></NavLink>
            <NavLink to='/users'><StyledButton variant="text">Users</StyledButton></NavLink>
            <NavLink to='/add-user'><StyledButton variant="text">Add User</StyledButton></NavLink>
        </Toolbar>
    </Header>
  );
}
