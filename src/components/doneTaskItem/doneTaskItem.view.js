import React, { useState } from 'react';
import './doneTaskItem.css';

const DoneTaskItem = ({task}) => {

  const [toDo, setToDo] = useState(true);
 
  const handleStatus = () => {
    const url = `http://localhost:3001/task/${task._id}`;
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
    fetch(url, body, options)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      return Promise.reject();
    })
    .then(response => {
      console.log(response);     
      
    })
    .catch(error => {
      console.error(error);
    });
  }

  const deleteTask = () => {
    const url = `http://localhost:3001/task/${task._id}`;
         
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
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      return Promise.reject();
    })
    .then(response => {
      console.log(response);     
      
    })
    .catch(error => {
      console.error(error);
    });
  }

  const changeStatus = () => {
  setToDo(!toDo);
  
    handleStatus();
   }


return(

 <div className="done_task_item" >
    <input type="checkbox" onClick={changeStatus}/> 
    <p>{task.name}</p>
    <input type="button" value="Edit" className="edit_button" />
    <input type="button" value="Delete" className="edit_button" onClick={deleteTask}/>
  </div>

  )
}

export default DoneTaskItem;