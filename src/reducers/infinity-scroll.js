import {INFINITY_SCROLL} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case INFINITY_SCROLL:
      return action.payload;
  }
  return state;
};
