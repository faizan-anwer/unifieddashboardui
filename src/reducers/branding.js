import {FETCH_BRAND} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case FETCH_BRAND:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
