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

    useEffect(()=> {
      fetch(`http://localhost:3001/collection`)
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        console.log(data);
        if(data){
          setCollection(data);
        }
     })
      .catch(error => {
        console.error(error);
      });
    }, [openModal]);
    
         

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