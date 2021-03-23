import './App.css';
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/navBar/navBar.view';
import UserPage from './pages/userPage/userPage.view';
import TaskPage from './pages/taskPage/taskPage.view';
import SideBar from './components/sideBar/sideBar.view';
import CollectionPage from './pages/collectionPage/collectionPage.view';
import { TASK_PAGE, USER_PAGE, COLLECTION_PAGE } from './routers/routers';

function App() {
 
  const [collectionList, setCollectionList] = useState([]);
  const [colToTask, setColToTask] = useState({});

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
             setCollectionList(data);
           }
        })
         .catch(error => {
           console.error(error);
         });
       }, [setColToTask]);

       console.log(collectionList);

  

  return (
    <Router >
  <div className="App">
    <NavBar className="navbar"/>
    <div className="main">
      <Switch>
        <Route exact path={USER_PAGE} >
          <UserPage />
        </Route>
        <Route path={TASK_PAGE}>
          <div className="task_route">
           <SideBar className="sidebar" collectionData={collectionList} sendCol={setColToTask}/> 
           <TaskPage className="taskpage" getCol={colToTask} />
           </div>
        </Route>
        <Route path={COLLECTION_PAGE}>
               <CollectionPage collectionData={collectionList} />
        </Route>
      </Switch>
    </div>
  </div>
    </Router>
  );
}

export default App;
