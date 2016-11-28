import {SUBS_CLASS_LOCATIONS} from '../actions/types';

export default function (state = [], action)
{
  switch (action.type)
  {
    case SUBS_CLASS_LOCATIONS:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
