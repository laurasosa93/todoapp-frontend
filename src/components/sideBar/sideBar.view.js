import React, { useEffect, useState} from 'react';
import './sideBar.css';
import NewCollectionModal from '../newCollectionModal/newCollectionModal';
import ColSideItem from '../colSideItem/colSideItem.view';



const SideBar = ({collectionData, sendCol}) => {

  const [openModal, setOpenModal] = useState(false);
  const [collection, setCollection] = useState([]);

  
  useEffect(() => {
  if(collectionData) {
    setCollection(collectionData);
    console.log(collection);
}}, []);

    

return(
  
  <div className='side_bar'>
      <p className="bar_headline">Collections</p>
   <div className="collection_menu" >
    { collection.length && collection.map(col =>
      <ColSideItem key={col._id} col={col} getCollection={sendCol}/>
      )}
   </div>
    <div className="add_collection">
      <input type="button" value="+" className="add_col_button" onClick={()=> setOpenModal(!openModal)}/>
      <p>Add collection</p>
      <NewCollectionModal open={openModal} close={()=> setOpenModal(false)}/>
    </div>
  </div>

)
}

export default SideBar;