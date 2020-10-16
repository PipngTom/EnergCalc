import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Buildings from "./components/buildings/Buildings";
import SingleBuilding from "./components/buildings/SingleBuilding";
import PrivateRoute from "./components/routing/PrivateRoute";
import BuildingForm from "./components/buildings/BuildingForm";
import EditBuilding from "./components/buildings/EditBuilding";
import AddTransparentEl from "./components/buildings/AddTransparentEl";
import AddUnTransparentEl from "./components/buildings/AddUnTransparentEl";
import Measures from "./components/buildings/Measures";
import AddTransMeasure from "./components/buildings/AddTransMeasure";
import EditTransMeasure from "./components/buildings/EditTransMeasure";
import EditUnTransMeasure from "./components/buildings/EditUnTransMeasure";
import AddUnTransMeasure from "./components/buildings/AddUnTransMeasure";
import Reports from "./components/reports/Reports"
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
              <Route exact path="/buildings" component={Buildings} />
              <Route
                exact
                path="/single-building/:_id"
                component={SingleBuilding}
              />
              <PrivateRoute
                exact
                path="/edit-building/:_id"
                component={EditBuilding}
              />
              <PrivateRoute
                exact
                path="/edit-trans/:_id"
                component={EditTransMeasure}
              />
              <PrivateRoute
                exact
                path="/edit-untrans/:_id"
                component={EditUnTransMeasure}
              />
              <PrivateRoute
                exact
                path="/new-building"
                component={BuildingForm}
              />
              <PrivateRoute
                exact
                path="/reports"
                component={Reports}
              />
              <PrivateRoute
                exact
                path="/add-transparent/:_id"
                component={AddTransparentEl}
              />
              <PrivateRoute
                exact
                path="/add-untransparent/:_id"
                component={AddUnTransparentEl}
              />
              <PrivateRoute exact path="/measures" component={Measures} />
              <PrivateRoute
                exact
                path="/add-trans-measure"
                component={AddTransMeasure}
              />
              <PrivateRoute
                exact
                path="/add-untrans-measure"
                component={AddUnTransMeasure}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
