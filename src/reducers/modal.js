import {MODAL} from "../actions/types";

export default function (state = {}, action)
{
  switch (action.type)
  {
    case MODAL:
      return action.payload;
  }
  return state;
};
