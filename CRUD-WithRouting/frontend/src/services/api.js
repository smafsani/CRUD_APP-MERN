import axios from 'axios';

const URL = "http://127.0.0.1:5005/user";

export const addNewUser = async (data) => {
    try {
        const addUser = await axios.post(`${URL}/store`, data);
        return [200, addUser];
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [404, error.response.data.error];
        }
        return [500, (error.response && 
            error.response.data && 
            error.response.data.error) ? 
            error.response.data.error : 
            "Upps! Something Went Wrong."];
    }
};  

export const getUsers = async () => {
    try {
        const users = await axios.get(URL);
        return [200, users.data && users.data.users ? users.data.users : []];
    } catch (error) {
        return [500, "Upps! Something Went Wrong."];
    }
};

export const getUserDataById = async (id) => {
    try {
        const user = await axios.get(`${URL}/?id=${id}`);
        if(user){
            return [200, user.data && user.data.user ? user.data.user : {}];
        }
        return [404, "Data Not Found"];
    } catch (error) {
        return [500, "Upps! Something Went Wrong."];
    }
};

export const statusChangeById = async (id) => {
    try {
        const response = await axios.get(`${URL}/status-change/${id}`);
        if(response.status === 200){
            return [200, "Status Changed Successfully."];
        }
        return [404, "Upps! Something Went Wrong."]
    } catch (error) {
        return [500, "Upps! Something Went Wrong."];
    }
};

export const deleteUserById = async (id) => {
    try {
        const response = await axios.delete(`${URL}/${id}`);
        if(response.status === 200){
            return [200, "Status Changed Successfully."];
        }
        return [404, "Upps! Something Went Wrong."]
    } catch (error) {
        return [500, "Upps! Something Went Wrong."];
    }
};

export const updateUser = async (user, id) => {
    try {
        const updatedUser = await axios.put(`${URL}/update/${id}`, user);
        return [200, updatedUser];
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [404, error.response.data.error];
        }
        return [500, (error.response && 
            error.response.data && 
            error.response.data.error) ? 
            error.response.data.error : 
            "Upps! Something Went Wrong."];
    }
};