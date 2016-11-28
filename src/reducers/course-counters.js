import {COURSE_COUNTERS} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case COURSE_COUNTERS:
      return action.payload;
  }
  return state;
};
