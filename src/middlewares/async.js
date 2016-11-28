export default function({dispatch}){
  return next => action => {

    //console.log('M1 || M3', action);

    //  M1 and M3
    if(!action.payload || !action.payload.then){
      return next(action);
    }

    //console.log('M2',action.type);

    // M2
    action.payload
      .then(function(response)
      {
        dispatch({...action, payload:response.data});
      }).catch(function (response)
      {
        if(response.status == 401){window.location.href = "http://"+window.location.host+"/LS360Dashboard/login"}
        dispatch({...action, payload:response.data});
     });

  }
}
