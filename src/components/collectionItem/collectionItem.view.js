import React, { useState, useEffect } from 'react';
import './collectionItem.css';




const CollectionItem = ({colItem}) => {

  const [itemColor, setItemColor] = useState();

  useEffect(()=> {
  setItemColor(colItem.color);
}, [])


const deleteCol = () => {
  const url = `http://localhost:3001/collection/${colItem._id}`;
       
  const options = {
    method: 'DELETE',
    headers: new Headers({
      Accept: 'application/json',
      'Content-type': 'application/json',
    }),
    mode: 'cors',
  };
  fetch(url, options)
  .then(response => {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    return Promise.reject();
  })
  .then(response => {
    console.log(response);     
    
  })
  .catch(error => {
    console.error(error);
  });
}




return(


< div className="collection_item" style={{backgroundColor: itemColor}} >
 
  <p >{colItem.name}</p>
  <input type="button" value="X" onClick={deleteCol}/>
   
</div>
  )};

export default CollectionItem;