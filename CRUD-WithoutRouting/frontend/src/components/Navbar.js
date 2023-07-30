import React from 'react'
import { AppBar, Toolbar, styled } from '@mui/material';
const Header = styled(AppBar)`
    background-color: #35114d;
`;
const Tag = styled('p')`
    font-size: 18px;
    font-weight: 600;
`;
export const Navbar = () => {
  return (
    <Header position='static'>
        <Toolbar>
            <Tag>CRUD</Tag>
        </Toolbar>
    </Header>
  );
}
