import {COURSE_DETAIL} from '../actions/types';

export default function (state = [], action)
{
  switch (action.type)
  {
    case COURSE_DETAIL:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
