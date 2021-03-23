import React, { useState } from 'react';
import './newCollectionModal.css';
import Select from 'react-select';
import {iconsMap} from '../../assets/icons';
  

const NewCollectionModal = ({open, close}) => {

    if (!open) {
        return null;
    } 

    const [collectionDescription, setCollectionDescription] = useState('');
    const [icon, setIcon] = useState(undefined);
    const [color, setColor] = useState(undefined);
 
    const createCollection = () => {
      const url = 'http://localhost:3001/collection';
      const body = {
        name: `${collectionDescription}`,
        icon: icon,
        color: `${color}`    
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

const options = Object.keys(iconsMap).map(iconKey => {
  return{label: iconsMap[iconKey], value: iconKey}
})

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
   <form>
    <input type="color" id="color" name="color"
           value={color} onChange={e=>setColor(e.target.value)}/>
    <label>Color</label>
    </form>

  <Select className="select_icon" options={options} onChange={setIcon}/>


   <input type="button" className="cancelbutton" value="Cancel" onClick={close}/>
   <input type="submit" className="createbutton" value="Create" onClick={createCollection}/>
  </div>

  )
}

export default NewCollectionModal;