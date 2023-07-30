import { Alert, Button, Container, FormControl, FormGroup, Input, InputLabel, styled } from '@mui/material'
import React, { useState } from 'react'
import { updateUser } from '../services/api'; 

const BackButton = styled(Button)`
    background: #199417;
    margin-top: 5px;
    &:hover{
        background: #105e0e;
    }
`;

const FormContainer = styled(FormGroup)`
    width: 50%;
    margin: auto;
    & > div{
        margin-top: 20px;
    }
`;

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
};

const defualtErrSuccVal = [0, ""];

export const EditUser = ({toggleRoute, userData}) => {
    const [user, setUser] = useState({
        id : userData._id,
        name : userData.name,
        username : userData.username,
        email : userData.email,
        phone : userData.phone,
        password : userData.password,
    });
    const [submitError, setSubmitError] = useState(defualtErrSuccVal);
    const [submitSuccess, setSubmitSuccess] = useState(defualtErrSuccVal);
    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = async () =>{
        setSubmitError(defualtErrSuccVal);
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
            setSubmitSuccess([1, "User Updated Successfully!"]);
            await updateUser(user);
        }
    }
    return (
        <Container>
            <h3>Edit New User</h3>
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
                    <Input name="name" value={user.name} onChange={e => onValueChange(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel>Username</InputLabel>
                    <Input name="username" value={user.username} onChange={e => onValueChange(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input name="email" value={user.email} type="email" onChange={e => onValueChange(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel>Phone</InputLabel>
                    <Input name="phone" value={user.phone} onChange={e => onValueChange(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input name="password" value={user.password} type='password' onChange={e => onValueChange(e)} />
                </FormControl>
                <FormControl>
                    <Button variant="contained" onClick={() => submitHandler()}>Update User</Button>
                    <BackButton variant="contained" onClick={() => toggleRoute(1)}>Back To Users</BackButton>
                </FormControl>
            </FormContainer>
        </Container>
    )
};
