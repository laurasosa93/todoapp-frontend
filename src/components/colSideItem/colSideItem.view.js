import React, {useState, useEffect} from 'react';
import './colSideItem.css';

const ColSideItem = ({col, getCollection}) => {

  const [itemColor, setItemColor] = useState();

  useEffect(()=> {
  setItemColor(col.color);
}, [])
    
const handleClick = () => {
  getCollection(col._id);
;}

return(
<input type="button" style={{backgroundColor:itemColor}}className="col_side_item" onClick={handleClick} value={col.name} />
 
  )
};

export default ColSideItem;