import { styled } from '@mui/material'
import React from 'react'

const HomeHeader = styled('h1')`
    color: #35114d;
    text-align: center;
    margin-top: 100px;
`;
const Text = styled('p')`
    text-align:center;
    padding: 5%;
    line-height: 2rem;
`;

export const Home = () => {
  return (
    <div>
        <HomeHeader>
            Welcome To CRUD System!
        </HomeHeader>
        <Text>Welcome to the sleek and modern User Management Project! With the power of MERN technology, we offer a user-friendly interface that enhances your work efficiency. Our top priority is to provide seamless user information management, making your job a breeze!</Text>
    </div>
  )
}
