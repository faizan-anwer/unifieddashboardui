import {CURRENT_ENROLLMENTS} from "../actions/types";

export default function (state = 0, action)
{
  switch (action.type)
  {
    case CURRENT_ENROLLMENTS:
      return action.payload;
  }
  return state;
};
