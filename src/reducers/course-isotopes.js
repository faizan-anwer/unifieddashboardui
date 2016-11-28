import {COURSE_ISOTOPES} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case COURSE_ISOTOPES:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
