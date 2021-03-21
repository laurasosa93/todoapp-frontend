import React, { useState } from 'react';
import './userPage.css';
import NewUserModal from '../../components/newUserModal/newUserModal.view.js'


const UserPage = () => {


    const [openModal, setOpenModal] = useState(false);

  


    return (

        <div className='userPage'>
           <NewUserModal open={openModal} close={()=> setOpenModal(false)}/>
            <input type="button" value="Create new user" onClick={()=> setOpenModal(!openModal)}/>
            <p>Create a new user!</p>
        </div>
    )
}

export default UserPage;