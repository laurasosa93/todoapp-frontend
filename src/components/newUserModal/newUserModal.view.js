import React, { useState } from 'react';
import './newUserModal.css';



const NewUserModal = ({open, close}) => {

    if (!open) {
        return null;
    } 

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const createUser = () => {
       const url = 'http://localhost:3001/user';
       const body = {
            name: `${userName}`,
            email: `${userEmail}`,
            password: `${userPassword}`
        };
    
        const options = {
           method: 'POST',
            headers: new Headers ({
              Accept: 'application/json',
             'Content-type': 'application/json',
        }),
        mode: 'cors',
       body: JSON.stringify(body),
        }

      fetch(url, options)
      .then(response => {
        console.log('Primer then');
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(response => {
        console.log('Segundo then');
        console.log(response);
        
      })
      .catch(error => {
        console.error(error);
      });
    }
    

  return(

<div className="newUserModal">
<input type="button" className="closeButton" value="X" onClick={close}/>
   <form>
    <label>
      User Name
     <input type="text" placeholder="Choose user name" onChange={e => setUserName(e.target.value)}/>
     </label>
   </form>
 
   <form>
    <label>
      E-mail
     <input type="text" placeholder="Write e-mail" onChange={e => setUserEmail(e.target.value)}/>
     </label>
   </form>
   <br/>
   <form>
    <label>
      Password
    <br/>
     <input type="text" placeholder="Write password" onChange={e => setUserPassword(e.target.value)}/>
     </label>
   </form>
   <br />
   <input type="submit" value="Sign in" onClick={createUser}/>
</div>
  )
}

export default NewUserModal;