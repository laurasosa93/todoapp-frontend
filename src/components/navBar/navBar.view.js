import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TASK_PAGE, PROFILE_PAGE, COLLECTION_PAGE } from '../../constants/routers';
import './navBar.css';


const NavBar = ({ handleSearchValue }) => {


    const [searchValue, setSearchValue] = useState('');

    return (
        <div className='navBar'>

            <Link to={TASK_PAGE} className='task_link'>
                Tasks
            </Link>

            <Link to={COLLECTION_PAGE} className='collection_link'>
                Collections
            </Link>

            <div className='search'>
                <input type='search' onChange={e => setSearchValue(e.target.value)} />
                <input type='button' value='SEARCH' onClick={() => handleSearchValue(searchValue)} />
            </div>

            <Link to={PROFILE_PAGE} className='user_link'>
                PROFILE
            </Link>

        </div>

    )
}

export default NavBar;