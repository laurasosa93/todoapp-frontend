import React from 'react';
import './collectionItem.css';



const CollectionItem = ({colItem}) => {
return(


< div className="collection_item" >
  <p>{colItem.name}</p>
   
</div>
  )};

export default CollectionItem;