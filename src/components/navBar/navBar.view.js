import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TASK_PAGE, USER_PAGE, COLLECTION_PAGE } from '../../routers/routers';
import './navBar.css';


const NavBar = ({handleSearchValue}) => {


const [searchValue, setSearchValue] = useState('');

    return(
     <nav className='navBar'>
         
          <Link to={TASK_PAGE} className='task_link'>
              Tasks
          </Link>
          
          <Link to={COLLECTION_PAGE} className='collection_link'>
              Collections
          </Link>
         
          <div className='search'>
          <input type='search' onChange={e=> setSearchValue(e.target.value)}/>
          <input type='button' value='SEARCH' onClick={() => handleSearchValue(searchValue)} />
          </div>
          
          <Link to={USER_PAGE} className='user_link'>
              User
          </Link>
          
     </nav>

    )
}

export default NavBar;