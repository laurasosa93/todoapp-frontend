import React, { useState } from 'react';
import Select from 'react-select';
import styles from './newCollectionModal.module.css';
import { API_URL } from '../../constants/routers';
import { iconsMap } from '../../assets/icons';


const NewCollectionModal = ({ open, close }) => {

  if (!open) {
    return null;
  }

  const [collectionDescription, setCollectionDescription] = useState('');
  const [icon, setIcon] = useState({});
  const [color, setColor] = useState(undefined);


  const createCollection = () => {
    const url = `${API_URL}/collection`;
    const body = {
      name: `${collectionDescription}`,
      icon: `${icon}`,
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
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(response => {
        setCollectionDescription(response);
      })
      .then(close())
      .catch();
  }

  const options = Object.keys(iconsMap).map(iconKey =>
  (
    { label: iconsMap[iconKey], value: iconKey })
  )

  return (
    <div className={styles.modal}>
      <div className={styles.newCollectionModal}>
        <h2 className={styles.headline}>+ Add new collection</h2>
        <form>
          <label>
            Collection description
            <br />
            <input type='text' className='input' placeholder='Write new collection' onChange={e => setCollectionDescription(e.target.value)} />
          </label>
        </form>
        <form>
          <input type='color' id='color' name='color'
            value={color} onChange={e => setColor(e.target.value)} />
          <label>Color</label>
        </form>

        <Select className={styles.select_icon} options={options} onChange={setIcon} />

        <div type='button' className={styles.cancelbutton} onClick={close}>Cancel</div>
        <input type='submit' className={styles.createbutton} value='Create' onClick={createCollection} />
      </div>
    </div>
  )
}

export default NewCollectionModal;