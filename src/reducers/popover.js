import {POPOVER} from "../actions/types";

export default function (state = {}, action)
{
  switch (action.type)
  {
    case POPOVER:
      return action.payload;
  }
  return state;
};
