import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import AdminViewVendors from '../pages/AdminViewVendors';
import Signout from '../pages/Signout';
import AddVendor from '../pages/AddVendor';
import ListAvailableVendors from '../pages/ListAvailableVendors';
import VendorHome from '../pages/VendorHome';
import EditStore from '../pages/EditStore';
import TopPick from '../pages/TopPick';
import BottomFooter from '../components/BottomFooter';
import UserHomePage from '../pages/UserHomePage';
import EditUserProfile from '../pages/EditUserProfile';
import AddFood from '../pages/AddFood';
import AdminUser from '../pages/AdminUser';
import VendorViewFoods from '../pages/VendorViewFoods';
import AdminFoodList from '../pages/AdminFoodList';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="manoa-background">
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/userhome" component={UserHomePage}/>
              <VendorProtectedRoute path="/addvendor" component={AddVendor}/>
              <CustomerProtectedRoute path="/listvendors" component={ListAvailableVendors}/>
              <CustomerProtectedRoute path="/toppick" component={TopPick}/>
              <VendorProtectedRoute path="/vendor" component={VendorHome}/>
              <VendorProtectedRoute path="/storeEdit" component={EditStore}/>
              <VendorProtectedRoute path="/vendorAddFood" component={AddFood}/>
              <VendorProtectedRoute path="/vendorFoodList" component={VendorViewFoods}/>
              <ProtectedRoute path="/EditPreferences" component={EditUserProfile}/>
              <CustomerProtectedRoute path="/user" component={EditUserProfile}/>
              <ProtectedRoute path="/edit/:_id" component={VendorHome}/>
              <AdminProtectedRoute path="/admin" component={AdminViewVendors}/>
              <AdminProtectedRoute path="/adminFoodList" component={AdminFoodList}/>
              <AdminProtectedRoute path="/adminUser" component={AdminUser}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <BottomFooter/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * VendorProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and vendor role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const VendorProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
          return (isLogged && isVendor) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

const CustomerProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isCustomer = Roles.userIsInRole(Meteor.userId(), 'customer');
          return (isLogged && isCustomer) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

VendorProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

CustomerProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
