import React, { useEffect, useState, useContext } from 'react';
import styles from './taskPage.module.css';
import NewTaskModal from '../../components/newTaskModal';
import ToDoTaskItem from '../../components/toDoTaskItem/taskItem.view';
import DoneTaskItem from '../../components/doneTaskItem/doneTaskItem.view';
import SideBar from '../../components/sideBar';
import { API_URL } from '../../constants/routers';
import CollectionContext from '../../context/collectionContext';

const TaskPage = ({ getCol, sendCol }) => {


  const { colData } = useContext(CollectionContext);
  const [openModal, setOpenModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selCol, setSelCol] = useState({});
  const [toDoTaskList, setToDoTaskList] = useState([]);
  const [doneTaskList, setDoneTaskList] = useState([]);
  const [colTaskList, setColTaskList] = useState([]);

  const getTasks = () => {
    fetch(`${API_URL}/task`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        setTaskList(data);
      })
      .catch();
  }

  useEffect(() => {
    getTasks();
  }, [selCol]);

  const getCollection = () => {
    fetch(`${API_URL}/collection/${getCol}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        setSelCol(data);
      })
      .catch();
  }

  useEffect(() => {
    getCollection();
  }, [getCol]);


  useEffect(() => {
    setColTaskList(taskList.filter(task => task.col === selCol._id))
  }, [selCol])

  useEffect(() => {
    setToDoTaskList(colTaskList.filter(task => task.status === true));
    setDoneTaskList(colTaskList.filter(task => task.status === false));
  }, [taskList])


  return (

    <div className={styles.taskPage}>
      <SideBar className={styles.sidebar} collectionData={colData} sendCol={sendCol} />
      <div className={styles.main}>
        <p className={styles.headline}>{selCol.name}</p>

        <div className={styles.task_list}>
          <p>To do tasks</p>


          {colTaskList &&
            (toDoTaskList.map(task =>
              < ToDoTaskItem key={task._id} task={task} />
            ))}
          <p>Completed tasks</p>

          {colTaskList && (doneTaskList.map(task =>
            < DoneTaskItem key={task._id} task={task} />
          ))}

        </div>

        <NewTaskModal open={openModal} close={() => setOpenModal(false)} colId={getCol} />

        <div className={styles.add_input}>
          <input type="button" value="  Add task +  " onClick={() => setOpenModal(!openModal)} className="add_button" />
        </div>
      </div>
    </div>

  )
}

export default TaskPage;