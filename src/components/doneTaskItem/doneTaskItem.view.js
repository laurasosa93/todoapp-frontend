import React, { useState } from 'react';
import styles from './doneTaskItem.module.css';
import { API_URL } from '../../constants/routers';

const DoneTaskItem = ({ task }) => {

  const [toDo, setToDo] = useState(true);

  const handleStatus = () => {
    const url = `${API_URL}/task/${task._id}`;
    const body = {
      status: toDo
    }

    const options = {
      method: 'PUT',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
      mode: 'cors',
      body: JSON.stringify(body),
    };
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .catch();
  }

  const deleteTask = () => {
    const url = `${API_URL}/task/${task._id}`;


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
      .catch();
  }

  const changeStatus = () => {
    setToDo(!toDo);

    handleStatus();
  }


  return (

    <div className={styles.done_task_item} >

      <input type='button' className={styles.checkbox} onClick={changeStatus} />
      <p>{task.name}</p>
      <input type='button' value='Delete' className={styles.edit_button} onClick={deleteTask} />
    </div>

  )
}

export default DoneTaskItem;