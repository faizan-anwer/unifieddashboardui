//  App Core Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import reducers from './reducers';
import Async from './middlewares/async';

//  App Root Components
import RequireAuth from './components/auth';
import App from './components/app';
import Login from './components/login';
import Logout from './components/logout';
import Token from './components/token';
import CAS from './components/pages/cas';

//  App Inner Components
import AccountInfo from './components/pages/account-info';
import AddressBook from './components/pages/address-book';
import Billing from './components/pages/billing';
import BrowseFreeCourses from './components/pages/browse-free-courses';
import CourseReport from './components/pages/course-report';
import Courses from './components/pages/courses';
import CreateCourse from './components/pages/create-course';
import EnrollUsers from './components/pages/enroll-users';
import ManageUsers from './components/pages/manage-users';
import Orders from './components/pages/orders';
import PrivacyPolicy from './components/pages/privacy-policy';
import RunReport from './components/pages/run-report';
import Shop from './components/pages/shop';
import Subscriptions from './components/pages/subscriptions';
import Support from './components/pages/support';
import Terms from './components/pages/terms';
import Transcriptions from './components/pages/transcriptions';
import NotFound from './components/pages/not-found';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory}>
        <Route path='/'>
            <Route path='LS360Dashboard'>
              <Route path='token' component={Token} />
              <Route path='login' component={Login} />
              <Route component={RequireAuth(App)}>
                <Route path='cas' component={CAS} />
                <Route path='account-info' component={AccountInfo} />
                <Route path='address-book' component={AddressBook} />
                <Route path='billing' component={Billing} />
                <Route path='browse-free-courses' component={BrowseFreeCourses} />
                <Route path='course-report' component={CourseReport} />
                <Route path='courses' component={Courses} />
                <Route path='create-course' component={CreateCourse} />
                <Route path='enroll-users' component={EnrollUsers} />
                <Route path='manage-users' component={ManageUsers} />
                <Route path='orders' component={Orders} />
                <Route path='run-report' component={RunReport} />
                <Route path='shop' component={Shop} />
                <Route path='subscriptions' component={Subscriptions} />
                <Route path='terms(/:i)' component={Terms} />
                <Route path='privacy-policy(/:i)' component={PrivacyPolicy} />
                <Route path='support(/:i)' component={Support} />
                <Route path='transcriptions' component={Transcriptions} />
                <Route path='sign-out' component={Logout} />
                <Route path='*' component={NotFound} />
              </Route>
            </Route>
        </Route>
      </Router>
    </Provider>
  , document.querySelector('#dashboard'));
