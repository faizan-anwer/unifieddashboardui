import {ENROLL_SUBS_COURSE} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case ENROLL_SUBS_COURSE:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
