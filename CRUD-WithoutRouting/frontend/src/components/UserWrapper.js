import React, { useState } from 'react'
import { Users } from './Users'
import { AddUser } from './AddUser'
import { deleteUserById, statusChangeById } from '../services/api';
import { EditUser } from './EditUser';


export const UserWrapper = () => {
    const [currentRoute, setCurrentRoute] = useState(1);
    const [editUserData, setEditUserData] = useState({});
    const toggleRoute = (routeNum) => {
        setCurrentRoute(routeNum);
    }
    const statusChange = id => {
        statusChangeById(id);
    };
    const deleteUser = id => {
        deleteUserById(id);
    };

    const showEditPage = user => {
        setEditUserData(user);
        setCurrentRoute(3);
    };
  return (
    <div className='userWrapper'>
        {
            currentRoute === 1 ? (<Users toggleRoute={toggleRoute} statusChange={statusChange}
                                    deleteUser={deleteUser} showEditPage={showEditPage} />) : (
                currentRoute === 2 ? (<AddUser toggleRoute={toggleRoute} />) : (
                    currentRoute === 3 ? (<EditUser toggleRoute={toggleRoute} userData={editUserData} />) : ''
                )
            )
        }
    </div>
  )
}
