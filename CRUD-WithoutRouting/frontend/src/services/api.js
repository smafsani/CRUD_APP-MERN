import axios from 'axios';

const URL = "http://127.0.0.1:5005/user";

export const addNewUser = async (data) => {
    try {
        return await axios.post(`${URL}/store`, data);
    } catch (error) {
        console.log(error);
    }
};  

export const getUsers = async () => {
    try {
        return await axios.get(URL);
    } catch (error) {
        console.log(error);
    }
};

export const getUserDataById = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const statusChangeById = async (id) => {
    try {
        return await axios.get(`${URL}/status-change/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const deleteUserById = async (id) => {
    try {
        return await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async user => {
    try {
        return await axios.put(`${URL}/update/${user.id}`, user);
    } catch (error) {
        console.log(error);
    }
};