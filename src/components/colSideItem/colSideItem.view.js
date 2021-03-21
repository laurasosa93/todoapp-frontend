import React from 'react';
import './colSideItem.css';

const ColSideItem = ({col, getCollection}) => {
    
const handleClick = () => {
  getCollection(col._id);
;}

return(
<input type="button" className="col_side_item" onClick={handleClick} value={col.name} />
 
  )
};

export default ColSideItem;