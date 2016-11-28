import {CLASS_DETAIL} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case CLASS_DETAIL:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
