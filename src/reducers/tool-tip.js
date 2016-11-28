import {TOOL_TIP} from "../actions/types";

export default function (state = {}, action)
{
  switch (action.type)
  {
    case TOOL_TIP:
      return action.payload;
  }
  return state;
};
