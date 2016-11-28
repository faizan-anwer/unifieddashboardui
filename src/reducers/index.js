import { combineReducers } from 'redux';
import Branding from './branding';
import LeftMenu from './left-menu';
import ToolTip from './tool-tip';
import Popover from './popover';
import Auth from './auth';
import CourseCounters from './course-counters';
import SubsCounters from './subs-counters';
import CourseIsotopes from './course-isotopes';
import SubsIsotopes from './subs-isotopes';
import Modal from './modal';
import CourseDetail from './course-detail';
import ClassDetail from './class-detail';
import TokenVerification from './token-verification';
import InfinityScroll from './infinity-scroll';
import EnrollSubsCourse from './enroll-subs-course';
import EnrollSubsClass from './enroll-subs-class';
import SubsClassLocations from './subs-class-locations';
import CurrentEnrollments from './current-enrollments';
import GetUserInfo from './get-user-info';
import PostUserInfo from './post-user-info';
import Countries from './countries';

const rootReducer = combineReducers({
  "branding":Branding,
  "leftMenu":LeftMenu,
  "tooltip":ToolTip,
  "popover":Popover,
  "courseCounters":CourseCounters,
  "subsCounters":SubsCounters,
  "auth":Auth,
  "courseIsotopes":CourseIsotopes,
  "subsIsotopes":SubsIsotopes,
  "modal":Modal,
  "courseDetail":CourseDetail,
  "classDetail":ClassDetail,
  "tokenVerification":TokenVerification,
  "infinityScroll":InfinityScroll,
  "enrollSubsCourse":EnrollSubsCourse,
  "enrollSubsClass":EnrollSubsClass,
  "subsClassLocations":SubsClassLocations,
  "currentEnrollments":CurrentEnrollments,
  "getUserInfo":GetUserInfo,
  "postUserInfo":PostUserInfo,
  "countries": Countries
});

export default rootReducer;
