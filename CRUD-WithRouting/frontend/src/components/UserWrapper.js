import React from 'react'
import { Users } from './Users'
import { AddUser } from './AddUser'
import { EditUser } from './EditUser';
import {Routes, Route} from 'react-router-dom';
import { Home } from './Home';


export const UserWrapper = () => {
  return (
    <div className='userWrapper'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/edit-user/:id' element={<EditUser />} />
        </Routes>
    </div>
  )
}
