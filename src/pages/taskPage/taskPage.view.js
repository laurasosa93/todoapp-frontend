import React, {useEffect, useState} from 'react';
import './taskPage.css';
import NewTaskModal from '../../components/newTaskModal';
import ToDoTaskItem from '../../components/toDoTaskItem/taskItem.view';
import DoneTaskItem from '../../components/doneTaskItem/doneTaskItem.view';

const TaskPage = ({getCol}) => {

    const [openModal, setOpenModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [selCol, setSelCol] = useState({});
    const [toDoTaskList, setToDoTaskList] = useState([]);
    const [doneTaskList, setDoneTaskList] = useState([]);
    const [colTaskList, setColTaskList] = useState([]);

    const getTasks = () => {
      fetch(`http://localhost:3001/task`)
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        console.log(data);
        setTaskList(data);   
      })
      .catch(error => {
        console.error(error);
      });
    }

    useEffect(() => {
     getTasks();
    }, [selCol]);
    
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
        setColTaskList(taskList.filter(task => task.col === selCol._id))
      }, [selCol])
    
  console.log(taskList);
    useEffect(()=> {
      setToDoTaskList(colTaskList.filter(task => task.status === true));
       setDoneTaskList(colTaskList.filter(task => task.status === false));
    }, [taskList])

  

    console.log(toDoTaskList);
    console.log(doneTaskList);





    return (

        <div className="taskPage">
      
             <p className="headline">{selCol.name}</p>
            
             <div className="task_list">
             <div>To do tasks</div>
          
            
          { colTaskList &&   
          (toDoTaskList.map(task =>
              < ToDoTaskItem key={task._id} task={task} /> 
              ))}   
          <div>Completed tasks</div>
         
          { colTaskList && ( doneTaskList.map(task =>
              < DoneTaskItem key={task._id} task={task} /> 
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