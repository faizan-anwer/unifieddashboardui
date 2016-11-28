import axios from 'axios';
import {
  FETCH_BRAND,
  LEFT_MENU,
  TOOL_TIP,
  POPOVER,
  COURSE_COUNTERS,
  SUBS_COUNTERS,
  CHANGE_AUTH,
  COURSE_ISOTOPES,
  SUBS_ISOTOPES,
  MODAL,
  COURSE_DETAIL,
  CLASS_DETAIL,
  TOKEN_VERIFICATION,
  INFINITY_SCROLL,
  ENROLL_SUBS_COURSE,
  ENROLL_SUBS_CLASS,
  SUBS_CLASS_LOCATIONS,
  CURRENT_ENROLLMENTS,
  GET_USER_INFO,
  POST_USER_INFO,
  GET_COUNTRIES
} from './types';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function authentication(isLogin,userName="",pass="",token=false)
{
  if(isLogin)
  {
    if(process.env.MOCKED_DATA)
    {
      token = axios({url:'/assets/json/token.json'});
    }
    else
    {
      token = axios.get(process.env.APP_SERVER+"/LS360Dashboard/token/get",{
        params:{
          "userName": userName,
          "password": pass
        }
      });
    }
  }
  localStorage.setItem("userName",userName);

  return{
    type:CHANGE_AUTH,
    payload:token
  };
}

export function fetchBrand()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/brand.json'});
  }
  else
  {
    request = axios.get(process.env.API_SERVER+"/LS360ApiGateway/services/rest/brand");
  }
  return{
    type:FETCH_BRAND,
    payload:request
  };
}

export function leftMenuToggle(isOpen,activeAccType="", activeType="")
{
  return{
    type:LEFT_MENU,
    payload:{
      "isOpen":isOpen,
      "activeAccType":activeAccType,
      "activeType":activeType
    }
  };
}

export function popover(obj={})
{
  return{
    type:POPOVER,
    payload:obj
  }
}

export function tooltip(visible,pos='default',css={},content='')
{
  return{
    type:TOOL_TIP,
    payload:{
      "visible":visible,
      "pos":pos,
      "css":css,
      "content":content
    }
  }
}

export function courseCounters()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/course-count.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/course/count",JSON.stringify({
      "countType": [
        "all","subscriptions","completed","inProgress","notstarted"
      ]
    }));
  }

  return{
    type:COURSE_COUNTERS,
    payload:request
  }
}

export function subsCounters()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/subs-count.json'});
  }
  else
  {
    request = axios.get(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/subscription/activityMonitor");
  }

  return{
    type:SUBS_COUNTERS,
    payload:request
  }
}

export function getCourseIsotopes(obj)
{
  //console.log(obj);
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/courses.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/courses",JSON.stringify({
      "pageSize":obj.pageSize,
      "pageNumber":obj.pageNumber,
      "sort": obj.sort,
      "searchText":obj.searchText,
      "filter":obj.filter
    }));
  }
  return{
    type:COURSE_ISOTOPES,
    payload:request
  };
}

export function getSubsIsotopes(obj)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/subs.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/subscription/courses",JSON.stringify({
      "includeFacet":obj.withFacet,
      "pSize":obj.pageSize,
      "pNumber":obj.pageNumber,
      "sortOrder": obj.sort,
      "searchQuery":obj.searchText,
      "queryFacet": obj.queryFacet
    }));
  }
  return{
    type:SUBS_ISOTOPES,
    payload:request
  };
}

export function enrollSubsCourse(obj)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/enroll-subs-course.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/subscriptionEnrollment",JSON.stringify(obj));
  }
  return{
    type:ENROLL_SUBS_COURSE,
    payload:request
  };
}

export function enrollSubsClass(obj)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/enroll-subs-class.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/classroomcourse/email",JSON.stringify(obj));
  }
  return{
    type:ENROLL_SUBS_CLASS,
    payload:request
  };
}

