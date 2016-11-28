import {ENROLL_SUBS_CLASS} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case ENROLL_SUBS_CLASS:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
