import React, {useState, useEffect} from 'react';
import './collectionPage.css';
import NewCollectionModal from '../../components/newCollectionModal/newCollectionModal';
import CollectionItem from '../../components/collectionItem/collectionItem.view';

const CollectionPage = ({collectionData}) => {

  const [openModal, setOpenModal] = useState(false);
  const [collection, setCollection] = useState([]);

  console.log(collectionData);


    useEffect(() => {
      if(collectionData) {
        setCollection(collectionData);
        console.log(setCollection);
      }
    }, []);
    
         

    return (

        <div className='collectionPage'>
            <div className="collectionList">
            <>
           { collection.length ? collection.map(colItem =>
               < CollectionItem 
                   key={colItem._id} colItem={colItem}/>) 
                   : <p>Start adding collections</p>}
              </>
              </div>
              <NewCollectionModal open={openModal} close={()=> setOpenModal(false)}/>
            <input type="button" className="addButton" value="Add new collection" onClick={()=> setOpenModal(!openModal)}/>
            
        </div>
    )
}

export default CollectionPage;