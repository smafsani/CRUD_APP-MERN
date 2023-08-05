import { Alert, Button, Container, FormControl, FormGroup, Input, InputLabel, styled } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getUserDataById, updateUser } from '../services/api'; 
import { useParams } from 'react-router-dom';

const FormContainer = styled(FormGroup)`
    width: 50%;
    margin: auto;
    & > div{
        margin-top: 20px;
    }
`;

const HeadText = styled('h3')`
    text-align: center;
`;

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
};
const defualtErrSuccVal = [0, ""];

export const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const [submitError, setSubmitError] = useState(defualtErrSuccVal);
    const [submitSuccess, setSubmitSuccess] = useState(defualtErrSuccVal);

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = async () => {
        const response = await getUserDataById(id);
        if(response[0] === 200){
            setUser(response[1]);
        }
    }

    const submitHandler = async () =>{
        setSubmitError(defualtErrSuccVal);
        setSubmitSuccess(defualtErrSuccVal);
        if(!user.name){
            setSubmitError([1, "Name cannot be empty!"]);
        }
        else if(!user.username){
            setSubmitError([1, "Username cannot be empty!"]);
        }
        else if(!user.email){
            setSubmitError([1, "Email cannot be empty!"]);
        }
        else if(!user.phone){
            setSubmitError([1, "Phone cannot be empty!"]);
        }
        else if(!user.password){
            setSubmitError([1, "Password cannot be empty!"]);
        }
        else{
            const response = await updateUser(user, id);
            if(response[0] === 200){
                setSubmitSuccess([1, "User Updated Successfully!"]);
            }
            else{
                setSubmitError([1, response[1]]);
            }
        }
    }
    return (
        <Container>
            <HeadText>Edit User</HeadText>
            <FormContainer>
                {
                    submitError[0] ?
                    <Alert severity="warning">{submitError[1]}</Alert> :
                    ''
                }
                {
                    submitSuccess[0] ?
                    <Alert severity="success">{submitSuccess[1]}</Alert> :
                    ''
                }
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input name="name" value={user.name} onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                </FormControl>
                <FormControl>
                    <InputLabel>Username</InputLabel>
                    <Input name="username" value={user.username} onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                </FormControl>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input name="email" value={user.email} type="email" onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                </FormControl>
                <FormControl>
                    <InputLabel>Phone</InputLabel>
                    <Input name="phone" value={user.phone} onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                </FormControl>
                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input name="password" value={user.password} type='password' onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                </FormControl>
                <FormControl>
                    <Button variant="contained" onClick={() => submitHandler()}>Edit User</Button>
                </FormControl>
            </FormContainer>
        </Container>
    )
}
