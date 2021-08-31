import React, { useEffect, useState, useContext } from 'react';
import styles from './collectionPage.module.css';
import NewCollectionModal from '../../components/newCollectionModal/newCollectionModal';
import CollectionItem from '../../components/collectionItem/collectionItem.view';
import CollectionContext from '../../context/collectionContext';
import CollectionModal from '../../components/collectionModal';

const CollectionPage = ({ refresh }) => {
    const { colData } = useContext(CollectionContext);
    const [openModal, setOpenModal] = useState(false);
    const [openCol, setOpenCol] = useState(false);

    useEffect(() => {
        refresh();
    }, [openModal]);

    const editCol = () => {
        setOpenCol(true);
    }

    return (

        <div className={styles.collectionPage}>
            <div className={styles.collectionList}>
                <>

                    {colData ? colData.map(colItem =>
                        < CollectionItem
                            key={colItem._id} colItem={colItem} refresh={refresh} onClick={editCol} />)
                        : <p>Start adding collections</p>}
                </>
            </div>
            <NewCollectionModal open={openModal} close={() => setOpenModal(false)} />
            <input type="button" className={styles.addButton} value="Add new collection" onClick={() => setOpenModal(!openModal)} />
            {openCol ? (<CollectionModal />) : null}
        </div>
    )
}

export default CollectionPage;