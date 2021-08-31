import React, { useState, useEffect } from 'react';
import styles from './collectionItem.module.css';
import { API_URL } from '../../constants/routers';

const CollectionItem = ({ colItem, refresh }) => {

  const [itemColor, setItemColor] = useState();

  useEffect(() => {
    setItemColor(colItem.color);
  }, [])


  const deleteCol = () => {
    const url = `${API_URL}/collection/${colItem._id}`;

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
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(refresh())
      .catch();
  }

  return (
    < div className={styles.collection_item} style={{ backgroundColor: itemColor }} >

      <p className={styles.text}>{colItem.name}</p>
      <div className={styles.delete} onClick={deleteCol}>x</div>
    </div>
  )
};

export default CollectionItem;