export function getSubsClassLocations(obj)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/subs-class-locations.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/classroomcourse/schedule",JSON.stringify(obj));
  }
  return{
    type:SUBS_CLASS_LOCATIONS,
    payload:request
  };
}

export function setCurrentEnrollments(counts)
{
  return{
    type:CURRENT_ENROLLMENTS,
    payload:counts
  }
}

export function clearState(expression)
{
  switch (expression)
  {
    case "COURSE_ISOTOPES":
      return{
        type:COURSE_ISOTOPES,
        payload:{}
      };
      break;
    case "SUBS_ISOTOPES":
      return{
        type:SUBS_ISOTOPES,
        payload:{}
      };
      break;
    case "COURSE_COUNTERS":
      return{
        type:COURSE_COUNTERS,
        payload:{}
      };
      break;
    case "SUBS_COUNTERS":
      return{
        type:SUBS_COUNTERS,
        payload:{}
      };
      break;
    case "FETCH_BRAND":
      return{
        type:FETCH_BRAND,
        payload:{}
      };
      break;
    case "COURSE_DETAIL":
      return{
        type:COURSE_DETAIL,
        payload:[]
      };
      break;
    case "CLASS_DETAIL":
      return{
        type:CLASS_DETAIL,
        payload:{}
      };
      break;
    case "ENROLL_SUBS_COURSE":
      return{
        type:ENROLL_SUBS_COURSE,
        payload:{}
      };
      break;
    case "ENROLL_SUBS_CLASS":
      return{
        type:ENROLL_SUBS_CLASS,
        payload:{}
      };
      break;
    case "SUBS_CLASS_LOCATIONS":
      return{
        type:SUBS_CLASS_LOCATIONS,
        payload:[]
      };
      break;
    case "GET_USER_INFO":
      return{
        type:GET_USER_INFO,
        payload:{}
      };
      break;
    case "POST_USER_INFO":
      return{
        type:POST_USER_INFO,
        payload:{}
      };
      break;
    case "GET_COUNTRIES":
      return{
        type:GET_COUNTRIES,
        payload:{}
      };
      break;
  }
}

export function getModal(obj={"visible":false})
{
  return{
    type:MODAL,
    payload:obj
  };
}

export function getClassDetail(eId)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/class-details.json'});
  }
  else
  {
    request = axios.get(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/classroom/details/"+eId);
  }

  return{
    type:CLASS_DETAIL,
    payload:request
  };
}

export function getCourseDetail(eId)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/view-details.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/courses/statistics/byEnrollmentId",JSON.stringify({
      "enrollmentId" : [eId]
    }));
  }

  return{
    type:COURSE_DETAIL,
    payload:request
  };
}

export function tokenVerify(token)
{
  axios.defaults.headers.common['Authorization'] = "bearer "+token;
  const request = axios.get(process.env.API_SERVER+"/LS360ApiGateway/services/rest/jwt/validate");
  return{
    type:TOKEN_VERIFICATION,
    payload:request
  };
}

export function infinityScroll(request)
{
  return{
    type:INFINITY_SCROLL,
    payload:request
  };
}

export function fetchUserInfo()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/get-user-info.json'});
  }
  else
  {
    request = axios.get(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/profile");
  }
  return{
    type:GET_USER_INFO,
    payload:request
  };
}

export function submitUserInfo(postData)
{
  alert(JSON.stringify(postData));
  //process.env.API_SERVER
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/post-user-info.json'});
  }
  else
  {
    request = axios.post("http://10.0.100.83:9092"+"/LS360ApiGateway/services/rest/learner/profile",JSON.stringify(postData));
  }
  return{
    type:POST_USER_INFO,
    payload:request
  };
}

export function getCountries()
{
  var request = axios({url:'/assets/json/countries.json'});

  return{
    type:GET_COUNTRIES,
    payload:request
  };
}
