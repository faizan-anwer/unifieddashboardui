import {SUBS_COUNTERS} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case SUBS_COUNTERS:
      return action.payload;
  }
  return state;
};
