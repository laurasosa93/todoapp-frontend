import React, { useState } from 'react';
import './newTaskModal.css';

const NewTaskModal = ({open, close, colId}) => {

    if (!open) {
        return null;
    } 
    
    const [taskDescription, setTaskDescription] = useState('');

    const createTask = () => {
      const url = 'http://localhost:3001/task';
      const body = {
        name: `${taskDescription}`,
        status: true,
        col: colId
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
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(response => {
        console.log(response);
        setTaskDescription(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
    

  return(

<div className='newTaskModal'>
  <h2>+ Add new taks</h2>
   <form>
    <label>
      Task description
     <input type="text" placeholder="Write task description" onChange={e => {setTaskDescription(e.target.value)}}/>
     </label>
   </form>
   <input type="button" className="cancelbutton" value="Cancel" onClick={close}/>
   <input type="submit" className="createbutton" value="Create" onClick={createTask} />
 
</div>
  )
}

export default NewTaskModal;