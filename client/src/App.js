import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import  setAuthToken  from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Buildings from './components/buildings/Buildings';
import SingleBuilding from './components/buildings/SingleBuilding';
import PrivateRoute from './components/routing/PrivateRoute';
import BuildingForm from './components/buildings/BuildingForm';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    console.log('fjjahdfj');
    store.dispatch(loadUser());
  },[]);


  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/buildings" component={Buildings} />
            <PrivateRoute exact path='/single-building' component={SingleBuilding} />
            <PrivateRoute exact path="/new-building" component={BuildingForm} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>

  
)};


export default App;
