import React, {useEffect, useState} from 'react';
import './taskPage.css';
import NewTaskModal from '../../components/newTaskModal';
import ToDoTaskItem from '../../components/toDoTaskItem/taskItem.view';
import DoneTaskItem from '../../components/doneTaskItem/doneTaskItem.view';

const TaskPage = ({getCol, getTasks}) => {

    const [openModal, setOpenModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [selCol, setSelCol] = useState({});
    const [toDoTaskList, setToDoTaskList] = useState([]);
    const [doneTaskList, setDoneTaskList] = useState([]);
    
    console.log('ATENSIONNN');
    console.log(getCol);

      const getCollection = () => {
      fetch(`http://localhost:3001/collection/${getCol}`)
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        console.log(data);
        setSelCol(data);
     })
      .catch(error => {
        console.error(error);
      });
    }
   
      useEffect(()=> {
        getCollection();
      }, [getCol]);
    console.log(selCol);

    useEffect(()=> {
      setTaskList(getTasks.filter(task => task.col === selCol._id))
    }, [selCol])

    console.log(taskList);

    useEffect(() => {
        setToDoTaskList(taskList.filter(task => task.status === true));
        setDoneTaskList(taskList.filter(task => task.status === false));
    }, [taskList]);


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
  



    return (

        <div className="taskPage">
            { selCol ? (
             <p className="headline">{selCol.name}</p>) 
             : <p>All tasks</p>

            }
             <div className="task_list">
             <div>Tasks to do</div>
            
          { taskList && ( toDoTaskList.map(task =>
              < ToDoTaskItem key={task._id} task={task} delTask={deleteTask}/> 
              ))}   
                    
              <div>Completed tasks</div>
          { taskList && ( doneTaskList.map(task =>
              < DoneTaskItem key={task._id} task={task} delTask={deleteTask}/> 
              ))}  
  
              </div>
            
         
              <NewTaskModal open={openModal} close={()=> setOpenModal(false)} colId={getCol}/>
             
              <div className="add_input">
             <input type="button" value="  Add task +  " onClick={()=> setOpenModal(!openModal)} className="add_button"/>
             </div>           
      </div>
         
    )
}

export default TaskPage;