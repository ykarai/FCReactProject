import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Panel from './components/Panel/Panel';
import Site from './components/Site/Site';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import image from './Images.png'
import { useDispatch, useSelector } from "react-redux";
import { setProjectActionCreator } from './store/actions/setProjectActionCreator'
import User from './components/User/User';

function App() {
  
  const [siteData, setSiteData] = useState([]);
  let history = useHistory();

  const projectState = useSelector(state => state.data.project);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://ptfwf2r79k.execute-api.eu-west-1.amazonaws.com/dev/projects/5df9fa0cf98a4b0008647/no-auth?bins-populated=true')
      .then(response => response.json())
      .then(responseData => {
        dispatch(setProjectActionCreator(responseData));
      });
  }, []);

  useEffect(() => {
    console.log('projectState (App component)', projectState);
  }, [projectState]);

  const showSiteDataHandler = (site) => {
    setSiteData(site);
    //console.log('site', site);
    history.push({
      pathname: '/Site',
      search: '?' + site.displayName
    });
  };
  return (
    <div className="App">
      <img src={image} width="150" height="70" alt="pic" />
      <Switch>
      <Route path="/" exact >
          <User/>
      </Route>
        <Route path="/" exact >
          <Panel showSite={showSiteDataHandler}
            history={history} />
        </Route>
        <Route path="/Site">
          <Site data={siteData} history={history} />
        </Route>
      </Switch>   
    </div>
  );
}
export default App;

