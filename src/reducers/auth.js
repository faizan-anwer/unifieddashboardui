import {CHANGE_AUTH} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case CHANGE_AUTH:
      if(typeof(Storage))
      {
        //console.log(action.payload);
        if(typeof action.payload.errors == "undefined")
        {
          localStorage.setItem("auth",action.payload);
        }
        else
        {
          localStorage.removeItem("auth");
        }
      }
      return action.payload;
  }
  return state;
};
