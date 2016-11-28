import {LEFT_MENU} from "../actions/types";

export default function (state = {}, action)
{
  switch (action.type)
  {
    case LEFT_MENU:
      if(typeof(Storage) && typeof localStorage.leftMenu == "undefined")
      {
        localStorage.setItem("leftMenu",JSON.stringify(action.payload));
      }
      else
      {
        localStorage.leftMenu = JSON.stringify(action.payload);
      }
      return action.payload;
  }
  return state;
};
