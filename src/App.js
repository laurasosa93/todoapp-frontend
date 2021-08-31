import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './components/navBar/navBar.view';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import TaskPage from './pages/taskPage';
import CollectionPage from './pages/collectionPage';
import CollectionContext from './context/collectionContext';
import { LOGIN_PAGE, TASK_PAGE, PROFILE_PAGE, COLLECTION_PAGE, API_URL } from './constants/routers';

function App() {
  const [colData, setColData] = useState();
  const [colToTask, setColToTask] = useState({});
  const value = { colData, setColData };
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/collection`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        if (data) {
          setColData(data);
        }
      })
      .catch();
  }, [refresh]);

  console.log(colData);

  return (
    <Router >
      <div className='App'>
        <Switch>
          <Route path={LOGIN_PAGE}>
            <LoginPage />
          </Route>
          <Route path={PROFILE_PAGE} >
            <NavBar />
            <ProfilePage />
          </Route>
          <CollectionContext.Provider value={value}>
            <Route path={TASK_PAGE}>
              <NavBar />
              <TaskPage getCol={colToTask} collectionData={colData} sendCol={setColToTask} refresh={() => {
                setRefresh(!refresh);
              }} />
            </Route>
            <Route path={COLLECTION_PAGE}>
              <NavBar />
              <CollectionPage refresh={() => {
                setRefresh(!refresh);
              }} />
            </Route>
          </CollectionContext.Provider>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

