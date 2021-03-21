import React, { useState } from 'react';
import './newCollectionModal.css';

  //  buscar color-picker, aquí hay que meter un select para los iconos

  

const NewCollectionModal = ({open, close}) => {

    if (!open) {
        return null;
    } 

    const [collectionDescription, setCollectionDescription] = useState('');
  
    const createCollection = () => {
      const url = 'http://localhost:3001/collection';
      const body = {
        name: `${collectionDescription}`,
     
      };
  
      const options = {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-type': 'application/json',
        }),
        mode: 'cors',
        body: JSON.stringify(body),
      };
  
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
        setCollectionDescription(response);
      })
      .catch(error => {
        console.error(error);
      });
    }


  return(

<div className='newCollectionModal'>
  <h2 className="headline">+ Add new collection</h2>
   <form>
    <label>
      Collection description
      <br/>
     <input type="text" className="input" placeholder="Write new collection" onChange={e => setCollectionDescription(e.target.value)}/>
     </label>
   </form>
   <input type="button" className="cancelbutton" value="Cancel" onClick={close}/>
   <input type="submit" className="createbutton" value="Create" onClick={createCollection}/>
  </div>

  )
}

export default NewCollectionModal;